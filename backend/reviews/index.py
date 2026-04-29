import json
import os
import urllib.request
import urllib.parse
from datetime import datetime
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Управление отзывами: получение одобренных, добавление нового, модерация"""

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    print(f"DEBUG method={method} path='{path}' qs={event.get('queryStringParameters')}")

    conn = get_conn()
    cur = conn.cursor()

    try:
        # GET — публичный список одобренных отзывов
        if method == 'GET' and not path.endswith('/admin'):
            cur.execute(
                "SELECT id, author_name, event_type, text, rating, created_at FROM reviews WHERE is_approved = TRUE ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
            reviews = [
                {
                    'id': r[0],
                    'author_name': r[1],
                    'event_type': r[2],
                    'text': r[3],
                    'rating': r[4],
                    'created_at': r[5].strftime('%d.%m.%Y') if r[5] else '',
                }
                for r in rows
            ]
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'reviews': reviews}, ensure_ascii=False)}

        # GET /admin — список всех отзывов для модерации
        if method == 'GET' and path.endswith('/admin'):
            headers = event.get('headers') or {}
            admin_key = (headers.get('X-Admin-Key') or headers.get('x-admin-key') or event.get('queryStringParameters', {}).get('key', '')).strip()
            cur.execute("SELECT value FROM admin_settings WHERE key = 'admin_key'")
            row = cur.fetchone()
            stored_key = row[0].strip() if row else ''
            print(f"DEBUG key='{admin_key}' stored='{stored_key}' match={admin_key==stored_key} headers={list(headers.keys())}")
            if admin_key != stored_key:
                return {'statusCode': 403, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Forbidden'})}
            cur.execute(
                "SELECT id, author_name, event_type, text, rating, is_approved, created_at FROM reviews ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
            reviews = [
                {
                    'id': r[0],
                    'author_name': r[1],
                    'event_type': r[2],
                    'text': r[3],
                    'rating': r[4],
                    'is_approved': r[5],
                    'created_at': r[6].strftime('%d.%m.%Y %H:%M') if r[6] else '',
                }
                for r in rows
            ]
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'reviews': reviews}, ensure_ascii=False)}

        # POST — добавить отзыв (уходит на модерацию)
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            author_name = body.get('author_name', '').strip()
            event_type = body.get('event_type', '').strip()
            text = body.get('text', '').strip()
            rating = int(body.get('rating', 5))

            if not author_name or not text:
                return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Заполните имя и текст'}, ensure_ascii=False)}
            if not (1 <= rating <= 5):
                rating = 5

            cur.execute(
                "INSERT INTO reviews (author_name, event_type, text, rating, is_approved) VALUES (%s, %s, %s, %s, FALSE) RETURNING id",
                (author_name, event_type, text, rating)
            )
            new_id = cur.fetchone()[0]
            conn.commit()

            token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
            chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
            if token and chat_id:
                stars = '\u2b50' * rating
                msg = f"\u2b50 Новый отзыв (ожидает модерации)\n\nАвтор: {author_name}\nТип события: {event_type or '-'}\nОценка: {stars}\nТекст: {text}\n\nID: {new_id}\n\n\U0001f517 Одобрить: https://eventkhv.ru/admin/reviews"
                data = urllib.parse.urlencode({'chat_id': chat_id, 'text': msg}).encode()
                req = urllib.request.Request(f"https://api.telegram.org/bot{token}/sendMessage", data=data, method='POST')
                try:
                    urllib.request.urlopen(req, timeout=5)
                except Exception:
                    pass

            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'id': new_id})}

        # PUT — одобрить/отклонить отзыв
        if method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            headers = event.get('headers') or {}
            admin_key = (headers.get('X-Admin-Key') or headers.get('x-admin-key') or body.get('key', '')).strip()
            cur.execute("SELECT value FROM admin_settings WHERE key = 'admin_key'")
            row = cur.fetchone()
            if admin_key != (row[0].strip() if row else ''):
                return {'statusCode': 403, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Forbidden'})}
            body = json.loads(event.get('body', '{}'))
            review_id = int(body.get('id', 0))
            is_approved = bool(body.get('is_approved', False))
            cur.execute("UPDATE reviews SET is_approved = %s WHERE id = %s", (is_approved, review_id))
            conn.commit()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

        # DELETE — удалить отзыв
        if method == 'DELETE':
            body = json.loads(event.get('body', '{}'))
            headers = event.get('headers') or {}
            admin_key = (headers.get('X-Admin-Key') or headers.get('x-admin-key') or body.get('key', '')).strip()
            cur.execute("SELECT value FROM admin_settings WHERE key = 'admin_key'")
            row = cur.fetchone()
            if admin_key != (row[0].strip() if row else ''):
                return {'statusCode': 403, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Forbidden'})}
            body = json.loads(event.get('body', '{}'))
            review_id = int(body.get('id', 0))
            cur.execute("DELETE FROM reviews WHERE id = %s", (review_id,))
            conn.commit()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    finally:
        cur.close()
        conn.close()

    return {'statusCode': 404, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Not found'})}
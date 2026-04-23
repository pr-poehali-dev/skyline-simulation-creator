import json
import os
import urllib.request
import urllib.parse
from datetime import datetime, timezone, timedelta


def handler(event: dict, context) -> dict:
    """Принимает заявку бойца на участие в турнире и отправляет в Telegram"""

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body', '{}'))

    height  = body.get('height', '').strip()
    weight  = body.get('weight', '').strip()
    base    = body.get('base', '').strip()
    exp     = body.get('exp', '').strip()
    gym     = body.get('gym', '').strip()
    age     = body.get('age', '').strip()
    contact = body.get('contact', '').strip()

    if not contact:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'ok': False, 'error': 'Укажите контакт для связи'}, ensure_ascii=False)
        }

    now = datetime.now(timezone(timedelta(hours=10))).strftime('%d.%m.%Y %H:%M')

    msg = (
        f"\U0001f94a Новая заявка бойца — Дикий Восток\n\n"
        f"\U0001f4cf Рост: {height or '—'} см\n"
        f"\u2696\ufe0f Вес: {weight or '—'} кг\n"
        f"\U0001f3af База: {base or '—'}\n"
        f"\U0001f3c6 Опыт / регалии: {exp or '—'}\n"
        f"\U0001f3cb\ufe0f Зал / тренер: {gym or '—'}\n"
        f"\U0001f4c5 Возраст: {age or '—'} лет\n"
        f"\U0001f4f2 Обратная связь: {contact}\n\n"
        f"\U0001f554 {now} (Хабаровск)"
    )

    token   = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')

    if token and chat_id:
        data = urllib.parse.urlencode({'chat_id': chat_id, 'text': msg}).encode()
        req  = urllib.request.Request(
            f"https://api.telegram.org/bot{token}/sendMessage",
            data=data,
            method='POST'
        )
        try:
            urllib.request.urlopen(req, timeout=10)
        except Exception:
            pass

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'ok': True}, ensure_ascii=False)
    }
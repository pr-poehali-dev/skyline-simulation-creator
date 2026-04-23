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

    name = body.get('name', '').strip()
    height = body.get('height', '').strip()
    weight = body.get('weight', '').strip()
    base = body.get('base', '').strip()
    experience = body.get('experience', '').strip()
    gym = body.get('gym', '').strip()
    phone = body.get('phone', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'ok': False, 'error': 'Заполните имя и телефон'}, ensure_ascii=False)
        }

    now = datetime.now(timezone(timedelta(hours=10))).strftime('%d.%m.%Y %H:%M')

    msg = (
        f"\U0001f94a Новая заявка бойца — Дикий Восток\n\n"
        f"\U0001f464 Имя: {name}\n"
        f"\U0001f4de Телефон: {phone}\n"
        f"\U0001f4cf Рост: {height or '-'}\n"
        f"\u2696\ufe0f Вес: {weight or '-'}\n"
        f"\U0001f3af База: {base or '-'}\n"
        f"\U0001f3c6 Опыт / регалии: {experience or '-'}\n"
        f"\U0001f3cb\ufe0f Зал / тренер: {gym or '-'}\n\n"
        f"\U0001f554 {now} (Хабаровск)"
    )

    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')

    if token and chat_id:
        data = urllib.parse.urlencode({'chat_id': chat_id, 'text': msg}).encode()
        req = urllib.request.Request(
            f"https://api.telegram.org/bot{token}/sendMessage",
            data=data,
            method='POST'
        )
        urllib.request.urlopen(req, timeout=10)

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'ok': True}, ensure_ascii=False)
    }

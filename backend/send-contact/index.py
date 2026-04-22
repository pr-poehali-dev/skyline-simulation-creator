import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта ведущего в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        body = {}

    name = body.get('name', '').strip()
    contact = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните обязательные поля'})
        }

    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')

    text = (
        f"\U0001f3a4 Новая заявка с сайта!\n\n"
        f"Имя: {name}\n"
        f"Контакт: {contact}\n"
        f"Сообщение: {message if message else '-'}"
    )

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
    }).encode()

    req = urllib.request.Request(url, data=data, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': True})
        }
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': False, 'tg_error': error_body, 'token_prefix': token[:15]})
        }
import os
import re
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify, send_from_directory, make_response

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

SITE_DIR = os.path.join(os.path.dirname(__file__), "fgamlet.wixsite.com")
RECIPIENT_EMAIL = "julianmotors.wro@gmail.com"


def send_email(name, email, phone, message):
    sender = os.environ.get("GMAIL_ADDRESS")
    password = os.environ.get("GMAIL_APP_PASSWORD")

    if not sender or not password:
        raise Exception("Email credentials not configured")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от {name or 'клиента'}"
    msg["From"] = sender
    msg["To"] = RECIPIENT_EMAIL

    body = f"""
<html><body style="font-family: Arial, sans-serif; font-size: 15px; color: #222;">
<h2 style="color: #3a5a8a;">Новая заявка с сайта Julian Motors</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 500px;">
  <tr><td style="padding: 8px; font-weight: bold; width: 120px;">Имя:</td><td style="padding: 8px;">{name or '—'}</td></tr>
  <tr style="background:#f5f5f5;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">{email or '—'}</td></tr>
  <tr><td style="padding: 8px; font-weight: bold;">Телефон:</td><td style="padding: 8px;">{phone or '—'}</td></tr>
  <tr style="background:#f5f5f5;"><td style="padding: 8px; font-weight: bold;">Сообщение:</td><td style="padding: 8px;">{message or '—'}</td></tr>
</table>
</body></html>
"""
    msg.attach(MIMEText(body, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, password)
        server.sendmail(sender, RECIPIENT_EMAIL, msg.as_string())


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or request.form
    name = data.get("имя", data.get("name", ""))
    email = data.get("email", "")
    phone = data.get("phone", "")
    message = data.get("message", data.get("сообщение", ""))
    try:
        send_email(name, email, phone, message)
        return jsonify({"ok": True, "message": "Заявка отправлена!"})
    except Exception as e:
        print(f"Email error: {e}")
        return jsonify({"ok": False, "message": str(e)}), 500


def no_cache_html(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers.pop("ETag", None)
    response.headers.pop("Last-Modified", None)
    return response


def inject_cache_bust(html_content):
    ts = str(int(time.time()))
    html_content = html_content.replace(
        'src="/js/mobile.js"',
        f'src="/js/mobile.js?v={ts}"'
    )
    return html_content


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path == "":
        index_path = os.path.join(SITE_DIR, "index.html")
        with open(index_path, "r", encoding="utf-8") as f:
            html = inject_cache_bust(f.read())
        resp = make_response(html)
        resp.headers["Content-Type"] = "text/html; charset=utf-8"
        return no_cache_html(resp)

    full = os.path.join(SITE_DIR, path)

    if os.path.isdir(full):
        index = os.path.join(full, "index.html")
        if os.path.exists(index):
            with open(index, "r", encoding="utf-8") as f:
                html = inject_cache_bust(f.read())
            resp = make_response(html)
            resp.headers["Content-Type"] = "text/html; charset=utf-8"
            return no_cache_html(resp)

    if os.path.isfile(full):
        directory = os.path.dirname(full)
        filename = os.path.basename(full)
        return no_cache_html(make_response(send_from_directory(directory, filename)))

    return "Not found", 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

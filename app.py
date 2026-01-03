import os
import requests
from flask import Flask, render_template, request, flash, redirect, url_for
from dotenv import load_dotenv
from email.utils import parseaddr

# Load .env
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")

# Brevo configuration
BREVO_API_KEY = os.getenv("BREVO_API_KEY")
MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")
TO_EMAIL = os.getenv("TO_EMAIL") or MAIL_DEFAULT_SENDER

# Email validation
def is_valid_email(email):
    name, addr = parseaddr(email)
    return "@" in addr and "." in addr

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/enquiry", methods=["GET", "POST"])
def enquiry():
    if request.method == "POST":
        full_name = request.form.get("fullName", "").strip()
        email = request.form.get("email", "").strip()
        phone = request.form.get("phone", "").strip()
        age = request.form.get("age", "").strip()
        gender = request.form.get("gender", "").strip()
        education = request.form.get("education", "").strip()
        message_text = request.form.get("message", "").strip()

        newsletter = request.form.get("newsletter")
        newsletter_status = "Yes" if newsletter == "Yes" else "No"

        courses = request.form.getlist("courses")
        course_str = ", ".join(courses) if courses else "None selected"

        if not full_name or not email or not phone:
            flash("Full Name, Email, and Phone are required.", "warning")
            return redirect(url_for("enquiry"))

        if not is_valid_email(email):
            flash("Invalid email format.", "warning")
            return redirect(url_for("enquiry"))

        # Compose email content
        subject = "New Student Enquiry - Aura Institute"
        message_body = f"""
New Student Enquiry

Full Name: {full_name}
Email: {email}
Phone: {phone}
Age: {age}
Gender: {gender}
Education: {education}
Interested Courses: {course_str}
Newsletter Subscription: {newsletter_status}

Message:
{message_text}
"""

        brevo_url = "https://api.brevo.com/v3/smtp/email"
        headers = {
            "api-key": BREVO_API_KEY,
            "Content-Type": "application/json"
        }
        data = {
            "sender": {"name": "Aura Institute", "email": MAIL_DEFAULT_SENDER},
            "to": [{"email": TO_EMAIL}],
            "subject": subject,
            "textContent": message_body
        }

        try:
            response = requests.post(brevo_url, headers=headers, json=data)
            if response.status_code in (200, 201, 202):
                flash("Enquiry submitted successfully! Email sent.", "success")
            else:
                flash(f"Email failed ({response.status_code}): {response.text}", "warning")
        except Exception as e:
            flash(f"Email sending error: {e}", "warning")

        return redirect(url_for("enquiry"))

    # GET request
    return render_template("enquiry.html")


if __name__ == "__main__":
    app.run(debug=True)

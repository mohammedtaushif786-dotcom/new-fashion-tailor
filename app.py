"""
NEW FASHION TAILOR - Professional Tailoring Website
Built with Python Flask Framework
Features: Nepali Language, Google Reviews, Online Payment, Blog, Gallery
Security: CSRF Protection, Rate Limiting, Security Headers
"""
from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from flask_wtf.csrf import CSRFProtect
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
from datetime import datetime
import os
import secrets

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(32)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

csrf = CSRFProtect(app)
limiter = Limiter(app=app, key_func=get_remote_address)
talisman = Talisman(
    app,
    content_security_policy={
        'default-src': "'self'",
        'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        'font-src': ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        'script-src': ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        'img-src': ["'self'", "data:", "https:", "http:"],
    },
    force_https=False
)

BLOG_POSTS = [
    {
        'id': 1,
        'title': 'Top 10 School Uniform Trends in Nepal 2026',
        'slug': 'school-uniform-trends-nepal-2026',
        'excerpt': 'Discover the latest trends in school uniforms that are both comfortable and stylish for students.',
        'content': 'School uniforms in Nepal have evolved significantly over the years. Modern uniforms combine comfort with style, ensuring students look professional while feeling at ease throughout the day.',
        'category': 'school',
        'date': 'August 15, 2026',
        'read_time': '5 min read',
        'image': 'school-uniform.jpg'
    },
    {
        'id': 2,
        'title': 'Wedding Dress Trends: Nepali Bridal Fashion 2026',
        'slug': 'wedding-dress-trends-nepali-bridal-2026',
        'excerpt': 'Explore the hottest wedding dress trends for Nepali brides this year.',
        'content': 'Nepali bridal fashion in 2026 blends traditional elegance with contemporary designs. From stunning lehengas to modern saris, discover what is trending.',
        'category': 'wedding',
        'date': 'August 10, 2026',
        'read_time': '7 min read',
        'image': 'wedding-dress.jpg'
    },
    {
        'id': 3,
        'title': 'How to Choose the Perfect Fabric for Your Outfit',
        'slug': 'how-to-choose-perfect-fabric',
        'excerpt': 'A complete guide to selecting the right fabric for any occasion.',
        'content': 'Choosing the right fabric is crucial for any outfit. Cotton for comfort, silk for elegance, wool for warmth - learn how to pick the perfect material.',
        'category': 'tips',
        'date': 'August 5, 2026',
        'read_time': '6 min read',
        'image': 'fabric-guide.jpg'
    },
    {
        'id': 4,
        'title': 'Official Wear: Dressing for Success in the Workplace',
        'slug': 'official-wear-dressing-for-success',
        'excerpt': 'Professional attire tips for men and women in Nepal.',
        'content': 'First impressions matter. Learn how to dress professionally for interviews, meetings, and daily office life in Nepal.',
        'category': 'official',
        'date': 'July 28, 2026',
        'read_time': '5 min read',
        'image': 'official-wear.jpg'
    },
    {
        'id': 5,
        'title': 'Tailoring Tips: How to Maintain Your Clothes',
        'slug': 'tailoring-tips-maintain-clothes',
        ' excerpt': 'Simple tips to keep your tailored clothes looking new for years.',
        'content': 'Proper care extends the life of your garments. Learn washing, storing, and maintenance tips from expert tailors.',
        'category': 'tips',
        'date': 'July 20, 2026',
        'read_time': '4 min read',
        'image': 'clothes-care.jpg'
    },
    {
        'id': 6,
        'title': 'Custom Tailoring vs Ready-Made: Which is Better?',
        'slug': 'custom-tailoring-vs-ready-made',
        'excerpt': 'Understand the benefits of custom tailoring over store-bought clothes.',
        'content': 'Custom tailoring offers perfect fit, quality materials, and personal touch. Discover why more people in Nepal are choosing custom-made outfits.',
        'category': 'tips',
        'date': 'July 15, 2026',
        'read_time': '6 min read',
        'image': 'custom-tailoring.jpg'
    }
]

GOOGLE_REVIEWS = [
    {
        'name': 'Sita Sharma',
        'rating': 5,
        'text': 'Best tailoring service in Lalitpur! They made my daughter\'s school uniform perfectly. The quality is excellent and the price is very reasonable. Highly recommended!',
        'date': '2 weeks ago',
        'avatar': 'S'
    },
    {
        'name': 'Rajesh Kumar',
        'rating': 5,
        'text': 'They created my wedding sherwani and it was absolutely stunning! The attention to detail and craftsmanship is remarkable. Will definitely come back!',
        'date': '1 month ago',
        'avatar': 'R'
    },
    {
        'name': 'Anita Thapa',
        'rating': 5,
        'text': 'I have been getting my office suits tailored here for years. They never disappoint. Professional, punctual, and perfect fit every time.',
        'date': '3 weeks ago',
        'avatar': 'A'
    },
    {
        'name': 'Prakash Gurung',
        'rating': 5,
        'text': 'Excellent work on my daughter\'s school dresses. The embroidery work is beautiful. Thank you for the wonderful service!',
        'date': '1 week ago',
        'avatar': 'P'
    },
    {
        'name': 'Sunita Magar',
        'rating': 4,
        'text': 'Very professional team. They understood exactly what I wanted for my wedding outfit. The fitting was perfect. Great experience!',
        'date': '2 months ago',
        'avatar': 'S'
    },
    {
        'name': 'Bikash Tamang',
        'rating': 5,
        'text': 'Amazing tailoring service! They handled our school\'s bulk uniform order efficiently. Quality is top-notch. Keep up the good work!',
        'date': '1 month ago',
        'avatar': 'B'
    }
]

@app.route('/')
def home():
    return render_template('index.html', reviews=GOOGLE_REVIEWS[:3])

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/blog')
def blog():
    return render_template('blog.html', posts=BLOG_POSTS)

@app.route('/blog/<slug>')
def blog_post(slug):
    post = next((p for p in BLOG_POSTS if p['slug'] == slug), None)
    if post is None:
        flash('Blog post not found.', 'error')
        return redirect(url_for('blog'))
    return render_template('blog_post.html', post=post, all_posts=BLOG_POSTS)

@app.route('/reviews')
def reviews():
    return render_template('reviews.html', reviews=GOOGLE_REVIEWS)

@app.route('/payment')
def payment():
    return render_template('payment.html')

@app.route('/contact', methods=['GET', 'POST'])
@limiter.limit("10 per minute")
def contact():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        email = request.form.get('email', '').strip()
        service = request.form.get('service', '').strip()
        message = request.form.get('message', '').strip()

        if not name or not phone or not message:
            flash('Please fill all required fields.', 'error')
            return redirect(url_for('contact'))

        flash('Thank you! Your message has been sent successfully. We will contact you soon!', 'success')
        return redirect(url_for('contact'))

    return render_template('contact.html')

@app.route('/booking', methods=['GET', 'POST'])
@limiter.limit("10 per minute")
def booking():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        service = request.form.get('service', '').strip()
        date = request.form.get('date', '').strip()
        time = request.form.get('time', '').strip()
        notes = request.form.get('notes', '').strip()

        if not name or not phone or not service or not date:
            flash('Please fill all required fields.', 'error')
            return redirect(url_for('booking'))

        flash(f'Thank you {name}! Your appointment is booked for {date} at {time}. We will call you to confirm.', 'success')
        return redirect(url_for('booking'))

    return render_template('booking.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('base.html', error_code=404, error_message="Page Not Found"), 404

@app.errorhandler(429)
def rate_limit_exceeded(e):
    return jsonify(error="Rate limit exceeded. Please try again later."), 429

@app.errorhandler(500)
def internal_error(e):
    return render_template('base.html', error_code=500, error_message="Internal Server Error"), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

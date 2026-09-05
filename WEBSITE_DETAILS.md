# NEW FASHION TAILOR - Website Details & Documentation

## Website Overview

This is a professional website built for **NEW FASHION TAILOR** using Python Flask framework with all requested features including Nepali language support, Google Reviews, online payment, blog, and more.

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Python Flask |
| Frontend | HTML5, CSS3, JavaScript |
| Templates | Jinja2 (Flask) |
| Security | Flask-WTF (CSRF), Flask-Limiter (Rate Limiting), Flask-Talisman (Security Headers) |
| Fonts | Google Fonts (Playfair Display, Poppins, Mukta for Nepali) |
| Icons | Font Awesome 6.5 |

---

## Website Structure

```
new_fashion_tailor/
│
├── app.py                    # Main Flask application
├── requirements.txt          # Python dependencies
├── run_website.bat           # One-click launcher
├── WEBSITE_DETAILS.md        # This documentation
│
├── templates/                # HTML templates
│   ├── base.html            # Base template (navbar, footer, language toggle)
│   ├── index.html           # Home page
│   ├── about.html           # About us page
│   ├── services.html        # Services page
│   ├── gallery.html         # Gallery page
│   ├── contact.html         # Contact page
│   ├── blog.html            # Blog listing page
│   ├── blog_post.html       # Individual blog post
│   ├── reviews.html         # Google Reviews page
│   ├── payment.html         # Online Payment page
│   └── booking.html         # Appointment Booking page
│
└── static/                   # Static files
    ├── css/
    │   └── style.css        # Main stylesheet (2000+ lines)
    ├── js/
    │   └── main.js          # JavaScript functionality
    └── images/              # Image folder
```

---

## All Pages Included

### 1. Home Page (`/`)
- Hero section with animated particles
- Why Choose Us section (6 features)
- Services preview (3 main services)
- Google Reviews section (3 reviews)
- Blog preview (3 articles)
- Call-to-action section

### 2. About Page (`/about`)
- Our story and journey
- Mission and Vision
- Company values (4 core values)
- Team section
- Statistics

### 3. Services Page (`/services`)
- School Uniforms & Dresses
- Wedding & Bridal Collection
- Official & Professional Wear
- Custom & Designer Wear
- Alterations & Repairs
- Each service with pricing

### 4. Blog Page (`/blog`)
- 6 fashion articles
- Category filtering (All, School, Wedding, Official, Tips)
- Newsletter subscription

### 5. Blog Post Page (`/blog/<slug>`)
- Full article content
- Share buttons (WhatsApp, Facebook, Email)
- Sidebar with categories and recent posts
- CTA widget

### 6. Gallery Page (`/gallery`)
- Filterable gallery (All, School, Wedding, Official, Custom)
- 12 gallery items with hover effects
- Real images from Unsplash

### 7. Google Reviews Page (`/reviews`)
- Overall rating (4.9/5)
- Rating distribution bars
- Individual review cards
- CTA to leave a review

### 8. Online Payment Page (`/payment`)
- eSewa payment details
- Khalti payment details
- IME Pay payment details
- Bank Transfer details
- FAQ section

### 9. Appointment Booking Page (`/booking`)
- Booking form with date/time selection
- Benefits of booking
- Contact information
- Working hours

### 10. Contact Page (`/contact`)
- Contact form with validation
- Contact information card
- Working hours

---

## Key Features

### 1. Nepali Language Support
- Toggle button in navbar
- Language preference saved in localStorage
- All text elements have Nepali translations
- Automatic translation on page load

### 2. Google Reviews
- 6 sample reviews from customers
- Overall rating display (4.9/5)
- Rating distribution bars
- CTA to leave a review on Google

### 3. Online Payment Options
- **eSewa**: ID: 9808699164
- **Khalti**: ID: 9808699164
- **IME Pay**: ID: 9808699164
- **Bank Transfer**: Nepal Investment Bank Limited
- Step-by-step instructions
- Payment confirmation process

### 4. Blog Section
- 6 articles with categories
- School Uniform Trends
- Wedding Dress Trends
- Fabric Selection Guide
- Official Wear Tips
- Clothes Maintenance Tips
- Custom vs Ready-Made comparison

### 5. Real Photos
- Images from Unsplash (free stock photos)
- School uniform images
- Wedding dress images
- Fabric and tailoring images

### 6. Appointment Booking
- Date and time selection
- Service type selection
- Additional notes field
- Automatic confirmation

---

## Security Features

1. **CSRF Protection** - Flask-WTF prevents cross-site request forgery
2. **Rate Limiting** - 10 requests per minute on forms
3. **Security Headers** - Content-Security-Policy, X-Frame-Options
4. **Secure Cookies** - HttpOnly, Secure, SameSite
5. **Input Validation** - Client and server side validation
6. **Secret Key** - Randomly generated

---

## Shop Details

- **Shop Name:** NEW FASHION TAILOR
- **Location:** Imadol, Krishna Mandir, Mahalaxmi Nagarpalika, Lalitpur, Nepal
- **Phone 1:** +977 9808699164
- **Phone 2:** +977 9866255830
- **Email:** tamannakha84@gmail.com

---

## How to Run

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation Steps

1. Open Command Prompt or PowerShell

2. Navigate to the project folder:
   ```
   cd "C:\Users\Mohammed Taushif\new_fashion_tailor"
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

5. **OR** double-click `run_website.bat`

6. Open your browser and go to:
   ```
   http://127.0.0.1:5000
   ```

---

## How to Deploy Online

### Option 1: PythonAnywhere (Recommended for Beginners)
1. Create account at pythonanywhere.com
2. Upload all files
3. Set up the web app with Flask
4. Your site will be live at: yourusername.pythonanywhere.com

### Option 2: Heroku
1. Create a Heroku account
2. Install Heroku CLI
3. Run these commands:
   ```
   heroku login
   git init
   git add .
   git commit -m "Initial commit"
   heroku create new-fashion-tailor
   git push heroku master
   ```

### Option 3: Railway.app
1. Create account at railway.app
2. Connect your GitHub repository
3. Deploy automatically

---

## Customization Guide

### Change Payment Details
Edit `app.py` and `templates/payment.html` to update:
- eSewa/Khalti/IME Pay IDs
- Bank account details

### Add Real Reviews
Edit `app.py` to update the `GOOGLE_REVIEWS` list with real customer reviews.

### Add More Blog Posts
Add new entries to the `BLOG_POSTS` list in `app.py`.

### Change Colors
Edit the CSS variables in `static/css/style.css`:
```css
:root {
    --primary: #8B5CF6;
    --secondary: #EC4899;
    --accent: #F59E0B;
}
```

### Add Real Images
Replace Unsplash URLs in templates with your own images.

---

## File Locations

All files are saved in:
```
C:\Users\Mohammed Taushif\new_fashion_tailor\
```

---

*Documentation created for NEW FASHION TAILOR website*
*Last updated: September 2026*

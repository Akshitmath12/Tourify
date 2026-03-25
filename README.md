🌍 Tourify
A full-stack tour booking platform built with React.js, Node.js, Express.js, and MongoDB — featuring secure authentication, Stripe payment integration, image processing, email notifications, and production-grade security middleware.

Features
🗺️ Tour Management — Browse, search, and view detailed tour listings
📅 Booking System — Book tours with full reservation management
💳 Stripe Payments — Secure payment processing via Stripe
⭐ Reviews & Ratings — Users can leave reviews on completed tours
👤 User Profiles — Manage account details and profile photo uploads

🔐 Security

JWT-based authentication with secure cookie storage
Password hashing with bcryptjs
Rate limiting to prevent brute force attacks
HTTP security headers with Helmet
NoSQL injection protection with express-mongo-sanitize
XSS attack prevention
HTTP Parameter Pollution protection with HPP
CORS configured for frontend-backend communication

📧 Other

Email notifications via Nodemailer
Image upload and processing with Multer + Sharp
Morgan HTTP request logging


Tech Stack
Frontend
TechnologyUsageReact 19UI frameworkReact Router DOM v7Client-side routingAxiosHTTP requestsTailwind CSS 4StylingViteBuild tool
Backend
TechnologyUsageNode.jsRuntimeExpress.js 5Server frameworkMongoDB + MongooseDatabase + ODMJWTAuthenticationStripePayment processingMulter + SharpImage upload & processingNodemailerEmail notificationsHelmetSecurity headersbcryptjsPassword hashing

Getting Started
Prerequisites

Node.js 18+
MongoDB database (local or Atlas)
Stripe account
Gmail or SMTP account for emails

Installation
bash# Clone the repository
git clone https://github.com/Akshitmath12/Tourify.git
cd Tourify
Backend Setup
bash# Navigate to backend
cd src

# Install dependencies
npm install

# Create .env file
cp .env.example .env
Add the following to your .env:
envNODE_ENV=development
PORT=8000
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/tourify

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_password
bash# Run backend
npm run dev
Frontend Setup
bash# Navigate to frontend
cd Frontend/tourify-frontend

# Install dependencies
npm install

# Run frontend
npm run dev
Open http://localhost:5173 in your browser.

API Endpoints
Auth
MethodRouteDescription  POST/api/v1/users/signupRegister a new userPOST/api/v1/users/loginLoginPOST/api/v1/users/forgotPasswordRequest password resetPATCH/api/v1/users/resetPassword/:tokenReset password
Tours
MethodRouteDescription  GET/api/v1/toursGet all toursGET/api/v1/tours/:idGet single tourPOST/api/v1/toursCreate tour (admin)PATCH/api/v1/tours/:idUpdate tour (admin)DELETE/api/v1/tours/:idDelete tour (admin)
Bookings
MethodRouteDescription  GET/api/v1/bookings/checkout-session/:tourIdCreate Stripe checkout sessionGET/api/v1/bookingsGet all bookings (admin)
Reviews
MethodRouteDescription  GET/api/v1/reviewsGet all reviewsPOST/api/v1/tours/:tourId/reviewsCreate reviewPATCH/api/v1/reviews/:idUpdate reviewDELETE/api/v1/reviews/:idDelete review

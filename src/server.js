require('dotenv').config();
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = require('./app');
// const bookingController = require('./controllers/bookingController');

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
});


// 2. Stripe Webhook (Raw Body)
// app.post(
//   '/webhook-checkout',
//   bodyParser.raw({ type: 'application/json' }),
//   bookingController.webhookCheckout
// );

// 3. Start Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`🚀 App running on port ${port}...`);
});

// 4️. Graceful shutdown for unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION:', err.name, err.message);
  server.close(() => process.exit(1));
});

// 5️. Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION:', err.name, err.message);
  process.exit(1);
});

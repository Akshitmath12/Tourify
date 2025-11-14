// src/routes/bookingRoutes.js
const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.post(
//   '/checkout-session/:tourId',
//   authController.protect,
//   bookingController.getCheckoutSession
// );


router.use(authController.protect, authController.restrictTo('admin', 'lead-guide'));

router.route('/').get(bookingController.getAllBookings);

module.exports = router;

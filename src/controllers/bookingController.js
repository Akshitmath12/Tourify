// src/controllers/bookingController.js
const Stripe = require("stripe");
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');


// const getStripe = () => {
//     return new Stripe(process.env.STRIPE_SECRET_KEY);
//   };

// const stripe = getStripe();
// exports.getCheckoutSession = catchAsync(async (req, res, next) => {

//   const tour = await Tour.findById(req.params.tourId);
//   if (!tour) return next(new AppError('No tour found with that ID', 404));


//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     mode: 'payment',
//     success_url: `${req.protocol}://${req.get('host')}/api/v1/bookings/success`,
//     cancel_url: `${req.protocol}://${req.get('host')}/api/v1/tours/${tour.id}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.tourId,
//     line_items: [
//       {
//         quantity: 1,
//         price_data: {
//           currency: 'usd',
//           unit_amount: tour.price * 100,
//           product_data: {
//             name: `${tour.name} Tour`,
//             description: tour.summary
//           }
//         }
//       }
//     ]
//   });

 
//   res.status(200).json({
//     status: 'success',
//     session
//   });
// });


const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.amount_total / 100;
  await Booking.create({ tour, user, price });
};


// exports.webhookCheckout = async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed')
//     await createBookingCheckout(event.data.object);

//   res.status(200).json({ received: true });
// };


exports.getAllBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json({ status: 'success', results: bookings.length, data: { bookings } });
});

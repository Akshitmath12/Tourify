const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const path = require('path');

const AppError = require('./utils/appError');
// const globalErrorHandler = require('./middlewares/errorHandler');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();


//global middleware 

app.use(helmet()); // Sets security HTTP headers


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));


  if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logs HTTP requests in development mode
  }


  const limitter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
  })


  app.use('/api', limitter); // Rate limiting middleware

  app.use(express.json({limit: '10kb'})) // Body parser, reading data from body into req.body
  app.use(cookieParser())


  app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
  app.use(xss()); // Data sanitization against XSS

    app.use(hpp({

        whitelist: [
            'durations','privateDecrypt','ratingAverage'
        ]
    })); // Prevent parameter pollution

    // Serve the static files
    

    app.use(express.static(path.join(__dirname, 'public')));

    // Routes 

    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/tours', tourRouter);
    app.use('api/v1/reviews', reviewRouter);

    app.post(
      '/webhook-checkout',
      express.raw({ type: 'application/json' }),
      bookingController.webhookCheckout
    );
    app.use('api/v1/bookings', bookingRouter);


    // Unhandled routes

    app.use((req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl}`, 404));
      });

    // Global Error Handling Middleware

    // app.use(globalErrorHandler);

    module.exports = app;

// This file Adds all security middlewares

//Parses cookies & JSON

//Serves static assets

//Mounts routes

//Handles unknown URLs

//Passes all errors to a global handler
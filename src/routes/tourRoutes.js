const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public Routes
router.route('/').get(tourController.getAllTours);
router.route('/:id').get(tourController.getTour);

// Protected Routes (only logged-in users can create, update, delete)
router.use(authController.protect);

router
  .route('/')
  .post(authController.restrictTo('admin', 'lead-guide'), tourController.createTour);

router
  .route('/:id')
  .patch(authController.restrictTo('admin', 'lead-guide'), tourController.updateTour)
  .delete(authController.restrictTo('admin'), tourController.deleteTour);

module.exports = router;

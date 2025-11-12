// src/controllers/tourController.js
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// 🟢 Create a new Tour (Admin/Lead-guide only)
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { tour: newTour }
  });
});

// 🟢 Get all Tours (Public)
exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  });
});

// 🟢 Get single Tour
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return next(new AppError('No tour found with that ID', 404));
  res.status(200).json({ status: 'success', data: { tour } });
});

// 🟢 Update a Tour (Admin/Lead-guide only)
exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!tour) return next(new AppError('No tour found with that ID', 404));
  res.status(200).json({ status: 'success', data: { tour } });
});

// 🟢 Delete a Tour (Admin only)
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) return next(new AppError('No tour found with that ID', 404));
  res.status(204).json({ status: 'success', data: null });
});

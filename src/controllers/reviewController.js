const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) =>{
   if(!req.body.tour) req.tour.body = req.params.tourId;
   if(!req.body.user) req.body.user = req.user.id;

   next();
}

exports.createReview = catchAsync(async (req, res, next) =>{
    const newReview = await Review.create(req.body);
    res.status(201).json({
        status: success,
        data: {review: newReview}
    })
})


exports.getAllReviews = catchAsync(async (req, res, next) =>{

    let filter = {}
    if(req.params.tourId) filter = {tour: req.params.tourId};
    const reviews = await Review.find(filter);

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {reviews}
    })

})


// Get a single review

exports.getReview = catchAsync(async(req,res,next) =>{
    const review = await Review.findById(req.params.id);
    if(!review){
        return next(new AppError('No review found with that Id', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {review}
    }
    )
})


exports.updateReview = catchAsync(async(req,res,next) =>{
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!review){
        return next(new AppError('No review found with that Id', 404));
    }
    res.status(200).json({
        status:'success',
        data: {review}
    })
})

exports.deleteReview = catchAsync(async(req,res,next) =>{
    const review = await Review.findByIdAndDelete(req.params.id);
    if(!review){
        return next(new AppError('No review found with that Id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: null
    })
})
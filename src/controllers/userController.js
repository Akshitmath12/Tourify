const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const { createSendToken} = require('./authController')

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

// Get the user by ID, This is for admin use

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new AppError('No user found with that ID',404));
    }

    res.status(200).json({status: 'success', data: {user}})
})


exports.updateMe = catchAsync(async (req,res, next) => {
    const {name, email} = req.body;
    if (req.body.password)
        return next(new AppError('Use /updateMyPassword to change password', 400));
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {name, email}, {new: true, runValidators: true});

    res.status(200).json({status: 'success', data: {user: updatedUser}})
})


exports.updateMyPassword = catchAsync(async (req, res, next) => {
    console.log("=== UPDATE PASSWORD DEBUG ===");
  
    console.log("Body:", req.body);
    console.log("Current user ID:", req.user.id);
  
    const user = await User.findById(req.user.id).select('+password');
  
    console.log("Hashed password in DB:", user.password);
  
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
    console.log("Password match:", isMatch);
  
    if (!isMatch) {
      console.log("❌ Password did NOT match");
      return next(new AppError('Your current password is wrong', 401));
    }
  
    user.password = req.body.newPassword;
    await user.save();
  
    createSendToken(user, 200, res);
  });
  
  

exports.deleteMe = catchAsync(async (req,res,next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false});
    res.status(204).json({status: 'success', data: null});
})


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTVlYjI3OTRhZTdiYzk1MjExODYwYyIsImlhdCI6MTc2MzA0NDI3MCwiZXhwIjoxNzcwODIwMjcwfQ.Nz6GDUuvDY7ZkFcEJldBNbsmbC9GG85pXVHMgMjPENU
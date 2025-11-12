const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected test route
router.get('/me', authController.protect, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user
  });
});

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.patch('/updateMyPassword', authController.protect, userController.updateMyPassword);
router.delete('/deleteMe', authController.protect, userController.deleteMe)

module.exports = router;

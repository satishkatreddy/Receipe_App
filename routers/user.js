const express = require('express');
const router = express.Router();
const {signUp, logIn, getUser} = require('../controllers/userController');
const checkToken= require('../middleware/checkToken');



router.post('/signUp', signUp);
router.post('/logIn',logIn);
router.get('/getUser/:id', checkToken, getUser);

module.exports = router;
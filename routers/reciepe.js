const express = require('express');
const router = express.Router();
const {addReciepe, getReciepe}= require('../controllers/reciepeController');
const checkToken= require('../middleware/checkToken');
const uploads = require('../middleware/uploadImage');


router.post('/add',uploads.single('image'),addReciepe);
router.get('/getReciepe/:id',  checkToken, getReciepe);

module.exports = router
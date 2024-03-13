const multer = require('multer');


const path = require('path');
const AppError =require('../utils/appError');

const multerStorage = multer.diskStorage({

       destination: function(req,file,cb){
          cb(null, 'uploads/')   
       },
       filename: function(req,file, cb){
          let ext = path.extname(file.originalname)
          cb(null, Date.now() + ext);
       }
       
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image. only png/jpg files supported.', 400), false);
    }
  }
  


  const uploads = multer({
   storage:multerStorage,
   fileFilter: multerFilter,
   limits: {
    fileSize: 1024* 1024 * 2
   }
  })


  
  module.exports = uploads;




const jwt= require('jsonwebtoken');
const userModel= require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');

const checkToken = asyncHandler(async(req,res, next)=>{

        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try{
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                req.user = await userModel.findById(decoded.id).select('-password');
                next();
            }
            catch(err){
                 throw new AppError('Invalid Token', 401)
            }

        }
        if(!token){    
            throw new AppError(' Token is not Found', 404)
        } 
})



module.exports= checkToken

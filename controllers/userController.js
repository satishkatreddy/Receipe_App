const userModel = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');
const generateToken= require('../utils/generateToken');
const bcrypt = require('bcrypt');



const  signUp = asyncHandler(async(req,res)=>{

         const {
            email, password, userName
         } = req.body;

         if(!email || !password || !userName){
            throw new AppError('Provide valid input', 400);
         }
         const existingEmail = await userModel.findOne({email:email});
         if(existingEmail){
            throw new AppError(" user already Exists", 401);
         }
         const salt = bcrypt.genSaltSync(10);
         const hashPassword = bcrypt.hashSync(password, salt);
         const users = await userModel.create({

             email:email,
             password: hashPassword,
             userName:userName
         })
          return res.status(201).json({message: "user created successfully", data:users});
          
})

const logIn = asyncHandler(async(req,res)=>{

       const {
        email,password
       } = req.body
       if(!email|| !password ){
        throw new AppError('Provide valid input', 400);
       }
       const logInUser = await userModel.findOne({email:email})
       if(!logInUser){
        throw new AppError('User not found', 404);
       }
       const passwordIsCorrect = await bcrypt.compare(password, logInUser.password);
       if(!passwordIsCorrect){
        throw new AppError('Incorrect Password', 400);
       }
       else{
        return res.status(200).json({message: "user Login successfully", data:{
              _id:logInUser._id,
              email:logInUser.email,
              password:logInUser.password,
              userName:logInUser.userName,
              token: generateToken(logInUser._id)

        }});
    }
})

const getUser = asyncHandler(async(req,res)=>{

       const id = req.params.id;
       const users = await userModel.findById({_id:id});
       if(!users){
        throw new AppError('user not found', 404);
       }
       return res.status(200).json({message:"user details fetched successfully", data: users});

})


module.exports ={

   logIn,
   signUp,
   getUser
   

}
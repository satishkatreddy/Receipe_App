
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');
const reciepesModel = require('../models/reciepeModel');
const userModel = require('../models/userModel');


const addReciepe = asyncHandler(async (req, res) => {
  const {
    name, ingredients, instructions, cookingTime
  } = req.body;
  // if(req.file){
  //   const images = req.file.
  // }

  
if (!name || !ingredients || !instructions || !cookingTime) {
    throw new AppError('Provide valid input', 404);
  }
  const reciepe = await  reciepesModel.create({
    name: name,
    ingredients: ingredients,
    instructions: instructions,
    image: req.file.path,
    cookingTime: cookingTime
  });
  return res.status(201).json({ message: "Reciepe created successfully", data: reciepe });
});


const getReciepe = asyncHandler(async(req,res)=>{

     const id = req.params.id;
     const user = await userModel.findById({_id:id});
     if(!user){
      throw new AppError ('savedRecieps not found', 404);
     }
     return res.status(200).json({message:"fethed reciepes successfully", savedReceips: user?.savedReceips});
})


const updateReciepe = asyncHandler(async(req,res)=>{

          const reciepeId = req.params.id;
          const reciepe = await reciepesModel.findById({_id: reciepeId});
          const userId = req.params.id;
          const user= await userModel.findById({_id: userId});
          user.savedReceips.push(reciepe);
          await user.save();
          return res.status(200).json({message: "successfully saved recieps", savedReceips: user.savedReceips});
})


const getAllsavedRecieps = asyncHandler(async(req,res)=>{
  const userId = req.params.id;
  const user= await userModel.findById({_id: userId});
  const savedReceips = await reciepesModel.find({
    _id: {$in: user.savedReceips}
  })
     return res.status(200).json({message: "fetched saved recieps", data: savedReceips });

})



module.exports = {
  addReciepe,
  getReciepe,
  updateReciepe,
  getAllsavedRecieps,
  getReciepe
};

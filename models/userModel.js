const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


const userSchema = new Schema({

      userName:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique: true
      },
      password:{
        type: String,
        required:true,
        minLength: 6
      },
      savedReceips:[{
          type:Schema.Types.ObjectId,
          ref: 'Receipes'
      }]
   

}, {timestamps:true});

const user = mongoose.model('USERS', userSchema);

module.exports = user;
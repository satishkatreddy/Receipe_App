const  mongoose = require('mongoose');
const Schema = mongoose.Schema;



const  reciepeSchema = new Schema({


       name:{
        type:String,
        required: true,
       },
       ingredients:[{
        type:String,
        required:true
 } ],
       instructions:{
        type:String,
        required:true
       },

       image:{
        type:String,
        required:true
       },
         cookingTime:{
            type:Number,
            required:true,
         }, 
         users:{
            type:Schema.Types.ObjectId,
            ref: 'USERS'
        }
}, {timestamps:true})


const reciepe = mongoose.model('Reciepe', reciepeSchema);

module.exports = reciepe
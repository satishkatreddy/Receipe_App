const jwt = require('jsonwebtoken');

const token = (id)=>{


    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn:"2d"});

}

module.exports=token
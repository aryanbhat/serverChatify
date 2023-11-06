const jwt = require('jsonwebtoken');
const { User } = require('../model/models');

const generateToken = function(data){
  const token = jwt.sign(data,process.env.KEY,{
    expiresIn: '30m'
  });
  return token;
}

const authenticate = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.KEY,async(err,user)=>{
      if(err){
        res.status(401).json({"message":"Unauthorized"});
        return;
      }
      req.user =  await User.findById(user.username).select('-password');
      next();
    })
  }
  else{
    res.status(401).json({"message":"Unauthenticated"});
  }
}


module.exports = { generateToken , authenticate };
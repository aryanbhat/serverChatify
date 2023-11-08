import jwt,{JwtPayload} from 'jsonwebtoken'
import { Express,Request,Response,NextFunction } from 'express';
import { User } from '../model/models';
import { MyRequest } from '../utils/typedef';

export const generateToken = function(data: string|object){
  const key = process.env.KEY;
  if(!key){
    throw new Error('Secret key is not provided');
  }
  const token = jwt.sign(data,key,{
    expiresIn: '1d'
  });
  return token;
}


export const authenticate = (req:MyRequest,res:Response,next:NextFunction)=>{
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    const key = process.env.KEY;
    if(!key){
      throw new Error('Secret key is not provided');
    }
    jwt.verify(token,key,async(err,user)=>{
      if(err){
        res.sendStatus(401);
      }
      if(user){
        const id = user.sub;
        req.user = id;
        next();
      }
      else{
        res.sendStatus(401);
      }
    })
  }
  else{
    res.status(401).json({"message":"Unauthenticated"});
  }
}


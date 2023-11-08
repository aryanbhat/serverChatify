import express, {Express,Request,Response} from 'express'
import { generateToken, authenticate } from '../middleware/auth'
import { User } from '../model/models';

interface MyRequest extends Request{
  user ?: string | undefined |  (() => string);
}

const router = express.Router();


router.post("/register", async (req, res) => {
  const { name, email, password, pic } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(401).json({ message: "User already exists" });
    return;
  } else {
      let newUser = new User({ name, email, password, pic });
      const id = newUser._id.toString();
      const token = generateToken({"sub":id})
      await newUser.save();
    res.status(200).json({"message":"User created succesfully",token: token,user:newUser})
  }
});

router.post("/login", async(req,res)=>{
  const { email, password} = req.body;
  const user = await User.findOne({ email,password});
  if(user){
    const id = user._id.toString();
    const token  = generateToken({"sub":id});
    res.status(200).json({"message":"successfully logged in",token});
  }
  else{
    res.status(401).json({"message":"Invalid credentials"});
  }
});

router.get("/alluser", authenticate, async(req:MyRequest,res:Response)=>{
  const keyword = req.query.search ? 
  {
    $or: [
      {name : {$regex: req.query.search, $options:'i'} },
      {email : {$regex: req.query.search, $options:'i'} }
    ]
  } : {};
  const loggedUser = req.user;
  const users = await User.find(keyword).find({_id: {$ne: loggedUser}});
  res.status(200).json(users);
})

export default router;

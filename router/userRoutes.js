const express = require("express");
const { generateToken, authenticate } = require("../middleware/auth");
const router = express.Router();
const { User } = require("../model/models");


router.post("/register", async (req, res) => {
  const { name, email, password, pic } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(401).json({ message: "User already exists" });
    return;
  } else {
      let newUser = new User({ name, email, password, pic });
      const token = generateToken({"username":newUser._id})
      await newUser.save();
    res.status(200).json({"message":"User created succesfully",token: token,user:newUser})
  }
});

router.post("/login", async(req,res)=>{
  const { email, password} = req.body;
  const user = await User.findOne({ email,password});
  if(user){
    const token  = generateToken({username:user._id});
    res.status(200).json({"message":"successfully logged in",token});
  }
  else{
    res.status(401).json({"message":"Invalid credentials"});
  }
});

router.get("/alluser", authenticate, async(req,res)=>{
  const keyword = req.query.search ? 
  {
    $or: [
      {name : {$regex: req.query.search, $options:'i'} },
      {email : {$regex: req.query.search, $options:'i'} }
    ]
  } : {};

  const users = await User.find(keyword).find({_id: {$ne: req.user._id}});
  res.status.json(users);
})

module.exports = router;

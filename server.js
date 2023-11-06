const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/chats");
const conDb = require('./config/db');
const userRoutes = require('./router/userRoutes')


const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

conDb();

app.use(express.json());

app.use('/api/user',userRoutes);

app.use((req,res)=>{
  res.status(404).json({"message":"Route not found check URL"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

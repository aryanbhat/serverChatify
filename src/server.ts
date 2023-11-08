import express, {Express,Request,Response} from 'express';
import  dotenv from 'dotenv'
import { conDb } from './config/db';
import userRoutes from './router/userRoutes'
// const chatRoutes = require('../router/chatRoutes')

const app = express();
dotenv.config();
let port = process.env.PORT || 3000;
conDb();

app.use(express.json());

app.use('/api/user',userRoutes);
// app.use('/api/chat',chatRoutes);


app.get('/',(req,res)=>{
  res.json({"message":"app is deployed"})
})

app.use((req,res)=>{
  res.status(404).json({"message":"Route not found check URL"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

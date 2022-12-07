import { Router } from "express";
import * as Database from "../database/db.js"
import * as dotenv from 'dotenv'
import Bcrypt from "bcryptjs"
import Mongoose from "mongoose"
import JsonWebToken from "jsonwebtoken"
import fetchUserByToken from "../middlewares/token.js"
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config()
const secret = process.env.SECRET;

const router = Router();
router.use("/test",cors(),(req,res) => {
  if(req.method === "POST"){
    console.log(req.body)
    res.json({body : req.body})
    return;
  }
})
router.get("/history",(req,res) => {
  fetchUserByToken(req)
      .then(async (user) => {
        let authorization = req.cookies.authorization.toString();
        let decoded = JsonWebToken.verify(authorization, secret)
        let data = await Database.History.find({ email: decoded.email.toString() });
        res.json({history: data})
      })
      .catch((err) => {
        console.log("token not valid")
        res.json({success:false, error:err.toString()})
      })
})

router.post("/addToHistory",cors(),async (req,res) =>{
  let authorization = req.cookies.authorization.toString();
  let decoded = JsonWebToken.verify(authorization, secret);
  await Database.History.create({
    user: decoded.email,
    date: Date.now(),
    calculation:req.body.calc,
  })
})
router.post("/user/signup",cors(), (req,res) => {
    console.log(req.body.email)
    if(!req.body.email || !req.body.password) {
        res.json({success: false, error: "Send needed params"})
        return
    }
    let db = Mongoose.connection.readyState;
    Database.User.create({
      email: req.body.email,
      password: Bcrypt.hashSync(req.body.password, 10),
    }).then((user) => {
        console.log('user'+ user)
        const token = JsonWebToken.sign({id: user._id, email : user.email}, secret)
        res.json({success:true, token: token})    
      }).catch((err) => {
        res.json({success:false,error:err.toString()})
    })
  })
  
router.get("/example", (req,res) => {
  console.log(req.cookies)
    fetchUserByToken(req)
      .then((user) => {
        console.log("token valid")
        res.json({success:true})
      })
      .catch((err) => {
        console.log("token not valid")
        res.json({success:false, error:err.toString()})
      })
})
  
router.post("/user/login", (req, res) => {
    if(!req.body.email || !req.body.password) {
      res.json({success: false, error: "Send needed params"})
      return
    }
    Database.User.findOne({
      email: req.body.email,
    }).then(async (user) => {
      if (!user){
        res.json({success:false,error : "User does not exist"})
      } else {
        if (!Bcrypt.compareSync(req.body.password,user.password)) {
          res.json({success: false, error: "Wrong password"})
        } else {
          const token = JsonWebToken.sign({id : user._id, email : user.email}, secret)
          console.log(`token : ${token}`)

          res.json({success: true, token: token, })
        }
      }
    }).catch((err)=>{
      res.json({success: false,error:err.toString()})
    })
})


export default router;
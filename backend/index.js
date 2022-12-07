import express from "express";
import * as dotenv from 'dotenv';
import BodyParser from "body-parser"
import cors from "cors"
import cookieParser, { signedCookies } from "cookie-parser"
import UserRoutes from "./routers/UserRouter.js"
import session from "express-session"
dotenv.config()
const PORT = process.env.PORT || 3002;

const app = express();
const secret = process.env.SECRET;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
function server_initialize(){
  app.use(BodyParser.json())
  app.use(BodyParser.urlencoded({ extended: false }))
  app.use(express.urlencoded({extended: true}))
  app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin","localhost:3001");
    res.setHeader("Access-Control-Allow-Methods","GET,POST");
    res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type");
    res.setHeader("withCredentials","true");
    res.setHeader("SameSite","None");
    res.setHeader("secure","false");
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
  })
  app.use(
    cors({
      origin : "http://localhost:3000",
      credentials : true,
      optionsSuccessStatus:200,
    })
  )
  app.use(session(
    {
      resave: false,
      saveUninitialized: false,
      secret: secret,
      cookie:{
        maxAge: 1000*60*60,
        sameSite:"None",
        secure: true,
        httpOnly: true,
      },
    }
  ))
  app.use(cookieParser());
  app.use(UserRoutes);
}
server_initialize()

app.get("/api", (req,res) =>{
  res.json({"user": ["1","2","3"] })
})
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

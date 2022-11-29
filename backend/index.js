import express from "express";
<<<<<<< Updated upstream
import * as dotenv from 'dotenv'
=======
import * as dotenv from 'dotenv';
import BodyParser from "body-parser";
import UserRoutes from "./routers/UserRouter.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
>>>>>>> Stashed changes
dotenv.config()
const PORT = process.env.PORT || 3002;

const app = express();

<<<<<<< Updated upstream
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
=======
function server_initialize(){
  app.use(BodyParser.json())
  app.use(BodyParser.urlencoded({ extended: true }))
  app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin","localhost:3001");
    res.setHeader("Access-Control-Allow-Methods","GET,POST");
    res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type");
    next()
  })
  app.use(
    cors({
      origin : "http://localhost:3000",
      credentials : true,
    })
  )
  app.use(cookieParser());
  app.use(UserRoutes);
}
server_initialize()
>>>>>>> Stashed changes

app.get("/api", (req,res) =>{
  res.json({"user": ["1","2","3"] })
})
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
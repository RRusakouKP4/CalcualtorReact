import express from "express";
import * as dotenv from 'dotenv'
import * as Database from "./database/db.js"
import BodyParser from "body-parser"
import Bcrypt from "bcryptjs"
import Mongoose from "mongoose"
import JsonWebToken from "jsonwebtoken"
import UserRoutes from "./routers/UserRouter.js"
dotenv.config()
const PORT = process.env.PORT || 3001;

const app = express();
const secret = process.env.SECRET;

function server_initialize(){
  app.use(BodyParser.json())
  app.use(BodyParser.urlencoded({ extended: true }))
  app.use(UserRoutes);
}
server_initialize()
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

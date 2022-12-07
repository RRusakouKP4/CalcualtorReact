import JsonWebToken from "jsonwebtoken"
import * as dotenv from 'dotenv'
import * as Database from "../database/db.js"

dotenv.config()
const secret = process.env.SECRET;

function fetchUserByToken(req,res){
    return new Promise((resolve,reject) => {
      if(req.cookies && req.cookies.authorization){
        let authorization = req.cookies.authorization.toString()
        let decoded
        try{
          decoded = JsonWebToken.verify(authorization, secret)
        } catch (e){
          reject("Token is not valid")
          return
        }
        let userId = decoded.id
        Database.User.findOne({_id: userId})
          .then((user)=> {
            resolve(user)
          })
          .catch((err) => {
            reject("Token error")
          })
      } else{
        reject("No token found")
      }
    })
}

export default fetchUserByToken;
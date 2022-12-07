import Mongoose from "mongoose"
// const DATABASE_URL = "mongodb+srv://UserTest:Password@cluster0-k3ekk.mongodb.net/test?retryWrites=true&w=majority"
const DATABASE_URL="mongodb://127.0.0.1/authentication"


async function connectMongo(){
    await Mongoose.connect(DATABASE_URL, 
        {   useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
}
connectMongo()

let db = Mongoose.connection.readyState;
console.log(db)
const UserSchema = new Mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    }
    },
    {collection: "users"
})

const HistorySchema = new Mongoose.Schema({
    user:{
        type: String,
        lowercase: true,
        trim: true
    },
    date:{
        type: Date
    },
    calculation:{
        type: String,
        lowercase: true
    }
},
{
collection:"history"
})
let User = Mongoose.model("User", UserSchema)
let History = Mongoose.model("History", HistorySchema)
export {User,History};
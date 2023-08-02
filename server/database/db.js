import mongoose from "mongoose";


const Connection=async(username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-ikjrfed-shard-00-00.ubusrri.mongodb.net:27017,ac-ikjrfed-shard-00-01.ubusrri.mongodb.net:27017,ac-ikjrfed-shard-00-02.ubusrri.mongodb.net:27017/?ssl=true&replicaSet=atlas-mf2tst-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL,{useNewUrlParser:true,
         useUnifiedTopology: true,});
       console.log("Database connected successfully");
    }catch(err){
       console.log("Error while connecting with the database",err);
    }
}
export default Connection;
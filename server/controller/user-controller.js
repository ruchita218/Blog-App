import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../model/user.js";
import Token from "../model/token.js";
// import { request, response } from 'express';


dotenv.config();

export const signupUser=async(request,response)=>{
    try{
        //const salt=await bcrypt.genSalt();                //random string before encrypted password
        const hashedPassword=await bcrypt.hash(request.body.password,10);//appending salt
        const user={username:request.body.username,name:request.body.name,password:hashedPassword};
        const newUser=new User(user);
        await newUser.save();

        return response.status(200).json({msg:'signup successfull'})
    }catch(err){
        return response.status(500).json({msg:"Error while signup the user"})
    }
}
export const loginUser= async(request,response)=>{
    let user=await User.findOne({username:request.body.username});
    if(!user){
        return response.status(400).json({msg:'Username does not match'});
    }

    try{
        let match=await bcrypt.compare(request.body.password,user.password);
        if (match) {

            //temporary
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{
                "expiresIn":'15m'
            });
            //permanent
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY,{
                "expiresIn":'15m'
            });          //use to regenrate the accesstoken after when the time passes out

            const newToken=new Token({token:refreshToken})
            await newToken.save();


            return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken, name:user.name,  username:user.username});
        }else{
            return response.status(400).json({msg:'Invalid credentials'});
        }
    }catch(error){
        return response.status(500).json({msg:'Error while logging in user'});
    }
}
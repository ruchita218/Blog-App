import multer from 'multer';  //use to upload files to database
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import { request } from 'express';

dotenv.config();

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const storage=new GridFsStorage({
    url:`mongodb://${username}:${password}@ac-ikjrfed-shard-00-00.ubusrri.mongodb.net:27017,ac-ikjrfed-shard-00-01.ubusrri.mongodb.net:27017,ac-ikjrfed-shard-00-02.ubusrri.mongodb.net:27017/?ssl=true&replicaSet=atlas-mf2tst-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options:{useNewUrlParser:true},
    file:(request,file)=>{
        const match=["image/png" , "image/jpg"]; 

        if (match.indexOf(file.memeType)=== -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return{
            bucketName:"photos",  //collection name
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
        
})
export default multer({storage})
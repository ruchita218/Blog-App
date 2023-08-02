import express from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import Router from './routes/routes.js'
import cors from 'cors';
// import bodyParser from 'body-parser';



dotenv.config();
const app =express();

app.use(cors());          //get rid of proxy
app.use(express.json());  //handle api-post-put request
app.use(express.urlencoded({ extended: false }));


app.use('/',Router);

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

const USERNAME =process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);
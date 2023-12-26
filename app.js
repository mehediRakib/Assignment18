const express=require('express');
const app=new express();

const mongoSanitize=require('express-mongo-sanitize');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const hpp=require('hpp');
const bodyParser=require('body-parser');
const cors=require('cors')
const cookieParser=require('cookie-parser');
const xss=require('xss');
const mongoose = require("mongoose");



//security Middleware Implementation
app.use(helmet());
app.use(hpp());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(mongoSanitize());


const limiter=rateLimit({
    windowMs:15*60*1000,
    limit:100,
    legacyHeaders:false,
})
app.use(limiter);

//database Connection
let URL="mongodb+srv://<username>:<password>@cluster0.75qh3yi.mongodb.net/AssignmentDB?retryWrites=true&w=majority";
let Option={user:'rakib107054',pass:'rakib172561',autoIndex:true};
mongoose.connect(URL,Option).then((res)=>{
    console.log("Database connection successfull")
}).catch((e)=>{
    console.log(e);
})

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));

//routing

const router=require('./src/routes/api');
app.use('/api/v1',router);


//connect fornt-end to back-end
app.use(express.static('client/dist'));

//add react react front-end routing
app.use("*",(req,res)=>{
    res.sendFile(path.resolve(--__dirname,'client','dist','index.html'))
})



module.exports=app;

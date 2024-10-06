// console.log('Hello from node application');

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import user from "./routes/user.js";
import login from "./routes/login.js";
import signin from "./routes/signin.js";
const app = express();
const port = 3000;

const myLogger=function(req,res,next){
    console.log('Calling Api');
    next()
    console.log('Api calling has done');
}

app.use(express.json());
app.use(myLogger);
app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use('/',user);

app.use('/', login);

app.use('/', signin)



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});

export default app;
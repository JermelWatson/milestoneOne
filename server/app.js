// console.log('Hello from node application');

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import user from "./routes/user.js";
import login from "./routes/login.js";
import signin from "./routes/signin.js";
import update from "./routes/update.js";
import deleteUser from "./routes/delete.js";
import signinHelper from "./routes/signinHelper.js";
import forgotPassword from "./routes/forgotPassword.js";
import verify from "./routes/verify.js";
import testEmail from "./routes/testEmail.js";
import addUser from "./routes/addUser.js";
import changePassword from "./routes/changePassword.js";
import select_prereqs from "./routes/selectPrereqs.js";
import update_prereqs from "./routes/update_prereqs.js";
import create_record from "./routes/create_record.js";
import add_prereqs from "./routes/addPrereqs.js";
import add_courses from "./routes/addCourses.js";
import record_id from "./routes/getRecordId.js";
import advising_record from "./routes/advising_record.js";
import get_advising_history from "./routes/get_advising_history.js";
import getStudentRecord from "./routes/getStudetRecord.js";
const app = express();
const port = 3000;


app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
    origin:"https://milestoneone.onrender.com"
}))
app.use('/',user);

app.use('/', login);

app.use('/', signin)

app.use('/', update)

app.use('/', deleteUser)

app.use('/', signinHelper)

app.use('/', forgotPassword)

app.use('/', verify)

app.use('/', testEmail)

app.use('/', addUser)

app.use('/', changePassword)

app.use('/', select_prereqs)

app.use('/', update_prereqs)

app.use('/', create_record)

app.use('/', add_prereqs)

app.use('/', add_courses)

app.use('/', record_id)

app.use('/', advising_record)

app.use('/', get_advising_history)

app.use('/', getStudentRecord)





app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});

export default app;
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
const app = express();
const port = 3000;


app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use('/',user);

app.use('/', login);

const checkEmail = function(req, res, next){
    app.get("/", (req, res) => {
    connection.execute("select * from user_data", function (err, result) {
      if (err) {
        res.json(err.message);
        console.log(err)
      } else {
        res.json({
          status: 200,
          message: "Response from checker get api",
          data: result,
        });
      }
    });
  });
  console.log(res.json);
  next()
}
app.use(checkEmail)

app.use('/', signin)

app.use('/', update)

app.use('/', deleteUser)

app.use('/', signinHelper)

app.use('/', forgotPassword)

app.use('/', verify)

app.use('/', test)



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});

export default app;
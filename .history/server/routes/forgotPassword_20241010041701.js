import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
import { SendMail } from "../utils/SendEmail.js";
import user from "./user.js";
const forgotPassword = Router();

const sendVerificationCode = async (body) => {
  try {
    const formBody = JSON.stringify({
      email: body,
    });
    const response = await fetch("http://localhost:3000/signinHelper", {
      method: "POST",
      body: formBody,
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.status === 200) {
      return;
    }
  } catch (error) {
    console.error("Error sending verification code:", error);
  }
};

forgotPassword.post("/forgot-password", (req, res) => {
  connection.execute(
    "select * from user_data where email=?",
    [req.body.email],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        sendVerificationCode(req.body.email);
        res.json({
          status: 200,
          message: "User has logged in",
          data: result,
        });
        console.log(result);
      }
    }
  );
});

export default forgotPassword;

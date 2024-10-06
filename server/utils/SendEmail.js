import "dotenv/config";
import { createTransport } from "nodemailer";

export function SendMail(email, emailSubject, emailBody) {
    const transport = createTransport({
        host: process.env.HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.SECURE,
        requireTLS: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    })

    const mailOption = {
        from: process.env.SMTP_EMAIl,
        to: email,
        subject: emailSubject,
        html: emailBody,
    };


    console.log(mailOption);
    transport.sendMail(mailOption, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("Email sent sucvcessfully!");
        }
    })

}
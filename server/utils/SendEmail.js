import "dotenv/config";
import { createTransport } from "nodemailer";

export function SendMail(email, emailSubject, emailBody) {
    const transport = createTransport({
        host: process.env.HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.SECURE,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    })

    const mailOption = {
        from: process.env.EMAIL,
        to: email,
        subject: emailSubject,
        html: emailBody,
    };


    console.log(mailOption);
    transport.sendMail(mailOption, function (err, result) {
        if (err) {
            console.log('MAIL NOT SENT',err.message);
        }
        else {
            console.log("Email sent sucvcessfully!");
        }
    })

}
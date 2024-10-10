import "dotenv/config";
import { createTransport } from "nodemailer";

export function SendMail(email, emailSubject, emailBody) {
    const transport = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'jermel.watson26@gmail.com',
            pass: 'nqax mbno wmdq kjnc',
        },
    })

    const mailOption = {
        from: process.env.EMAIL,
        to: email,
        subject: emailSubject,
        text: `Your verification code is: ${emailBody}`,
    };
    transport.sendMail(mailOption, function (err, result) {
        if (err) {
            console.log('MAIL NOT SENT',err.message);
        }
        else {
            console.log("Email sent sucvcessfully!"+ result.response);
        }
    })

}
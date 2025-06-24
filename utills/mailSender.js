const nodemailer = require("nodemailer");

const mailSender = async (email, subject, body) => {

    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let mailOptions = await transporter.sendMail({
            from: `StudyNotion  || code aur Deepak - by Deepak Kuamr `,
            to: `${email}`,
            subject: `${subject}`,
            html: `${body}`,
        });
        console.log(mailOptions);
        return mailOptions;

    } catch (error) {
        console.log("Error occure ", error.message);
    }

}
module.exports = mailSender;
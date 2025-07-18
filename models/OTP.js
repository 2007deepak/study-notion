const mongoose = require("mongoose");
const mailSender = require("../utills/mailSender");

const  OTPSchema = new mongoose.Schema({

    email:{
        type: String,
        reqiured: true,
    },
    otp:{
        typr:String,
        required: true
    },
    createdAt:{
        type:Data,
        default: Date.now,
        expires: 5*60,
    },

    
});

// A Function -> to send emails

async function sendVerificationEmail(email, otp){

    try{
        const mailResponse = await mailSender(email, "Verifcation Email, from studyNotion", otp);
        console.log("Email sent successfully:", mailResponse);

    }
    catch(error){
        console.log("Error occured while sending mail:", Error);
        throw error;

    }
}
// Otp generateing middleware
// ye OTP Database me save hone se pehle chalega
 OTPSchema.pre("save", async function(next){
console.log("New document saved to database");

if(this.isNew){
         await sendVerificationEmail(this.email, this.otp);
         next();
}

})



const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
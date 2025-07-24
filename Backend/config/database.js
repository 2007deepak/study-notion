const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB =  () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Mongodb connected successfully"))
    .catch((error) => {
        console.log("DB Connection Failed", error);
        console.log("Exiting the process");
        process.exit(1);
    })
};
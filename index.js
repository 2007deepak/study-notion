const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Payments");
const paymentRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");

const database = require("./config/database.js")
const cookieParser = require("cookie-parser");
const cors = require("cors")
const{cloudinaryConnect } = require("./config/cloudinary.js");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
        cors({
            origin: "https://localhost:3000",
            credentials:true,
             })
       )

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

//default route

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your Server is up and running...."
    });
});
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
    
})

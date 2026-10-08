const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/user.js");

//auth

exports.auth = async (req, res, next) => {
  try {
    // extract token
    console.log("========== AUTH MIDDLEWARE ==========");
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("Authorization Header:", req.header("Authorization"));
    //if token is missing,then return responce

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is Missing",
      });
    }

    //verify the token

    try {
      // console.log("TOKEN RECEIVED:", token);
      // console.log("JWT_SECRET:", process.env.JWT_SECRET);

      // const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      // req.user = decode;
      console.log("TOKEN RECEIVED:", token);
      console.log("JWT_SECRET:", process.env.JWT_SECRET);

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED TOKEN:", decode);

      req.user = decode;
    } catch (error) {
      console.log("========== JWT ERROR ==========");
      console.log("JWT ERROR NAME:", error.name);
      console.log("JWT ERROR MESSAGE:", error.message);
      console.log("================================");
      return res.status(401).json({
        success: false,
        message: "token is invalid or expired",
      });
    }

    next();
  } catch (error) {
    console.log("========== AUTH OUTER ERROR ==========");
    console.log(error);
    console.log("MESSAGE:", error.message);
    console.log("======================================");
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong while validation the token",
    });
  }
};

//is Students

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "isStudent") {
      return res.status.json({
        success: false,
        message: "This is a Protected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      messagess: "User role cannot be verified, please try agian",
    });
  }
};

//isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      // console.log("User is :", req.user.accountType);

      return res.status(403).json({
        success: false,
        message: "This is a Protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      messagess: "User role cannot be verified, please try agian",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    console.log("Eamil is : ", req.user.accountType);

    if (req.user.accountType !== "Admin") {
      //  console.log("User is Admin");
      return res.status.json({
        success: false,
        message: "This is a Protected route for Admin only",
      });
    }
    console.log("Access Granted: User is Admin");
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      messagess: "User role cannot be verified, please try agian",
    });
  }
};

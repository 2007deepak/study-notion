const mongoose = require("mongoose");
// par reaserpassword conroller ko htaya hai

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      reqiured: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    accountType: {
      type: String,
      enum: ["Admin", "Student", "Instructor"],
      required: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    active: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    image: {
      type: String,
      required: true,
      default:
        "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
    },
    token: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
      },
    ],
    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true }
);
// / Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User", userSchema);
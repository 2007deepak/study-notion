const mongoose = require("mongoose");

const cotegorySchema = new mongoose.Schema({

    name:{
        type: String,
        require: true,

    },
    description:{
        type : String,

    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }
],


});

module.exports = mongoose.model("Cotegory", cotegorySchema);

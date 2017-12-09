var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    title:String,
    description:String,
    asked: { type: Date, default: Date.now },
    topic:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Topic"
        }
    ],
    answer:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answer"
        }
    ],
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        
        username:String
    }
    
});
module.exports = mongoose.model("Question",questionSchema);
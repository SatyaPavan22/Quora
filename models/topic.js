var mongoose = require("mongoose");

var topicSchema = new mongoose.Schema({
    name:String,
    followers:{type: Number,default:0},
    questions:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Question"
   }]
});

module.exports = mongoose.model("Topic",topicSchema);
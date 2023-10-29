const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User",
    },
    title : {
        type:String,
        required:true
    },
    note :{
        type:String,
        required: true
    }
},{
    timeStamps : true
})

module.exports = mongoose.model("Note",noteSchema)
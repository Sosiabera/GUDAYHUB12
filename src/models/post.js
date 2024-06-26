const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
    _id:{
        type:ObjectId,
    },
    JobTask:{
        type: String,
        required: true
    },
    Jobtype:{
        type: String,
        required: true
    },
    Jobtitle: {
        type: String,
        required: true
    },
    Description: {
        type: String,
    },
    Qualification: {
        type: String,
    },
    PostedDate: {
        type: String,
        required: true
    },  
    Deadline: {
        type: String,
        required: true
    },  
    Salary: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    urgency: {
        type: Boolean,
        required: true
    },
    employerid: {
        type: ObjectId
    }
});

module.exports = mongoose.model("Post", PostSchema);

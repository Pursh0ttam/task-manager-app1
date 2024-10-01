const { Schema, default: mongoose } = require("mongoose");


let todoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        unique:true,
        trim:true,
        toLowerCase:true       
    },   
    description: {
        type: String,
        required: [true, "Task description is required"],
        trim:true,
        toLowerCase:true
    },
    dueDate:{
        type:Date,
        required:[true,"task due date is required"],
        trim:true
    },
    prority:{
        type:String,
        required:[true,"task prority is required"],
        enum: ['low','medium','high'],
        trim:true,
        toLowerCase:true
    },
    status:{
        type:String,
        required:true,
        enum: ['pending','in-process','completed'],
        trim:true,
        toLowerCase:true
    }
}, { timestamps: true });

module.exports = mongoose.model("todo", todoSchema)
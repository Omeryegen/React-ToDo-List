const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    id: String,
    email: String,
    title: {
        type: String,
        required: true
    },
    progress: Number,
    date: Date
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const Task = mongoose.model("Task", taskSchema);
const User = mongoose.model("User", userSchema);

module.exports = {Task, User};
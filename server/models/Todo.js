const mongoose = require("../db");

const todoSchema = new mongoose.Schema({
    task: String,
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("Todo", todoSchema);

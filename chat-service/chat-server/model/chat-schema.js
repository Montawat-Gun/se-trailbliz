const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatMessageSchema = new Schema({
    timestamp: {
        type: Number,
    },
    sender: {
        type: String,
    },
    message: {
        type: String,
    }
});

const chatSchema = new mongoose.Schema({
    data: {
        type: [chatMessageSchema],
        default: []
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

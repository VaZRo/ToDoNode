const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    isComplete: { type: Boolean, default: false },
    description: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Task', taskSchema);
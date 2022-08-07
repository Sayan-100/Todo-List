const mongoose = require('mongoose');
const toDoSchema = new mongoose.Schema({
    Description: {
        type: String,
        required: true

    },

    Category: {
        type: String,
        required: true
    },

    DueDate: {
        type: String,
        required: true
    }
});

const to_do = mongoose.model('to_do', toDoSchema);
module.exports = to_do;
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    departmentName: {
        type: String,
        required: true
    },
    numberOfEmployees: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);

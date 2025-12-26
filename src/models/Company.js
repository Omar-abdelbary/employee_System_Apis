const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    numberOfDepartments: {
        type: Number,
        default: 0
    },
    numberOfEmployees: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);

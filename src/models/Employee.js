const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    employeeStatus: {
        type: String,
        enum: ['Application Received', 'Interview Scheduled', 'Hired', 'Not Accepted'],
        default: 'Application Received'
    },
    employeeName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Please fill a valid 10-digit mobile number'] // Simple validation
    },
    address: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    hiredOn: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for daysEmployed
employeeSchema.virtual('daysEmployed').get(function () {
    if (this.hiredOn && this.employeeStatus === 'Hired') {
        const oneDay = 24 * 60 * 60 * 1000;
        const today = new Date();
        const hiredDate = new Date(this.hiredOn);
        return Math.round(Math.abs((today - hiredDate) / oneDay));
    }
    return 0; // Or null if not hired
});

module.exports = mongoose.model('Employee', employeeSchema);

const express = require('express');
const router = express.Router();
const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getEmployees)
    .post(protect, authorize('Admin', 'Manager'), createEmployee);

router.route('/:id')
    .get(protect, getEmployee)
    .put(protect, authorize('Admin', 'Manager'), updateEmployee)
    .delete(protect, authorize('Admin'), deleteEmployee);

module.exports = router;

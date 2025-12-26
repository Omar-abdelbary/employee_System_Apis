const express = require('express');
const router = express.Router();
const {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getDepartments)
    .post(protect, authorize('Admin', 'Manager'), createDepartment);

router.route('/:id')
    .get(protect, getDepartment)
    .put(protect, authorize('Admin', 'Manager'), updateDepartment)
    .delete(protect, authorize('Admin'), deleteDepartment);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
} = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCompanies)
    .post(protect, authorize('Admin'), createCompany);

router.route('/:id')
    .get(protect, getCompany)
    .put(protect, authorize('Admin'), updateCompany)
    .delete(protect, authorize('Admin'), deleteCompany);

module.exports = router;

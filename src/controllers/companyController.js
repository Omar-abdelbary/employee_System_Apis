const Company = require('../models/Company');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private
const getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Private
const getCompany = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (company) {
            res.json(company);
        } else {
            res.status(404);
            throw new Error('Company not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a company
// @route   POST /api/companies
// @access  Private/Admin
const createCompany = async (req, res, next) => {
    try {
        const { companyName } = req.body;
        const company = await Company.create({ companyName });
        res.status(201).json(company);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Private/Admin
const updateCompany = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (company) {
            company.companyName = req.body.companyName || company.companyName;
            const updatedCompany = await company.save();
            res.json(updatedCompany);
        } else {
            res.status(404);
            throw new Error('Company not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Private/Admin
const deleteCompany = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            res.status(404);
            throw new Error('Company not found');
        }

        // Logic check for cascading delete Protection:
        // Ensure strictly no departments or employees exist before delete
        if (company.numberOfDepartments > 0 || company.numberOfEmployees > 0) {
            res.status(400);
            throw new Error('Cannot delete company with active departments or employees');
        }

        await company.deleteOne();
        res.json({ message: 'Company removed' });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
};

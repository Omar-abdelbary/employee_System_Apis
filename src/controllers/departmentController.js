const Department = require('../models/Department');
const Company = require('../models/Company');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
const getDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find().populate('company', 'companyName');
        res.json(departments);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Private
const getDepartment = async (req, res, next) => {
    try {
        const department = await Department.findById(req.params.id).populate('company', 'companyName');
        if (department) {
            res.json(department);
        } else {
            res.status(404);
            throw new Error('Department not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a department
// @route   POST /api/departments
// @access  Private/Admin/Manager
const createDepartment = async (req, res, next) => {
    try {
        const { company, departmentName } = req.body;

        const companyExists = await Company.findById(company);
        if (!companyExists) {
            res.status(404);
            throw new Error('Company not found');
        }

        const department = await Department.create({
            company,
            departmentName
        });

        // Update company department count
        companyExists.numberOfDepartments += 1;
        await companyExists.save();

        res.status(201).json(department);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a department
// @route   PUT /api/departments/:id
// @access  Private/Admin/Manager
const updateDepartment = async (req, res, next) => {
    try {
        const department = await Department.findById(req.params.id);
        if (department) {
            department.departmentName = req.body.departmentName || department.departmentName;
            const updatedDepartment = await department.save();
            res.json(updatedDepartment);
        } else {
            res.status(404);
            throw new Error('Department not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a department
// @route   DELETE /api/departments/:id
// @access  Private/Admin
const deleteDepartment = async (req, res, next) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            res.status(404);
            throw new Error('Department not found');
        }

        // Check for employees before delete
        if (department.numberOfEmployees > 0) {
            res.status(400);
            throw new Error('Cannot delete department with active employees');
        }

        const company = await Company.findById(department.company);
        
        await department.deleteOne();

        // Update company department count
        if (company) {
            company.numberOfDepartments = Math.max(0, company.numberOfDepartments - 1);
            await company.save();
        }

        res.json({ message: 'Department removed' });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
};

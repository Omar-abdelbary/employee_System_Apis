const Employee = require('../models/Employee');
const Company = require('../models/Company');
const Department = require('../models/Department');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find()
            .populate('company', 'companyName')
            .populate('department', 'departmentName');
        res.json(employees);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private
const getEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate('company', 'companyName')
            .populate('department', 'departmentName');
        
        if (employee) {
            res.json(employee);
        } else {
            res.status(404);
            throw new Error('Employee not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create an employee
// @route   POST /api/employees
// @access  Private/Admin/Manager
const createEmployee = async (req, res, next) => {
    try {
        const {
            company,
            department,
            employeeName,
            email,
            mobileNumber,
            address,
            designation
        } = req.body;

        // Validation: Check if department belongs to company
        const dept = await Department.findById(department);
        if (!dept) {
            res.status(404);
            throw new Error('Department not found');
        }

        if (dept.company.toString() !== company) {
            res.status(400);
            throw new Error('Department does not belong to the selected company');
        }

        const employee = await Employee.create({
            company,
            department,
            employeeName,
            email,
            mobileNumber,
            address,
            designation,
            employeeStatus: 'Application Received' // Default status
        });

        // Update counts
        const comp = await Company.findById(company);
        if (comp) {
            comp.numberOfEmployees += 1;
            await comp.save();
        }

        dept.numberOfEmployees += 1;
        await dept.save();

        res.status(201).json(employee);
    } catch (error) {
        next(error);
    }
};

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Private/Admin/Manager
const updateEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            res.status(404);
            throw new Error('Employee not found');
        }

        // Logic for Workflow Transitions
        if (req.body.employeeStatus) {
            const currentStatus = employee.employeeStatus;
            const newStatus = req.body.employeeStatus;

            const allowedTransitions = {
                'Application Received': ['Interview Scheduled', 'Not Accepted'],
                'Interview Scheduled': ['Hired', 'Not Accepted'],
                'Hired': [], // Terminal state for onboarding
                'Not Accepted': [] // Terminal state
            };

            // Allow updates if status is not changing (e.g. updating fields), only check transition if status changes
            if (currentStatus !== newStatus) {
                if (!allowedTransitions[currentStatus] || !allowedTransitions[currentStatus].includes(newStatus)) {
                    // Start of workaround: Allow admin to override or allow 'back' transitions if strictly needed, 
                    // but per requirements, these are the allowed ones.
                    // For now, strict enforcement:
                    res.status(400);
                    throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
                }

                if (newStatus === 'Hired') {
                    employee.hiredOn = Date.now();
                }
            }
            employee.employeeStatus = newStatus;
        }

        // Update other fields
        employee.employeeName = req.body.employeeName || employee.employeeName;
        employee.email = req.body.email || employee.email;
        employee.mobileNumber = req.body.mobileNumber || employee.mobileNumber;
        employee.address = req.body.address || employee.address;
        employee.designation = req.body.designation || employee.designation;

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);

    } catch (error) {
        next(error);
    }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            res.status(404);
            throw new Error('Employee not found');
        }

        const companyId = employee.company;
        const departmentId = employee.department;

        await employee.deleteOne();

        // Update counts
        const company = await Company.findById(companyId);
        if (company) {
            company.numberOfEmployees = Math.max(0, company.numberOfEmployees - 1);
            await company.save();
        }

        const department = await Department.findById(departmentId);
        if (department) {
            department.numberOfEmployees = Math.max(0, department.numberOfEmployees - 1);
            await department.save();
        }

        res.json({ message: 'Employee removed' });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
};

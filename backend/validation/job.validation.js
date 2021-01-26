const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateJobInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.jobtype = !isEmpty(data.jobtype) ? data.jobtype : "";
    data.max_positions = !isEmpty(data.max_positions) ? data.max_positions : "";
    data.max_applications = !isEmpty(data.max_applications) ? data.max_applications : "";
    data.duration = !isEmpty(data.duration) ? data.duration : "";
    data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
    data.salary = !isEmpty(data.salary) ? data.salary : "";

    // Title checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }
    // Type checks
    if (Validator.isEmpty(data.jobtype)) {
        errors.jobtype = "Jobtype is required";
    }
    if (Validator.isEmpty(data.max_positions)) {
        errors.max_positions = "Max positions is required";
    }
    if (Validator.isEmpty(data.max_applications)) {
        errors.max_applications = "Max applications is required";
    }
    if (Validator.isEmpty(data.duration)) {
        errors.duration = "Duration is required";
    }
    if (Validator.isEmpty(data.deadline)) {
        errors.deadline = "Deadline is required";
    }
    if (Validator.isEmpty(data.salary)) {
        errors.salary = "Salary is required";
    }

    if(isNaN(data.duration)) {
        errors.duration = "Duration should be a number from 0(indefinite) to 6";
    }
    if((data.duration>6)||(data.duration<0)) {
        errors.duration = "Duration must be between 0 to 6 months";
    }
    
    if(isNaN(data.max_positions)) {
        errors.max_positions = "Maximum positions should be a number";
    }
    if((data.max_positions<0)) {
        errors.max_positions = "Maximum positions should be a positive number";
    }
    if(isNaN(data.max_applications)) {
        errors.max_applications = "Maximum applications should be a number";
    }
    if((data.max_applications<0)) {
        errors.max_applications = "Maximum applications should be a positive number";
    }

    if((data.max_applications<data.max_positions)) {
        errors.max_applications = "Maximum applications should not be less than maximum positions";
    }

    if(isNaN(data.salary)) {
        errors.salary = "Salary should be a number";
    }
    if((data.salary<0)) {
        errors.salary = "Salary should be a positive number";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
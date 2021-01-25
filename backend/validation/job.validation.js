const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateJobInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.rec_email = !isEmpty(data.rec_email) ? data.rec_email : "";
    data.rec_name = !isEmpty(data.rec_name) ? data.rec_name : "";
    data.jobtype = !isEmpty(data.jobtype) ? data.jobtype : "";

    // Title checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }
    // Type checks
    if (Validator.isEmpty(data.jobtype)) {
        errors.jobtype = "Jobtype is required";
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
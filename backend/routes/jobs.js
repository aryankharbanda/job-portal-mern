var express = require("express");
var router = express.Router();

// Load input validation
const validateJobInput = require("../validation/job.validation");

// Load Jobs model
const Job = require("../models/job.model");
const Application = require("../models/application.model");

// ADD JOB
// @route POST jobs/create
// @access Public
router.post("/create", (req, res) => {
    
    // Form validation
    const { errors, isValid } = validateJobInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
        
    const newJob = new Job({
        title: req.body.title,
        rec_email: req.body.rec_email,
        rec_name: req.body.rec_name,
        max_positions: req.body.max_positions,
        max_applications: req.body.max_applications,
        duration: req.body.duration,
        jobtype: req.body.jobtype,
        salary: req.body.salary,
        deadline: req.body.deadline
    });

    newJob.save()
        .then(job => res.json(job))
        .catch(err => res.json(err));       
            
});

// GET request 
// Getting all jobs
// @route   GET jobs/

router.get("/", function(req, res) {
    Job.find( (err, jobs) => {
		if (err) {
			console.log(err);
		} else {
			res.json(jobs);
		}
	})
});

// Apply for JOB
// @route POST jobs/apply
// @access Public
router.post("/apply", (req, res) => {
        
    const newApplication = new Application({
        jobId: req.body.jobId,
        appId: req.body.appId,
        sop: req.body.sop,
    });

    newApplication.save()
        .then(job => res.json(job))
        .catch(err => res.json(err));
});


module.exports = router;

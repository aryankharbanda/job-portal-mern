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
			res.json(err);
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
        .then(application => {
            Job
                .findById(req.body.jobId)
                .then(job => {
                    const new_no_apps = job.no_applications + 1;
                    Job.findByIdAndUpdate(req.body.jobId, {no_applications: new_no_apps})
                        .then(res => {
                            console.log("Job updated");
                            // res.json(application);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).send(err);
                        })
                    })
                .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
                })
            res.json(application);
            
        })
        .catch(err => res.status(400).json(err));
});

// Show applicant's applications
// @route POST jobs/myapps
// @access Public
router.post("/myapps", (req, res) => {

    const applicantId = req.body.appId;
        
    Application
        .find({appId: applicantId})
        .populate('jobId')
        .exec()
        .then((err,docs) => {
            if (err) {
                res.json(err);
            } else {
                res.json(docs);
            }
        })
        .catch(err => res.json(err));
});

// Show recruiter's jobs
// @route POST jobs/myjobs
// @access Public
router.post("/myjobs", (req, res) => {

    const mail = req.body.rec_email;
        
    Job
        // .find({rec_email: rec_email})
        .find({rec_email: mail})
        .exec()
        .then((err,docs) => {
            if (err) {
                res.json(err);
            } else {
                res.json(docs);
            }
        })
        .catch(err => res.json(err));
});

// Show all applications for a job
// @route POST jobs/jobapps
// @access Public
router.post("/jobapps", (req, res) => {

    const jobId = req.body.jobId;
        
    Application
        .find({jobId: jobId})
        .populate('jobId')
        .populate({
            path : 'appId',
            populate : {
              path : 'aprofileId'
            }
          })
        .exec()
        .then((err,docs) => {
            if (err) {
                res.json(err);
            } else {
                res.json(docs);
            }
        })
        .catch(err => res.json(err));
});

// Accept applicant to job by recruiter
// @route POST jobs/accept
// @access Public
router.post("/accept", (req, res) => {

    const applicationId = req.body.applicationId;
    const status = req.body.status;
    
    if(status==="Applied"){
        Application
            .findByIdAndUpdate(
                applicationId,
                {$set:{status:'Shortlisted'}},
                {new: true}
            )
            .then( () => res.json('Status changed to shortlisted'))
            .catch(err => res.status(400).json(err));
    }

    if(status==="Shortlisted"){
        
    }
});


module.exports = router;
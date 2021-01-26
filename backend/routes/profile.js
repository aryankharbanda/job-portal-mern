var express = require("express");
var router = express.Router();

const Rprofile = require("../models/rprofile.model");
const Aprofile = require("../models/aprofile.model");

// create rprofile entry on register
// @route POST profile/rcreate
// @access Public
router.post("/rcreate", (req, res) => {

    const newRprofile = new Rprofile({
        name: req.body.name,
        email: req.body.email
    });

    newRprofile.save()
    .then(rprofile => {
        res.status(200).json(rprofile);
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

// edit rprofile entry on profile page
// @route POST profile/redit
// @access Public
router.post("/redit", (req, res) => {

    Rprofile.findOneAndUpdate(
        { email: req.body.email }, 
        {$set:{bio:req.body.bio, phone:req.body.phone}},
        {new: true}, 
        (err, doc) => {
            if(err){
                console.log(err);
            }
            console.log(doc);
        })
        .then(() => res.json('Rprofile updated!'))
        .catch(err => res.status(400).json(err));
});

// get details
router.post("/rget", (req, res) => {

    Rprofile.find({email: req.body.email})
        .then(rprofile => {
            res.json(rprofile);
        })
        .catch(err => res.status(400).json(err));

});

// get details
router.post("/aget", (req, res) => {

    Aprofile.findOne({email: req.body.email})
        .then(aprofile => {
            res.json(aprofile);
        })
        .catch(err => res.status(400).json(err));

});

// edit aprofile entry on profile page
// @route POST profile/aedit
// @access Public
router.post("/aedit", (req, res) => {

    Aprofile.findOneAndUpdate(
        { email: req.body.email }, 
        {$set:{skills:req.body.skills, education:req.body.education}},
        {new: true}, 
        (err, doc) => {
            if(err){
                console.log(err);
            }
            console.log(doc);
        })
        .then( () => res.json('Aprofile updated!'))
        .catch(err => res.status(400).json(err));
});

module.exports = router;

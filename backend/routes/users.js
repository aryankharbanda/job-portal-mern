var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/user.model");
const Rprofile = require("../models/rprofile.model");
const Aprofile = require("../models/aprofile.model");


// REGISTER
// @route POST users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            // let id = "id";
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                type: req.body.type,
                password: req.body.password
            });
            
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => {
                        res.json(user);

                        // create rprofile on register
                        if(req.body.type === "r"){
                            const newRprofile = new Rprofile({
                                name: req.body.name,
                                email: req.body.email
                            });
                            newRprofile.save();
                        }
                        // create aprofile on register
                        if(req.body.type === "a"){
                            const newAprofile = new Aprofile({
                                name: req.body.name,
                                email: req.body.email
                            });
                            newAprofile
                                .save()
                                .then(aprofile => {
                                    User.findByIdAndUpdate(
                                        user._id,
                                        { $set:{aprofileId: aprofile._id}},
                                        (err,user) => {
                                            if (err){ 
                                                console.log(err) 
                                            } 
                                            else{ 
                                                console.log("aprofile created"); 
                                            } 
                                        }
                                    );  
                                })
                                .catch(err => console.log(err));
                        }

                    })
                    .catch(err => res.json(err));
                });
            });
            
        }
    });
  });

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type
            };
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                    success: true,
                    token: "Bearer " + token,
                    user: user
                    });
                }
            );
        } 
        else 
        {
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
        });
    });
});

// BOILERPLATE
// GET request 
// Getting all the users
/**
 * @route   GET users/
 * @desc    Get all users
 * @access  Public
 */
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

module.exports = router;


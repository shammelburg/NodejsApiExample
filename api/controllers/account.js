const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../services/nodemailer');

const mongoose = require('mongoose');
const accountRepo = require('../repos/account');
const User = require('../models/user');

exports.account_get = async (req, res, next) => {
    try {
        res.status(200).json(req.userData);
    } catch (err) {
        next(err);
    }
}

exports.account_register = async (req, res, next) => {

    let users = await accountRepo.account_find_user(req.body.email);

    if (users.length > 0) {
        return res.status(200).json({
            message: 'Already exists'
        });
    } else {
        // Encrypt password
        bcrypt.hash(req.body.password, 10, async (err, encrypted) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                try {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        hash: encrypted
                    });

                    // Submit data in SQL / MongoDB
                    // ...

                    let result = await accountRepo.account_store_user(user);

                    if (result._id) {
                        mailer.sendMail(user);

                        res.status(200).json({
                            message: 'You have successfully registered.',
                            user: user
                        })
                    } else {
                        return res.status(400).json({
                            error: 'An error occured trying to create this user.'
                        });
                    }
                } catch (error) {
                    next(error);
                }
            }
        })
    }

}

exports.account_login = async (req, res, next) => {
    let users = await accountRepo.account_find_user(req.body.email);

    if (users.length < 1) {
        return res.status(401).json({
            message: 'Auth failed.'
        });
    } else {

        // Query data in SQL / MongoDB
        // ...

        let user = users[0];

        // Compare submitted password against DB stored hash
        bcrypt.compare(req.body.password, user.hash, (err, same) => {
            if (!same) {
                return res.status(401).json({
                    error: err,
                    message: 'Login failed.'
                })
            } else {
                // Generate JWT
                const token = jwt.sign({
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    // more user data
                }, process.env.JWT_KEY, {
                    expiresIn: process.env.JWT_DURATION
                });

                res.status(200).json({
                    token: token
                })
            }
        })
    }
}
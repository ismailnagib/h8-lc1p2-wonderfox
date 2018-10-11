const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {

    register: function (req, res) {
        if (/\S+@\S+\.\S+/.test(req.body.email) === false) {
            res.status(500).json({message: 'Please input a valid email address'})
        } else {
            User.findOne({
                email: req.body.email
            })
            .then(data => {
                if (data) {
                    res.status(500).json({success: false, message: 'Email has been registered before'})
                } else {
                    if (req.body.password.length >= 6) {
                        let hashedPassword = bcrypt.hashSync(req.body.password)
                        User.create({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword
                        })
                        .then(() => {
                            res.status(201).json({success: true, message: `Account ${req.body.name} created`})
                        })
                    } else {
                        res.status(500).json({success: false, message: 'Password has to be at least 6 characters long'})
                    }
                }
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
        }
    },

    login: function (req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(data => {
            if (data) {
                let validPassword = bcrypt.compareSync(String(req.body.password), data.password)
                if (validPassword) {
                    let token = jwt.sign({ id: data._id }, process.env.JWT_KEY)
                    res.status(201).json({token: token})
                } else {
                    res.status(500).json({message: 'Wrong password'})
                }
            } else {
                res.status(500).json({message: 'Email is unregistered'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}
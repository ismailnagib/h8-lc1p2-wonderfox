const Event = require('../models/eventModel')

module.exports = {

    create: function (req, res) {
        Event.create({
            name: req.body.name,
            location: req.body.location,
            address: req.body.address,
            user: req.userId
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    showAll: function (req, res) {
        Event.find({})
        .populate('user')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    search: function (req, res) {
        Event.find({
            name: new RegExp(req.params.keyword, 'i')
        })
        .populate('user')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}
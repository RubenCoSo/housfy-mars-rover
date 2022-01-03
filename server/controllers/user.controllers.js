const express = require("express");
const Game = require("../models/Game.model");
const User = require("../models/User.model");

module.exports.userInfo = (req, res, next)=>{
    const id = req.params.id

    User.findById(id)
        .populate('missions')
        .then((user)=>{
            res.json(user.missions)
        })
        .catch((err)=>console.log(err))
}
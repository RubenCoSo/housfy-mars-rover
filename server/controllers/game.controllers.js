const express = require("express");
const Game = require("../models/Game.model");
const User = require("../models/User.model");


module.exports.saveGame = (req, res, next)=>{

    const { userId, wrongInstructions, totalInstructions, missionName} = req.body

    Game.create({missionName, wrongInstructions, totalInstructions})
    .then((savedGame)=>{
        res.json(savedGame)
        console.log(savedGame)
        User.findByIdAndUpdate(userId, {$push:{ missions: savedGame._id}},{new:true})
        .then((modUser)=> console.log(modUser))
    })
    .catch((err)=>console.log(err));
}
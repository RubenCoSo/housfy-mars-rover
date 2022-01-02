const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    missionName: {
      type: String,
    },
    wrongInstructions: {
      type: Number,
    },
    totalInstructions: Number,
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;

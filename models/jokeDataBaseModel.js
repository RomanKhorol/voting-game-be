const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const voteSchema = new Schema({
  value: { type: Number, required: true, default: 0 },
  label: { type: String, required: true },
});

const jokeSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    votes: { type: [voteSchema], default: [] },
    availableVotes: { type: [String], default: [] },
  },
  { versionKey: false, timestamps: true }
  //   прибираємо "__v": 0 з данних які приходять
);



jokeSchema.post("save", handleMongooseError);
//емулюємо код помилки при вводі невірних данних 400,
//так як mongoose викидає помилку без статусу, і наша мідлвара в app.js ставить код 500
//а повинен бути код при невірних данних 400

const Joke = model("joke", jokeSchema);


const addJokeSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  votes: Joi.array().required(),
  availableVotes: Joi.array().required(),
});
const updateJokeSchema = Joi.object({
 
  question: Joi.string().required(),
  answer: Joi.string().required(),
  votes: Joi.array().required(),
  availableVotes: Joi.array().required(),
});
const updateVotesSchema = Joi.object({
  
  votes: Joi.array().required(),
});



const shemas = {
  addJokeSchema,
  updateJokeSchema,
  updateVotesSchema,
};
module.exports = { Joke, shemas };

const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/HttpError");
const {Joke} = require("../models/jokeDataBaseModel");

const getAll = async (req, res) => {
  const result = await Joke.find();
  
  res.json(result);
}; 

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Joke.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Joke.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const result = await Joke.findByIdAndUpdate(id, req.body, { new: true });
  // new: true - повертає нову версію об'єкта після оновлення
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};



const updateVotes = async (req, res) => {
  const { id } = req.params;
  const result = await Joke.findByIdAndUpdate(id, req.body, { new: true });
  // new: true - повертає нову версію об'єкта після оновлення
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Updated successfull",
  });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Joke.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateVotes: ctrlWrapper(updateVotes),
  deleteById: ctrlWrapper(deleteById),
};

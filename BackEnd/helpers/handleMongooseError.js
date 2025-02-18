const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next();
  //емулюємо код помилки при вводі невірних данних 400,
  //так як mongoose викидає помилку без статусу, і наша мідлвара в app.js ставить код 500
  //а повинен бути код при невірних данних 400
};
module.exports = handleMongooseError;

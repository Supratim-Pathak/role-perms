const mongoose = require("mongoose");

const init = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DATABASE CONNECTED.");
    return true;
  } catch (error) {
    console.log("ERROR IN DATABASE CONNECTION :", error.message);
    return false;
  }
};

module.exports = {
  init,
};

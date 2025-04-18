// utils/mongo.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectMongoDB = () => {
  const mongoURI = process.env.MONGO_URI;
  return mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectMongoDB;

const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const dbConnect = () => {
    mongoose.connect(DB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
        console.log("DB connection failed");
        console.error(error);
        process.exit(1);
    })
};

module.exports = dbConnect;
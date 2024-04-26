const mongoose = require("mongoose");
require("dotenv").config();
//Define the MongoDB connection URL
const mongoURL = "mongodb+srv://vishnugupta964432:apigupta1234@cluster0.r5ply0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Connect to MongoDB
exports.connect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( () => {console.log("DB connected successfully");})
    .catch( (err) => {
        console.log("Error connecting to MongoDB");
        console.error(err);
        process.exit(1);
    })
};
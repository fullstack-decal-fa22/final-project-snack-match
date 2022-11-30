const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb://127.0.0.1:27017/snack-match-tests";
const InitiateMongoServer = async () => {
    try {
        // attempts a connection to the database
        await mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
    });
    // console message indicates that a proper connection has been made
    console.log("Connected to DB !!");
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = InitiateMongoServer;
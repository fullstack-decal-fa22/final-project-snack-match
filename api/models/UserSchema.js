const mongoose = require("mongoose");

// create a database schema for storing Party information
const UserSchema = mongoose.Schema({
    // nickname inputted by user
    nickname: {
        type: String,
        required: true,
    },
    // party id provided by user
    partyId: {
        type: String,
        required: true,
    },
    // list containing all restaurants taken from the party schema
    voteCounter: {
        type: Object,
        required: true,
    },
    // provided in default scheme
    // could be used as another parameter for authentification?
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// export model party with UserSchema
module.exports = mongoose.model("user", UserSchema);
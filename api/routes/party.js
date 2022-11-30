const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();

// imports mongodb scheme from User.js
const PartySchema = require("../models/PartySchema");
const UserSchema = require("../models/UserSchema");
// imports middleware for token verification
const auth = require("./../middleware/auth");

// generate code for the new party
function generateCode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/* Create new party given a set of input parameters from frontend
and return a code with a list of restaurants fitting those parameters */
router.post(
  '/create', 
  [
    // checks to make sure the required parameters are valid inputs
    check("nickname", "Please Enter a Valid Username").not().isEmpty(),
    check("numCards", "Please Enter a Valid Number of Cards").not().isEmpty(),
  ],
  async (req, res) => {
    // checks if the request is valid according to http-express standards
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // saves request body as js object
    const { nickname, distance, price, numCards } = req.body;

    // fetch list containing restaurant objects from api
    // const restaurantList = fetchRestaurants(numCards, distance, price);
    const restaurantList = ["Mezzo", "D'Yar"];

    // generate code for the new party
    const partyId = generateCode(6);

    // try/catch checks for any errors in the process
    try {
      // creates the host user
      host = new UserSchema({
        nickname,
        partyId,
        restaurantList,
      });
      // updates user schema
      await host.save();

      var partyMembers = [nickname];
      // creates a new party with the newly created user as the host 
      party = new PartySchema({
        partyId,
        host: nickname,
        partyMembers,
        restaurantList,
      });
      // updates party schema
      await party.save();

      const payload = {
        host: { id: host.id }
      };

      // provides user with JWT to access the party upon account registration
      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (error, token) => {
        if (error) throw error;
        res.status(200).json({ token });
      });

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error in Saving");
    }
});

/* Join party using code from host
ensures that the code matches an existing, non-full party */
router.post(
  '/join',
  [
    // checks to make sure the required parameters are valid inputs
    check("nickname", "Please Enter a Valid Username").not().isEmpty(),
    check("partyId", "Please Enter a Valid Party ID").not().isEmpty(),
  ],
  async (req, res) => {
    // checks if the request is valid according to http-express standards
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // saves request body as js object
    const { nickname, partyId } = req.body;

    // try/catch checks for any errors in the process
    try {
      // checks to see whether a party with the given ID exists
      let party = await PartySchema.findOne({ partyId: partyId });

      if (!party) {
        return res.status(400).json({ message: "Party Doesn't Exist" });
      };
      if (party.partyMembers.length == 6) {
        return res.status(400).json({ message: "Party is Full" });
      };
      
      // fetches restaurant list from the party
      const restaurantList = party.restaurantList;

      // creates a new user
      user = new UserSchema({
        nickname,
        partyId,
        restaurantList,
      });
      // updates user schema
      await user.save();

      // update party member list in the party
      const partyMembers = party.partyMembers;
      partyMembers.push(nickname);
      await party.save();

      const payload = {
        user: { id: user.id }
      };

      // provides user with JWT to access the party upon account registration
      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (error, token) => {
        if (error) throw error;
        res.status(200).json({ token });
      });

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
});

/* Retrieve party info (restaurant list, 
party members, etc) and provide it to the frontend */ 
router.get('/info', auth, async (req, res) => {
  try {
    // finds the party info that the user belongs to
    const user = await UserSchema.findOne({ 
      nickname: req.body.nickname 
    });
    // finds the party info that the user belongs to
    const party = await PartySchema.findOne({ 
      partyId: user.partyId 
    });
    res.json(party);
  } catch (error) {
    res.send({ message: "Error in Fetching Party" });
  }
});

/* Retrieve user info (restaurant list, 
party members, etc) and provide it to the frontend */ 
router.get('/user', auth, async (req, res) => {
  try {
    // finds user info from the database
    const user = await UserSchema.findOne({ 
      nickname: req.body.nickname 
    });
    res.json(user);
  } catch (error) {
    res.send({ message: "Error in Fetching User" });
  }
});

// delete information in a database
router.delete('/clear', async (req, res) => {
  try {
    let party = await PartySchema.findOne({ partyId: req.body.partyId });
    
    if (!party) {
      return res.status(400).json({ message: "Party Doesn't Exist" });
    };
    // deletes the party and all of its members with the specified party Id
    UserSchema.deleteMany({ partyId: req.body.partyId });
    PartySchema.deleteOne({ partyId: req.body.partyId });
    res.send({ message: "Party Data Cleared from DB" });
  } catch (error) {
      res.send({ message: "Error in Clearing Info" });
  }
});

module.exports = router;

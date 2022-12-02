const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();
const yelpAPI = require('yelp-api');

// imports mongodb scheme from User.js
const PartySchema = require("../models/PartySchema");
const UserSchema = require("../models/UserSchema");

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

// Create a new yelpAPI object with your API key
let apiKey = '7kiciiJ9UTNzpKVAb_dR3oZ1IrvqXwqjn91HfKM2ZlHtuBpFCCN8SJdpCn8OJkdbzRgMp3q0wf7xwSDeYr2l8lXwGBXtwjJOsrum6Ka2wlw6DlJI9w-zeydBRk19Y3Yx';
let yelp = new yelpAPI(apiKey);

/* Create new party given a set of input parameters from frontend
and return a code with a list of restaurants fitting those parameters */
router.post(
  '/create', 
  [
    // checks to make sure the required parameters are valid inputs
    check("nickname", "Please Enter a Valid Username").not().isEmpty(),
    check("limit", "Please Enter a Valid Number of Cards").not().isEmpty(),
  ],
  async (req, res) => {

    // checks if the request is valid according to http-express standards
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // saves request body as js object
    const { nickname, location, distance, price, limit } = req.body;
    // convert distance from miles --> meters
    const radius = distance * 1609;

    let params = [
      {term: "food"}, 
      {open_now: true}, 
      {price: price}, 
      {location: location}, 
      {radius: radius}, 
      {limit: limit}
    ];
  
    const output = await yelp.query('businesses/search', params);
    const restaurantList = JSON.parse(output).businesses;
    // console.log(restaurantList)
  
    const voteCounter = {};
    for (let i = 0; i < restaurantList.length; i++) {
      let id = restaurantList[i].id;
      voteCounter[id] = 0;
    }
    
    // generate code for the new party
    const partyId = generateCode(6);

    // try/catch checks for any errors in the process
    try {
      // creates the host user
      host = new UserSchema({
        nickname,
        partyId,
        voteCounter,
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

      res.status(200).json({ message: `Party ${partyId} Created!` });

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
      const voteCounter = {};
      for (let i = 0; i < restaurantList.length; i++) {
        let id = restaurantList[i].id;
        voteCounter[id] = 0;
      };

      // creates a new user
      user = new UserSchema({
        nickname,
        partyId,
        voteCounter,
      });
      // updates user schema
      await user.save();

      // update party member list in the party
      const partyMembers = party.partyMembers;
      partyMembers.push(nickname);
      await party.save();

      res.status(200).json({ message: `Joined Party ${partyId}!` });

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
});

/* Retrieve party info (restaurant list, 
party members, etc) and provide it to the frontend */ 
router.get('/info', async (req, res) => {
  try {
    // finds the party info that the user belongs to
    const user = await UserSchema.findOne({ 
      nickname: req.query.nickname 
    });
    // finds the party info that the user belongs to
    const party = await PartySchema.findOne({ 
      partyId: user.partyId 
    });
    res.json(party);
  } catch (error) {
    res.status(500).send({ message: "Error in Fetching Party" });
  }
});

/* Retrieve user info (restaurant list, 
party members, etc) and provide it to the frontend */ 
// router.post('/user', async (req, res) => {
//   try {
//     const { nickname, restId, vote } = req.body;
//     // finds user info from the database
//     const user = await UserSchema.findOne({ 
//       nickname: nickname 
//     });
//     // changes user vote in the voteCounter object and uploads changes
//     let counter = user.voteCounter;
//     counter[restId] = vote;
//     user.voteCounter = counter;
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     res.status(500).send({ message: "Error in Fetching User" });
//   }
// });

router.get('/user', async (req, res) => {
  try {
    const { nickname } = req.query;
    // finds user info from the database
    const user = await UserSchema.findOne({ 
      nickname: nickname 
    });
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "Error in Fetching User" });
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

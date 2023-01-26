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
			return res.status(400).json({ 
				message: errors.array()[0].msg 
			});
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

			var memberList = [nickname];
			// creates a new party with the newly created user as the host 
			party = new PartySchema({
				partyId,
				host: nickname,
				memberList,
				restaurantList,
			});
			// updates party schema
			await party.save();
			res.status(200).json({ 
				partyId: partyId
			});

		} catch (error) {
			console.log(error.message);
			res.status(500).send({
				message: "Error in Saving"
			});
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
			return res.status(400).json({ 
				message: errors.array()[0].msg 
			});
		}
		// saves request body as js object
		const { nickname, partyId } = req.body;

		// try/catch checks for any errors in the process
		try {
			// checks to see whether a party with the given ID exists
			let party = await PartySchema.findOne({ partyId: partyId });
			// makes sure the party exists/is joinable
			if (!party) {
				return res.status(400).json({ 
					message: "Party Doesn't Exist" 
				});
			};
			if (party.memberList.length == 6) {
				return res.status(400).json({ 
					message: "Party is Full" 
				});
			};
			if (party.memberList.includes(nickname)) {
				return res.status(400).json({ 
					message: "Nickname Already In Use" 
				});
			};
			if (party.isClosed) {
				return res.status(400).json({ 
					message: "Party Can No Longer Be Joined" 
				});
			}
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
			const memberList = party.memberList;
			memberList.push(nickname);
			await party.save();

			res.status(200).json({ 
				message: `Joined Party ${partyId}!` 
			});

		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: "Error in Saving"
			});
		}
});

/* Join party using code from host
ensures that the code matches an existing, non-full party */
router.post('/upload-votes', async (req, res) => {
	const { nickname, partyId, voteCounter } = req.body;
	try {
		// checks to see whether a party with the given ID exists
		let user = await UserSchema.findOne({ 
			partyId, nickname 
		});
		user.voteCounter = voteCounter;
		// updates user schema
		await user.save();

		res.status(200).json({ 
			message: "Successfully uploaded vote count"
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send({
			message: "Error in Saving"
		});
	}
});

//// GET REQUESTS

// Retrieve restaurant list info and provide it to the frontend 
router.get('/restaurants', async (req, res) => {
	try {
		// finds the party info that the user belongs to
		const party = await PartySchema.findOne({ 
			partyId: req.query.partyId 
		});
		res.status(200).json(party.restaurantList);
	} catch (error) {
		res.status(500).send({ 
			message: "Error in Fetching Party" 
		});
	}
});

/* Retrieve user list and provide it to the frontend */ 
router.get('/users', async (req, res) => {
	try {
		// finds the party info that the user belongs to
		const party = await PartySchema.findOne({ 
			partyId: req.query.partyId 
		});
		res.status(200).json(party);
	} catch (error) {
		res.status(500).send({ 
			message: "Error in Fetching Party" 
		});
	}
});

router.post('/compile-results', async (req, res) => {
	try {
		// find the party information in order to see member list
		let partyId = req.body.partyId;
		const party = await PartySchema.findOne({ 
			partyId  
		});
		let memberList = party.memberList;
		let restaurantList = party.restaurantList;
		// create a tally for the entire group
		const groupTally = {};
		for (let i = 0; i < restaurantList.length; i++) {
			let id = restaurantList[i].id;
			groupTally[id] = 0;
		};
		// iterate through member list and add votes to group total
		for (let i = 0; i < memberList.length; i++) {
			const user = await UserSchema.findOne({ 
				partyId, nickname: memberList[i]  
			});
			let voteCounter = user.voteCounter;
			for (let id in voteCounter) {
				groupTally[id] += voteCounter[id];
			};
		};
		// finds the corresponding restaurant Id's with the most votes
		const results = [];
		for (let i = 0; i < 3; i++) {
			let largestNum = 0;
			let largestId = null;
			for (let id in groupTally) {
				if (groupTally[id] > largestNum) {
					largestNum = groupTally[id];
					largestId = id;
				};
			};
			results.push(largestId);
			delete groupTally[largestId];
		};		
		// saves match results to database
		party.matchResults = results;
		await party.save();
		
		res.status(200).json({ 
			message: "Successfully tallied results"
		});
	} catch (error) {
		res.status(500).send({ 
			message: "Error calculating vote tallies" 
		});
	}
});

// close the party to prevent new users from joining
router.post('/close-party', async (req, res) => {
	try {
		// finds the party to be marked as closed
		const party = await PartySchema.findOne({ 
			partyId: req.body.partyId 
		});
		party.isClosed = true;
		await party.save();

		res.status(200).json({
			message: `Party ${req.body.partyId} Successfully Closed`
		});
	} catch (error) {
		res.status(500).send({ 
			message: "Error in Fetching Party" 
		});
	}
});

module.exports = router;
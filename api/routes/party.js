const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// imports mongodb scheme from User.js
const PartySchema = require("../models/PartySchema");

router.post('/create', (req, res) => {
  /* Create new party given a set of input parameters from frontend
    and return a code with a list of restaurants fitting those parameters*/
});

router.post('/join', (req, res) => {
  /* Join party using code from host
    ensures that the code matches an existing, non-full party */
});

router.get('/info', (req, res) => {
  /* Some way to retrieve party info (restaurant list, 
    party members, etc) and provide it to the frontend */ 
});

module.exports = router;

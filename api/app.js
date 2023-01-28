// const createError = require("http-errors");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// websocket.io initialization
const https = require('https');
const { Server } = require('socket.io');
const server = https.createServer(app);
const io = new Server(server, {
	cors: {
		methods: ["GET", "POST"]
	}
});

var partyRouter = require("./routes/party");
app.use("/party", partyRouter);

const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

require('dotenv').config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})

io.on('connection', (socket) => {
	// console.log(`a user connected: ${socket.id}`);

	socket.on('party-creation', (data) => {
		socket.join(data.partyId);
	});

	socket.on('party-connection', (data) => {
		socket.join(data.partyId);
		socket.to(data.partyId).emit('new-connection');
	});

	socket.on('start-request', (data) => {
		socket.in(data.partyId).emit('start-matching');
	});

	socket.on('finish-voting', (data) => {
		socket.to(data.partyId).emit('other-user-finished', data.nickname);
	});

	socket.on('navigate-to-results', (data) => {
		socket.in(data.partyId).emit('finish-matching');
	});

	// executed when a user disconnects from the server
	socket.on('disconnect', () => {
		// console.log('A user disconnected');
	});
});

// initiates the server on the provided port
server.listen(PORT, (req, res) => {
	console.log(`Server hosted on port: ${PORT}`);
});

module.exports = app;

// const createError = require("http-errors");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// websocket.io initialization
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

var partyRouter = require("./routes/party");
app.use("/party", partyRouter);

const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

const PORT = process.env.PORT || 9000;


io.on('connection', (socket) => {
	console.log(`a user connected: ${socket.id}`);

	socket.on('party-creation', (data) => {
		console.log(`a party has been created on the backend by name: ${data.nickname}`);
		socket.join(data.partyId);
	});

	socket.on('party-connection', (data) => {
		console.log(`${data.nickname} has joined the party with Id: ${data.partyId}`);
		socket.join(data.partyId);
		socket.to(data.partyId).emit('new-connection', data.nickname);
		// console.log(socket.rooms); 
	});

	socket.on('start-request', (data) => {
		console.log(`${data.partyId} has started matching`);
		socket.in(data.partyId).emit('start-matching');
	});

	socket.on('finish-request', (data) => {
		console.log(`${data.partyId} has finished matching`);
		socket.in(data.partyId).emit('upload-count');
	});

	// executed when a user disconnects from the server
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

// initiates the server on the provided port
server.listen(PORT, (req, res) => {
	console.log(`Server Started at http://localhost:${PORT}`);
});

module.exports = app;

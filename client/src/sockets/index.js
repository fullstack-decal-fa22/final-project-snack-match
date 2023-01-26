import io from "socket.io-client";
import { socketEvents } from "./events";
import { createPartySocket, joinPartySocket } from "./emit";

export const socket = io("ws://localhost:9000");

export function initSockets ({ nickname, partyId, isHost, gameState, setGameState, fetchPartyMembers, uploadVoteCount, fetchResults }) {
	socketEvents({ gameState, setGameState, fetchPartyMembers, uploadVoteCount, fetchResults });
	if (isHost) {
		createPartySocket({ nickname, partyId });
	} else {
		joinPartySocket({ nickname, partyId });
	}
};
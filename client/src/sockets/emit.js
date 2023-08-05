import { socket } from "./index";

export const createPartySocket = ({ nickname, partyId }) => {
    socket.emit('party-creation', { nickname, partyId });
};
export const joinPartySocket = ({ nickname, partyId }) => {
    socket.emit('party-connection', { nickname, partyId });
};
export const userFinishVoting = ({ nickname, partyId }) => {
    socket.emit('finish-voting', { nickname, partyId });
}

// group-related events
export const socketStartRequest = (partyId) => {
    socket.emit('start-request', { partyId });
}
export const socketFinishRequest = (partyId) => {
    socket.emit('navigate-to-results', { partyId });
}
export const navigateToResults = (partyId) => {
    socket.emit('navigate-to-results', { partyId });
}
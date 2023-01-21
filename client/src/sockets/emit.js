import { socket } from "./index";

export const createPartySocket = ({ nickname, partyId }) => {
    socket.emit('party-creation', { nickname, partyId });
};

export const joinPartySocket = ({ nickname, partyId }) => {
    socket.emit('party-connection', { nickname, partyId });
};

export const startMatching = (partyId) => {
    console.log('partyId in start matching: ', partyId)
    socket.emit('start-request', { partyId });
}

export const finishMatching = (partyId) => {
    console.log('matching complete')
    socket.emit('finish-request', { partyId });
}

import { socket } from './index';

export const socketEvents = ({ setGameState, fetchPartyMembers, fetchResults }) => {
    socket.on('new-connection', () => {
        fetchPartyMembers();
    });

    socket.on('other-user-finished', (otherUser) => {
        setGameState(state => { 
            let partyMembers = state.partyMembers;
            partyMembers[otherUser] = true;
            for (let member in partyMembers) {
                if (!partyMembers[member]) {
                    return {...state, partyMembers};
                };
            };
            let isGroupFinished = state.isGroupFinished;
            isGroupFinished = true;
            return {...state, partyMembers, isGroupFinished};
        });
    });
    socket.on('start-matching', () => {
        setGameState((state) => {
            return {...state, stage: 2};
        });
    });
    socket.on('finish-matching', () => {
        fetchResults();
    })
};
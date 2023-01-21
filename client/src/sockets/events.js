import { socket } from './index';

export const socketEvents = ({ setGameState, fetchPartyMembers, uploadVoteCount }) => {
    socket.on('new-connection', (data) => {
        console.log(`new connection found from socket server`);
        fetchPartyMembers();
    })

    socket.on('start-matching', () => {
        console.log(`New game state: 2`);
        setGameState((state) => {
            return {...state, stage: 2};
        });
    });

    socket.on('upload-count', () => {
        console.log('upload vote count');
        uploadVoteCount();
    })
    
    socket.on('finish-matching', () => {
        console.log('new game state: 3');
        setGameState((state) => {
            return {...state, stage: 3};
        });
    })
};
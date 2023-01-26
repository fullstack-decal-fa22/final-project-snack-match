import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantList, setGroupResults, setPartyHost, setMemberList } from '../redux/party';
import { setVoteCounter } from '../redux/user';
import axios from 'axios';
import { initSockets } from "../sockets";
import { socketStartRequest, socketFinishRequest, userFinishVoting } from '../sockets/emit';

import Party from '../pages/Party';
import Restaurants from '../pages/Restaurants';
import Results from '../pages/Results';

export const SocketContext = createContext({  
    stage: 1,
    // each party member given --> name: [id, isHost, isFinished]
    partyMembers: {},
    isGroupFinished: false,
});

export function GameContainer() {

    const nickname = useSelector((state) => state.user.nickname);
    const partyId = useSelector((state) => state.user.partyId);
    const isHost = useSelector((state) => state.user.isHost);
    const voteCounter = useSelector((state) => state.user.voteCounter);

    const [ gameState, setGameState ] = useState({
        stage: 1,
        partyMembers: {},
        isGroupFinished: false,
    });

    const dispatch = useDispatch();
    async function fetchRestaurants() {
        axios
            .get('http://localhost:9000/party/restaurants', { params: { partyId }})
            .then((data) => {
                let restaurantList = data.data;
                dispatch(setRestaurantList(restaurantList));
                let voteCounter = {};
                for (let element of restaurantList) {
                    voteCounter[element.id] = 0
                };
                dispatch(setVoteCounter(voteCounter));
            })
            .catch((error) => console.log(error.response.data));
    };

    async function fetchPartyMembers() {
        axios
            .get('http://localhost:9000/party/users', { params: { partyId }})
            .then((data) => {
                let host = data.data.host;
                dispatch(setPartyHost(host));

                let memberList = data.data.memberList;
                let partyMembers = {}
                for (let i = 0; i < memberList.length; i++) {
                    partyMembers[memberList[i]] = false
                }
                setGameState(state => { 
                    return {...state, partyMembers}
                });
                dispatch(setMemberList(memberList));
            })
            .catch((error) => console.log(error.response.data));
    };

    async function uploadVoteCount () {
        axios
            .post('http://localhost:9000/party/upload-votes', { 
                    partyId, nickname, voteCounter 
                })
            .then((data) => {
                setGameState(state => { 
                    let partyMembers = state.partyMembers;
                    partyMembers[nickname] = true;
                    for (let member in partyMembers) {
                        if (!partyMembers[member]) {
                            return {...state, partyMembers};
                        };
                    };
                    let isGroupFinished = state.isGroupFinished;
                    isGroupFinished = true;
                    return {...state, partyMembers, isGroupFinished};
                });
                userFinishVoting({ nickname, partyId });
            })
            .catch((error) => console.log(error.response.data));
    };

    async function fetchResults () {
        await axios
            .get('http://localhost:9000/party/results', { params: { partyId }})
            .then((data) => {
                let groupResults = data.data;
                dispatch(setGroupResults(groupResults));
            })
            .catch((error) => console.log(error.response.data));
        setGameState((state) => {
            return {...state, stage: 3};
        });
    };

    function startMatching() {
        axios
            .post('http://localhost:9000/party/close-party', { partyId })
            .then((data) => {
                console.log(data.data.message)
            })
            .catch((error) => console.log(error.response.data));
        socketStartRequest(partyId);
        setGameState((state) => {
            return {...state, stage: 2};
        });
    };

    async function finishMatching() {
        await axios
            .post('http://localhost:9000/party/compile-results', { partyId })
            .then((data) => {
                console.log(data.data.message)
            })
            .catch((error) => console.log(error.response.data));
        socketFinishRequest(partyId);
        await fetchResults();
    }
    
    useEffect(() => {
        fetchRestaurants();
        fetchPartyMembers();
    }, [])

    useEffect(() => {
        initSockets({ 
            nickname, partyId, isHost, gameState, 
            setGameState, fetchPartyMembers, 
            uploadVoteCount, fetchResults 
        });
    }, [ initSockets ]);


    switch (gameState.stage) {
        case 1 : 
            return <SocketContext.Provider value={gameState}><Party startMatching={startMatching} /></SocketContext.Provider>;
        case 2 : 
            return <SocketContext.Provider value={gameState}><Restaurants uploadVoteCount={uploadVoteCount} finishMatching={finishMatching}/></SocketContext.Provider>;
        case 3 :
            return <SocketContext.Provider value={gameState}><Results /></SocketContext.Provider>;
        default : 
            return <Navigate to='/' />;
    }
};
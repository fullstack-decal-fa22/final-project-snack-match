import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantList, setPartyMembers, setGroupResults } from '../redux/party';
import { setVoteCounter } from '../redux/user';
import axios from 'axios';
import { initSockets } from "../sockets";

import Party from '../pages/Party';
import Restaurants from '../pages/Restaurants';
import Results from '../pages/Results';

export const SocketContext = createContext({  
    stage: 1,
    memberList: []
});

export function GameContainer() {

    const nickname = useSelector((state) => state.user.nickname);
    const partyId = useSelector((state) => state.user.partyId);
    const isHost = useSelector((state) => state.user.isHost);

    const [ gameState, setGameState ] = useState({
        stage: 1,
        memberList: [],
    });

    const dispatch = useDispatch();
    function fetchRestaurants() {
        axios
            .get('http://localhost:9000/party/restaurants', { params: { partyId }})
            .then((data) => {
                let restaurantList = data.data.restaurantList;
                dispatch(setRestaurantList(restaurantList));
                let voteCounter = {};
                for (let element of restaurantList) {
                    voteCounter[element.id] = 0
                };
                dispatch(setVoteCounter(voteCounter));
            })
            .catch((error) => console.log(error.response.data));
    };

    function fetchPartyMembers() {
        axios
            .get('http://localhost:9000/party/users', { params: { partyId }})
            .then((data) => {
                let partyMembers = data.data.partyMembers;
                setGameState(state => { 
                    return {...state, memberList: partyMembers}
                });
                dispatch(setPartyMembers(partyMembers));
            })
            .catch((error) => console.log(error.response.data));
    };

    function uploadVoteCount () {
        axios
            .get('http://localhost:9000/party/users', { params: { partyId }})
            .then((data) => {
                let partyMembers = data.data.partyMembers;
                setGameState(state => { 
                    return {...state, memberList: partyMembers}
                });
                dispatch(setPartyMembers(partyMembers));
            })
            .catch((error) => console.log(error.response.data));
    };

    function fetchResults () {
        axios
            .get('http://localhost:9000/party/results', { params: { partyId }})
            .then((data) => {
                let groupResults = data.data;
                dispatch(setGroupResults(groupResults));
            })
            .catch((error) => console.log(error.response.data));
    };
    
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
            return <SocketContext.Provider value={gameState}><Party /></SocketContext.Provider>;
        case 2 : 
            return <SocketContext.Provider value={gameState}><Restaurants /></SocketContext.Provider>;
        case 3 :
            return <SocketContext.Provider value={gameState}><Results /></SocketContext.Provider>;
        default : 
            return <Navigate to='/' />;
    }
};
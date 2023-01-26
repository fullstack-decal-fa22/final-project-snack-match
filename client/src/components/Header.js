import * as React from "react";
import { Flex, Icon, IconButton, Image } from "@chakra-ui/react";
import { FaDoorOpen } from "react-icons/fa";
import SideLogo from "../styles/logo-side-title.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { resetUserState } from '../redux/user';
import { resetPartyState } from '../redux/party';

function Header() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    function returnHome() {
        dispatch(resetUserState());
        dispatch(resetPartyState());
        navigate('/')
    }

    return(
        <Flex 
            width='100%' 
            padding='10px 0'
            maxWidth='sm' 
            align='center' 
            justify='space-between'
        >
            <Image 
                src={SideLogo}  
                alt="fullstack logo"
                width="200px"  
            />
            <IconButton 
                margin='10px'
                icon={<Icon as={FaDoorOpen} w={25} h={25}/>}
                onClick={() => returnHome()}
            />
        </Flex>
    );
};

export default Header;
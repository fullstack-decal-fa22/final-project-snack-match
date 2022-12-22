import * as React from "react";
import { Flex, Icon, IconButton, Image, Box } from "@chakra-ui/react";
import { FaDoorOpen } from "react-icons/fa";
import SideLogo from "../styles/logo-side-title.png";

const Header = (props) => {
    return(
        <Flex w='100%' px='6' py='5' align='center' justify='space-between'>
            <Image 
                src = {SideLogo}  
                alt = "fullstack logo"
                width="200px"  
            />
            <IconButton icon={<Icon as={FaDoorOpen} w={25} h={25}/>}/>
        </Flex>
    );
};

export default Header;
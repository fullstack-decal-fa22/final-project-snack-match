import * as React from "react";
import { Flex, Icon, Text, Center, IconButton } from "@chakra-ui/react";
import { FaDoorOpen } from "react-icons/fa";
import styles from "./Header.module.css";

function Header(props) {
    return(
        <div className={styles['header']}>
            <Flex w='100%' px='6' py='5' align='center' justify='space-between'>
                <Text fontSize='2xl' as='b'>
                    SnackMatch
                </Text>
                <IconButton icon={<Icon as={FaDoorOpen} w={25} h={25}/>}/>
            </Flex>
        </div>
    );
};

export default Header;
import * as React from "react";
import { Box, Stack } from '@chakra-ui/react';

function MemberBox(props) {

    const memberNames = props.memberList;
    const fillerLength = 6 - props.memberList.length;
    for (let i = 0; i < fillerLength; i++) {
        memberNames.push("--------");
    };

    return(
        <Stack spacing={4}>
            {props.memberList.map((name, index) => (
                <Box 
                    key={index}
                    width="100%" 
                    display="flex" 
                    justifyContent="center"
                    borderWidth="1px"
                    borderRadius="md" 
                    bg="secondary"
                    p="2"
                >
                    {name}
                </Box>
            ))}
        </Stack>
    )
}

export default MemberBox;
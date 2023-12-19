import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = ()=>{
    return (
       <VStack w={"full"} h={"90vh"} justifyContent={"center"}>
            <Box transform={"scale(3)"}>
                <Spinner size={"xl"} />
            </Box>
       </VStack>
    )

}

export default Loader;
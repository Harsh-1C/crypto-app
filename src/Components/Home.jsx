import { Box, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import imgSrc from "../Assets/logo.png"
import {motion} from "framer-motion";

const Home = () =>{
    return (
       <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>

        <motion.div
            style={{
                height:"80vh",
            }}
            animate={{
                translateY:"20px",
            }}
            transition={{
                duration:2,
                repeat:Infinity,
                repeatType:"reverse",   
            }}  
        >
        <Image w={"full"} h={"full"} objectFit={"contain"} src={imgSrc} filter={"grayscale(1)"}/>
        </motion.div>
           
            <Text fontFamily={"Bebas Neue"} fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"whiteAlpha.900"} letterSpacing={"widest"}>Xcrypto </Text>
       </Box>
    )
}

export default Home;
import { Button, HStack, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png"


const Header = () =>{
    return (
       <HStack p={"4"} shadow={"md"} bgColor={"blackAlpha.900"} >
        <Link to="/">
            <Image src={logo} w={"10"} h={"10"} objectFit={"contain"} alt={"logo"} mx={"4"}/>
        </Link>
            <Button variant={"unstyled"} color={"white"}>
                <Link to={"/"}>Home</Link>
            </Button>
            <Button variant={"unstyled"} color={"white"}>
                <Link to={"/exchanges"}>Exchanges</Link>
            </Button>
            <Button variant={"unstyled"} color={"white"}>
                <Link to={"/coins"}>Coins</Link>
            </Button>
       </HStack>
    )
}

export default Header;
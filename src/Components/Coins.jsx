import axios from "axios";
import React, { useEffect, useState } from "react";
import {server} from "../constants";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import CoinsCard from "./CoinsCard";

const btns = new Array(132).fill(1);

const Coins = () =>{

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr")

    const currencySymbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

    const changePage = (page)=>{
        setLoading(true);
        setPage(page);
    }

     useEffect(()=>{
            const fetchCoins = async ()=>{
               try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`); 
                setCoins(data);
                setLoading(false);
               } catch (error) {
                setLoading(false)
                setError(true);
               
               }
            }
       
            fetchCoins();
     },[currency, page])


    // Early return due to error
    if(error) return <Error msg={"Error while fetching coins"}/>

    return (
        <Container maxW={"container.xl"} >
            <HStack flexWrap={"wrap"}>
            {loading?<Loader />:(<>
               
            <RadioGroup value={currency} onChange={setCurrency}>
                        <HStack spacing={"4"} p={"8"}>
                            <Radio value={"inr"}>INR</Radio>
                            <Radio value={"usd"}>USD</Radio>
                            <Radio value={"eur"}>EURO</Radio>
                        </HStack>
            </RadioGroup>
           
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {
                coins.map(item => <CoinsCard  
                    id = {item.id}
                    key = {item.id}
                    img={item.image}
                    name = {item.name}
                    url = {item.url}
                    price = {item.current_price}
                    symbol={item.symbol}
                    currencySymbol={currencySymbol}
                    />)
               }
            </HStack>

            <HStack overflowX={"auto"} w={"full"} p={8}>
               {
                btns.map((item, ind)=>(
                    <Button bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(ind+1)}>
                    {ind+1}
                </Button>
                ))
                }
                
            </HStack> 

             </>)
        }

            </HStack>
       
        

</Container>
    )
}


export default Coins;



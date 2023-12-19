import { Container, Radio, RadioGroup, HStack, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText , StatArrow, Progress, Box} from "@chakra-ui/react";

import { Badge } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../constants";
import Error from "./Error"




const CoinDetails = () =>{

    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState("inr");


    
    const currencySymbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

    const {id} = useParams();

    useEffect(()=>{
        const fetchCoinDetail = async ()=>{
           try {
            const {data} = await axios.get(`${server}/coins/${id}`); 
            setCoin(data);
            setLoading(false);
           } catch (error) {
            setLoading(false)
            setError(true);
           
           }
        }
   
        fetchCoinDetail();
 },[id])


    if(error) return <Error msg = "Failed to load coin details" />

    const curr = coin.market_data?.current_price[`${currency}`];
    const high = coin.market_data?.high_24h[`${currency}`];
    const low = coin.market_data?.low_24h[`${currency}`];
    const per = ((curr-low)/(high-low))*100;

    return (
        <Container maxW={"container.xl"} >
            { loading ? <Loader /> : (
                <>
                     <RadioGroup value={currency} onChange={setCurrency}>
                        <HStack spacing={"4"} p={"8"}>
                            <Radio value={"inr"}>INR</Radio>
                            <Radio value={"usd"}>USD</Radio>
                            <Radio value={"eur"}>EURO</Radio>
                        </HStack>
                     </RadioGroup>

                     <VStack spacing={4} p={"16"} alignItems={"flex-start"}>
                        <Text opacity={0.7} alignSelf={"center"}>
                            Last updated on {Date().split('G')[0]}
                        </Text>

                        <Image src={coin.image.large} w={"20"} h={"20"} objectFit={"contain"} />
                        <Stat>
                            <StatLabel>{coin.name}</StatLabel>
                            <StatNumber>{currencySymbol}{coin.market_data.current_price[`${currency}`]}</StatNumber>
                            <StatHelpText>
                                <StatArrow type = {coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
                                {coin.market_data.price_change_percentage_24h}%
                            </StatHelpText>
                        </Stat>

                        <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
                            #{coin.market_cap_rank}  
                        </Badge>


                        <CustomBar high = {`${currencySymbol}${coin.market_data.high_24h[currency]}`} low = {`${currencySymbol}${coin.market_data.low_24h[currency]}`} per = {per}/>

                        <Box w={"full"} p={"4"}>
                            <Item text={"Max Supply"} value={coin?.market_data?.max_supply} />
                            <Item text={"Circulating Supply"} value={coin?.market_data?.circulating_supply} />
                            <Item text={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                            <Item text={"All time low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                            <Item text={"All time high"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
                        </Box>
                     </VStack>
                </>
            )}     
        </Container>
        )
    
}

const Item = ({text, value}) => (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontSize={"xl"} letterSpacing={"widest"} fontFamily={"Bebas Neue"}>{text}</Text>
        <Text fontSize={"xl"} fontWeight={600}>{value}</Text>
    </HStack>
)


const CustomBar = ({high, low, per}) => (
    <VStack w={"full"}>
        <Progress value={per} colorScheme="teal" w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
            <Badge children={low} colorScheme="red"></Badge>
            <Text fontSize={"sm"}>
                24H Range
            </Text>
            <Badge children={high} colorScheme="green"></Badge>
        </HStack>
    </VStack>
)



export default CoinDetails;
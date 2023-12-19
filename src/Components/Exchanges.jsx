import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../constants";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import Error from "./Error";

const Exchanges = () =>{

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
     useEffect(()=>{
            const fetchExchanges = async ()=>{

               try {
                const {data} = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);
               } catch (error) {
                setLoading(false)
                setError(true);
               
               }
            }
       
        fetchExchanges();
     },[])

    // Early return due to error
    if(error) return <Error msg={"Error while fetching Exchanges"}/>

    return (
        <Container maxW={"container.xl"} >
            <HStack justifyContent={"space-evenly"} flexWrap={"wrap"}>
            {loading?<Loader />:(<>
               {
                exchanges.map(item => <ExchangeCard  {...item} key = {item.id}/>)
               }
            
            </>)}
            </HStack>
        </Container>
    )
}

export default Exchanges;
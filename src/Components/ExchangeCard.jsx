import { VStack, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";

const ExchangeCard = ({name, trust_score_rank, image, url})=>{
    return (
        <a href={url} target="blank">
            <VStack w={52} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"}
            css={{
                "&:hover":{
                    transform:"scale(1.1)",
                }
            }}
            >
                <Image src={image} w={"10"} h={"10"} objectFit={"contain"}  alt={"coin"} />
                <Heading size={"md"} noOfLines={1} >{trust_score_rank}</Heading>
                <Text noOfLines={1} fontSize={"xl"}>{name}</Text>
            </VStack>
        </a>
    )
}

export default ExchangeCard;
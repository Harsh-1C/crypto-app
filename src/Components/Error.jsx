import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import React from "react";

const Error = (error) => {

    return (
      <Alert status="error" position={"fixed"} top={"20"} left={"50%"}
      w={"container.lg"}
      borderRadius={"md"}
      transform={"translateX(-50%)"}
      >
        <AlertIcon/>
        <Text fontWeight={600}>{error.msg?error.msg:"Oops 404: Page Not Found"}</Text>
         
      </Alert>
    )
}

export default Error;
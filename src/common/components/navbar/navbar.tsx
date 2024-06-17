import { Flex, Input, Text } from "@sparrowengg/twigs-react";
import { SearchIcon } from "@sparrowengg/twigs-react-icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [text, setText] = useState("");
  const [route, setRoute] = useState("");

  useEffect(() => {
    if(location.pathname === "/admin"){
      setText("User")
      setRoute("/")
      
    }else{
      setText("Admin");
      setRoute("/admin")
    }
    
  }, [location]);

  return (
    <Flex
      css={{
        padding: "$10",
        background: "$accent500",
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        css={{
          color: "$white900",
          fontWeight: "$7",
          fontSize: "$l",
        }}
      >
        SparrowEcomm
      </Text>
      <Input
        placeholder="Search for products"
        leftIcon={<SearchIcon />}
        css={{
          width: "30%",
        }}
      />
      <Link
        style={{
          backgroundColor: "#3B1E94",
          color: "white",
          padding: "10px 15px",
          borderRadius: "10px",
        }}
        to={route}
      >
        {text}
      </Link>
    </Flex>
  );
};

export default Navbar;

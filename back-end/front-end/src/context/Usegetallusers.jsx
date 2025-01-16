import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { GiCardJackDiamonds } from "react-icons/gi";
import { ConversationContext } from "./ConversationContext";

function Usegetallusers() {
  const [allusers, setAllusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setConversation} = useContext(ConversationContext)

  useEffect(() => {
    async function getusers() {
      setLoading(true);
      try {
        const token = document.cookie;
        console.log(token);
        let response = await axios.get("/user/allusers",{
          credentials : "includes",
          headers :{
            Authorization : `Bearer ${token}`
          }
        });
        let data = response.data;
        console.log(data);
        setConversation(data[0])
        setAllusers(data);
        setLoading(false);
      } catch (error) {
        console.log("Error  in usegetAllUsers :" + error);
      }
    }
    getusers();
  }, []);

  return [allusers,loading];
}

export default Usegetallusers;

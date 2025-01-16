import { useState, createContext } from "react";
export const ConversationContext = createContext();

export const ConversationContextProvider = ({children}) => {
  console.log('i am ConversationContext')
  const[conversation , setConversation] = useState({})
  const[messages , setMessages] = useState([])

  return <ConversationContext.Provider value={{conversation , setConversation , messages , setMessages}}>
    {children}
  </ConversationContext.Provider>;
};

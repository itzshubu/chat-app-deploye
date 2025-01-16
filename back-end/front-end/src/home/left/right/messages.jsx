import React, { useEffect , useRef} from "react";
import Message from "./Message";
import useGetmessages from "../../../context/MessagesHook";
import useGetSocketMessage from "../../../context/useGetSocketMessage";

const messages = () => {
  let { loading, messages } = useGetmessages();
  console.log("i am in messages",messages);
  useGetSocketMessage()
  const lastMesgRef = useRef()
  useEffect(()=>{
          if(lastMesgRef.current){
            console.log(lastMesgRef.current.scrollHeight)
            lastMesgRef.current.scrollTo({
              top:lastMesgRef.current.scrollHeight,
              behavior: 'smooth',
            });
          }
  },[messages])
 
  return (
    <div className="h-[80vh] scrollbar-none overflow-y-scroll overflow-x-hidden" ref={lastMesgRef}>
      {loading && <div className="h-[80vh] flex justify-center items-center">loading chat ........ wait......</div>}
      {!loading && messages.length == 0 && <div className="h-[80vh] flex justify-center items-center">send message to start conversation </div>}
      {messages.map((item) => {
        return <Message message={item} key={item._id} />;
      })}
    </div>
  );
};

export default messages;

import React from "react";
import { useContext } from "react";
import { ConversationContext } from "../../context/ConversationContext";
import { useSoketHook } from "../../context/SocketContext";

const user = ({ data }) => {
  let { conversation, setConversation } = useContext(ConversationContext);
  let has = data._id === conversation._id;
  console.log(useSoketHook());
  let isOnline = useSoketHook().onlineUsers.includes(data._id);

  console.log(isOnline);
  function change() {
    setConversation(data);
  }

  console.log(data);
  return (
    <div
      className={`flex  items-center gap-3 p-2 ${
        has && "bg-slate-600"
      } hover:bg-slate-600 cursor-pointer`}
      onClick={change}
    >
      <div>
        <div className={isOnline ? "avatar online" : "avatar"}>
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <div>
        <h2>{data.fullname}</h2>
        <p>{data.email}</p>
      </div>
    </div>
  );
};

export default user;

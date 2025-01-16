import React from "react";
import { useContext } from "react";
import { ConversationContext } from "../../../context/ConversationContext";
import { useSoketHook } from "../../../context/SocketContext";
import { CiMenuFries } from "react-icons/ci";

const Chatuser = () => {
  let { fullname, email, _id } = useContext(ConversationContext).conversation;
  let isOnline = useSoketHook().onlineUsers.includes(_id);

  console.log("i am in chatuser", fullname, isOnline);

  return (
    <div className="flex h-[10vh] justify-center items-center gap-3 bg-slate-600 hover:bg-slate-500 p-2">
      {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
        <CiMenuFries />
      </label> */}
      <label htmlFor="my-drawer" className="btn btn-primary drawer-button absolute left-3  sm:hidden">
      <CiMenuFries />
      </label>
      <div className="avatar">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h1 className="text-xl text-white">{fullname}</h1>
        <span>{isOnline ? "online" : "offline"}</span>
      </div>
    </div>
  );
};

export default Chatuser;

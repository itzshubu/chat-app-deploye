import React from "react";

const Message = ({ message }) => {
  let { user } = JSON.parse(localStorage.getItem("ChatApp"));
  //  console.log(user , message)
  let me = message.senderId == user._id;

  const createdAt = new Date(message.createdAt)
  const formattedtime = createdAt.toLocaleTimeString([],{
    hour : "2-digit",
    minute : '2-digit'
  })
  return (
    <div>
      <div className="p-4">
        {me ? (
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-secondary">
              {message.message}
            </div>
            <div className="chat-footer">{formattedtime}</div>
          </div>
        ) : (
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-accent">
              {message.message}
            </div>
            <div className="chat-footer">{formattedtime}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;

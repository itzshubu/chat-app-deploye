import React, { useState } from "react";
import { TbSend2 } from "react-icons/tb";
import useSendMessage from "../../../context/useSendMessage";
import sendsound from "../../../assets/sendsound.wav"

const sendmessage = () => {
  console.log("i am in sendmessage");
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();
  let sendsoundplay = new Audio(sendsound)

  async function submitform(e) {
    e.preventDefault();
    sendsoundplay.play()
    await sendMessages(message);
    setMessage("");
  }

  return (
    <form onSubmit={submitform}>
      <div className="flex gap-2 justify-center items-center p-3 bg-black h-[10vh]">
        <div className="w-[70%]">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input input-bordered input-success  w-full "
          />
        </div>

        <button>
          <TbSend2 className="text-[50px]" />
        </button>
      </div>
    </form>
  );
};

export default sendmessage;

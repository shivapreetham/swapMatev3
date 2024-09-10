import React from "react";
import Left from "../components/ChatNew/Leftpart/Left";
import Right from "../components/ChatNew/Rightpart/Right";

const Chat = () => {
  return (
    <div className="flex">
      <div className="w-1/4 min-h-screen bg-black text-base-content">
        <Left />
      </div>
      <div className="w-3/4 flex flex-col items-center justify-center">
        <Right />
      </div>
    </div>
  );
};

export default Chat;

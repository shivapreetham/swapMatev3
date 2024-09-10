import React from "react";
import useConversation from "../../../zustand/useConnversation.jsx";
import { useSocketContext } from "../../../context/chat/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import { Disclosure } from "@headlessui/react";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <Disclosure>
        <Disclosure.Button
          className="absolute left-5 flex items-center justify-center p-2 text-white text-xl rounded focus:outline-none lg:hidden"
        >
          <CiMenuFries />
        </Disclosure.Button>
      </Disclosure>
      <div className="flex space-x-3 items-center justify-center h-[8vh]">
        <div className="relative w-16 h-16">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 block w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h1 className="text-xl text-white">{selectedConversation.fullname}</h1>
          <span className="text-sm text-gray-400">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;

import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../../context/chat/UseGetMessages.js";
import useGetSocketMessage from "../../../context/chat/UseGetSocketMessage.js";

function Messages() {
  const { messages } = useGetMessage();
  useGetSocketMessage(); // Listening for incoming messages
  console.log(messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;

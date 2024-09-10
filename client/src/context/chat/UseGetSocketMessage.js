import React from "react";
import useConversation from "../../zustand/useConnversation";
import axios from "axios";

const useSendMessage = () => {
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation || !selectedConversation._id) return; // Ensure selectedConversation is valid
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      setMessage([...messages, res.data]); // Update messages state with new message
    } catch (error) {
      console.log("Error in sending messages", error);
    }
  };

  return { sendMessages };
};

export default useSendMessage;

import React, { useEffect } from "react";
import useConversation from "../../zustand/useConnversation";
import axios from "../../configuration";

const useGetMessage = () => {
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          setMessage(res.data);
        } catch (error) {
          console.log("Error in getting messages", error);
        }
      }
    };

    getMessages();
  }, [selectedConversation, setMessage]);

  return { messages };
};

export default useGetMessage;

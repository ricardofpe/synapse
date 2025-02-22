import React from "react";

const ChatMessage = ({ message, type }) => {
  return (
    <div
      className={`flex w-full my-1 ${
        type === "send" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-xl py-2 px-3 max-w-2/3 break-words text-sm sm:text-base ${
          type === "send"
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;

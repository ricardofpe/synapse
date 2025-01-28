import React from "react";

export default function ChatMessage({ message, type }) {
  return (
    <div
      className={`flex w-full ${
        type === "send" ? "justify-start" : "justify-end"
      }`}
    >
      {type === "send" ? (
        <div className="bg-violet-500 p-2 rounded-b-lg rounded-tr-lg text-white">
          {message}
        </div>
      ) : (
        <div className="bg-white p-2 rounded-b-lg rounded-tr-lg text-black">
          {message}
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import ChatMessage from "./components/ChatMessage";
import SynapseLogo from "./components/SynapseLogo";

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    newSocket.on("response", (message) => {
      setIsLoading(false);
      setMessages((prev) => [...prev, { type: "receive", message }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    setIsLoading(true);

    setMessages((prev) => [...prev, { type: "send", message: inputMessage }]);
    socket.emit("message", inputMessage);
    setInputMessage("");
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-purple-900 min-h-screen flex items-center justify-center py-6 px-4">
      <div className="container mx-auto max-w-md shadow-lg rounded-lg overflow-hidden w-full">
        <div className="bg-gray-800 text-white py-3 px-4 flex items-center justify-start gap-2">
          <SynapseLogo size={30} />
          <h2 className="text-lg font-semibold">Synapse Chat</h2>
        </div>

        <div className="p-3 h-[400px] sm:h-[500px] overflow-y-auto flex flex-col">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              type={message.type}
            />
          ))}
          {isLoading && (
            <div className="text-gray-400 text-sm italic self-end">
              Synapse is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-gray-700 p-3">
          <div className="flex rounded-lg shadow-inner">
            <input
              type="text"
              placeholder="Send your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-grow bg-transparent border-0 text-white focus:outline-none px-3 py-2"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-3 rounded-r-lg hover:opacity-80 transition-all duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

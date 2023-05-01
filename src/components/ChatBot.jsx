import React, { useState } from "react";
import axios from "axios";
import ChatBotIcon from "../assets/chatBotIcon.svg";
import ChatBotButtonIcon from "../assets/chatBotButtonIcon.svg";
import ChatBotInnerIcon from "../assets/chatBotInnerIcon.svg";
import ChatBotCrossIcon from "../assets/chatBotCrossIcon.svg";

const ChatBot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello!", sender: "chatbot" },
    { text: "I am a chatbot! How can I help you?", sender: "chatbot" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleUserMessageSubmit = (event) => {
    event.preventDefault();
    if (userMessage.trim() === "") return;
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setUserMessage("");
    setIsTyping(true);
    axios
      .post("https://44.202.139.56/api/v1/queryoverdoc", {
        query: userMessage,
      })
      .then((response) => {
        const { data } = response;
        setMessages([...messages, { sender: "chatbot", text: data }]);
      })
      .catch((error) => console.error(error));
    setIsTyping(false);
  };

  const renderChatbot = () => {
    return (
      <div className="fixed bottom-16 right-2 w-96 h-[450px] bg-white border border-gray-400 rounded-tl-xl rounded-br-xl shadow-xl">
        <div className="flex items-center justify-between h-14 px-4 py-2 bg-black rounded-t-xl">
          <span className="flex flex-row gap-4 items-center">
            <img src={ChatBotInnerIcon} alt="" />
            <p className="text-sm font-medium text-white">ChatBot</p>
          </span>
          <button onClick={toggleChatbot}>
            <img src={ChatBotCrossIcon} alt="" />
          </button>
        </div>
        <div className="flex flex-col justify-between bg-white w-full h-full rounded-b-lg px-4 py-2">
          <div className="overflow-y-scroll">
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex justify-${
                    message.sender === "user" ? "end" : "start"
                  }`}
                >
                  <div
                    className={`bg-${
                      message.sender === "user" ? "black" : "gray-300"
                    } rounded-lg py-1 px-3 max-w-xs break-words ${
                      message.sender === "user" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {message.text}
                    {message.sender === "chatbot" && isTyping && (
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-gray-600 rounded-full mr-1 animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full mr-1 animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full mr-1 animate-bounce"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleUserMessageSubmit} className="mt-2 w-full">
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Type your message"
                value={userMessage}
                onChange={handleUserMessageChange}
                className="w-full rounded-full py-2 px-4 bg-gray-100 text-gray-800 focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="ml-2 rounded-full bg-black h-10 w-12 flex justify-center items-center"
              >
                <img src={ChatBotButtonIcon} alt="" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-black text-white flex items-center justify-center"
        onClick={toggleChatbot}
      >
        <img src={ChatBotIcon} alt="" />
      </button>

      {showChatbot && renderChatbot()}
    </div>
  );
};

export default ChatBot;

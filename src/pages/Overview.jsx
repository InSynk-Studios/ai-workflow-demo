import React, { useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { LineChart, Stacked } from "../components";
import { dropdownData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import Area from "./Charts/Area";
import { Launcher } from "popup-chat-react";
import ChatBotInnerIcon from "../assets/chatBotIcon.svg";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Overview = () => {
  const { currentColor, currentMode } = useStateContext();
  const [state, setState] = useState({
    messageList: [
      {
        author: "them",
        type: "text",
        data: {
          text: "Hello!",
        },
      },
      {
        author: "them",
        type: "text",
        data: {
          text: "How can i help you?",
        },
      },
    ],
    newMessagesCount: 2,
    isOpen: false,
    fileUpload: false,
  });

  function onMessageWasSent(message) {
    setState((state) => ({
      ...state,
      messageList: [...state.messageList, message],
    }));
  }

  function sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = state.isOpen
        ? state.newMessagesCount
        : state.newMessagesCount + 1;

      setState((state) => ({
        ...state,
        newMessagesCount: newMessagesCount,
        messageList: [
          ...state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      }));
    }
  }

  function onClick() {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0,
    }));
  }

  return (
    <>
      <div className="mt-10 ml-6">
        <DropDown currentMode={currentMode} />
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-2 gap-5 mx-5 items-center justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl h-full w-96 md:w-full">
            <div className="flex justify-between items-center gap-2 mb-10">
              <p className="text-xl font-semibold">Overview</p>
              <DropDown currentMode={currentMode} />
            </div>
            <div className="md:w-full overflow-auto">
              <LineChart />
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-full">
            <div className="flex justify-between items-center gap-2 mb-10">
              <p className="text-xl font-semibold">Overview</p>
              <DropDown currentMode={currentMode} />
            </div>
            <div className="md:w-full overflow-auto">
              <Stacked />
            </div>
          </div>
        </div>
        <Launcher
          agentProfile={{
            teamName: "Chat bot",
            imageUrl: ChatBotInnerIcon,
          }}
          onMessageWasSent={onMessageWasSent}
          messageList={state.messageList}
          newMessagesCount={state.newMessagesCount}
          onClick={onClick}
          isOpen={state.isOpen}
          showEmoji={false}
          fileUpload={state.fileUpload}
          placeholder="Let's have a chat..."
        />
      </div>
    </>
  );
};

export default Overview;

import React, { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { LineChart, Stacked } from "../components";
import { dropdownData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import ChatBot from "../components/ChatBot";
import axios from "axios";
import ApiButton from "../components/ApiButton";

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
  const [pastCampaignData, setData] = useState([]);
  const { currentMode } = useStateContext();

  useEffect(() => {
    axios
      .get("http://44.202.139.56/api/v1/pastcampaigns")
      .then((response) => setData(response?.data))
      .catch((error) => console.log(error));
  }, []);

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
        <div className="mt-20 mx-5">
          <h1 className="text-3xl font-bold my-4">Past Campaigns</h1>
          {pastCampaignData?.data?.map((item) => (
            <div key={item.title} className="border bg-white rounded-2xl my-4">
              <div className="flex items-center h-14 bg-cyan-500 text-white rounded-t-2xl w-full">
                <h2 className="text-xl font-bold p-4">{item.title}</h2>
              </div>
              <div className="p-4">
                <p className="my-2">{item.content}</p>
                <p className="my-2 text-sm flex justify-end">
                  Total views - {item.total_views}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ApiButton />
        <ChatBot />
      </div>
    </>
  );
};

export default Overview;

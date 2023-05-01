import { useState } from "react";
import axios from "axios";

function ApiButton() {
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    try {
      const { data } = await axios.post(
        "https://44.202.139.56/api/v1/queryoverdoc",
        {
          query:
            "Summarize the MongoDB Quarterly results and then give a Campaign idea based on the summary and then give me 3 sample twitter campaign content(each content should have atleast 3 lines worth of text) also",
        }
      );
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4 ml-5">Get more campaign</h1>
      <button
        className="bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        New Campaign
      </button>
      {response && (
        <div className="border rounded p-4 my-4">
          <p className="my-2">{response.data}</p>
        </div>
      )}
    </div>
  );
}

export default ApiButton;

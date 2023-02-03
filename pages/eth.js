import * as Web3 from "web3";
import React, { useState } from "react";
import NetworkSelectorEth from "../components/NetworkSelector-eth";
import BannerToast from "../components/NotificationBanner";
const Eth = () => {
  const [userInput, setUserInput] = useState("");
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [state, newBanner] = BannerToast();
  const [selectedNetwork, setSelectedNetwork] = useState("mainnet");

  const callGenerateEndpoint = async (e) => {
    setApiOutput("");
    setIsGenerating(true);
    e.preventDefault();
    console.log("Running Analysis");
    try {
      let addresponse;
      let web3;
      if (selectedNetwork === "mainnet") {
        addresponse = await fetch(
          `https://api.etherscan.io/api?module=contract&action=getabi&address=${userInput}&apikey=38CI6IW8FCM9X24V96N1YRBGPTDS57YFVC`
        );
        web3 = new Web3(
          "https://mainnet.infura.io/v3/b31b87bd4fb24a51bf5064789a7aed6f"
        );
      } else if (selectedNetwork === "goerli") {
        addresponse = await fetch(
          `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${userInput}&apikey=38CI6IW8FCM9X24V96N1YRBGPTDS57YFVC`
        );
        web3 = new Web3(
          "https://goerli.infura.io/v3/b31b87bd4fb24a51bf5064789a7aed6f"
        );
      } else if (selectedNetwork === "sepolia") {
        addresponse = await fetch(
          `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${userInput}&apikey=38CI6IW8FCM9X24V96N1YRBGPTDS57YFVC`
        );
        web3 = new Web3(
          "https://sepolia.infura.io/v3/b31b87bd4fb24a51bf5064789a7aed6f"
        );
      }
      const adddata = await addresponse.json();

      const abi = JSON.parse(adddata.result);
      const contract = new web3.eth.Contract(abi, userInput);
      const entrypoints = Object.keys(contract.methods);
      console.log("Address Parsed:", entrypoints);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: entrypoints }),
      });

      const data = await response.json();
      const { output } = data;
      console.log("finished");
      setApiOutput(`${output.text}`);
      setIsGenerating(false);
    } catch (error) {
      console.log(error);
      newBanner({
        message: "Please check the address and network again.",
        status: "error",
      });
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="root-eth font-space">
        <div className="flex w-full p-4">
          <div className="flex-1 text-gray-600 hover:text-gray-500">Eth</div>
          <div className="flex-1 text-right ">
            <NetworkSelectorEth
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
            />
          </div>
        </div>
        {!apiOutput && (
          <div className="text-center mt-56 lg:mt-72 md:mt-72 xl:mt-72 animate-in fade-in duration-500">
            <div>
              <div className="text-6xl font-extrabold text-gray-200">
                <h1>dekode.</h1>
              </div>
              <div className="text-xl text-gray-400">
                <h2>decode any smart contract to understand better</h2>
              </div>
            </div>
            <div className="flex justify-center mt-4 flex-col">
              <form onSubmit={callGenerateEndpoint}>
                <div className="flex justify-center flex-row">
                  <input
                    type="text"
                    value={userInput}
                    onChange={onUserChangedText}
                    placeholder="enter the contract address"
                    className="p-3 mr-1 border-solid rounded-[10px] hover:border-gray-600 focus:border-gray-600 outline-none text-gray-200 border-gray-800 border-2 bg-gray-900 items-start leading-1  w-[250px] lg:w-[500px] md:w-[500px] xl:w-[500px]"
                  />
                  <button
                    type="submit"
                    className=" bg-gradient-to-r ml-1 from-sky-800 to-sky-700 hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-600 rounded-[10px] flex items-center border-solid border-2 border-sky-800 px-2 py-1 font-light text-gray-200"
                  >
                    {isGenerating ? (
                      <span className="loader"></span>
                    ) : (
                      <p>Generate</p>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {apiOutput && (
          <div>
            <div className="text-center mt-16 lg:mt-28 md:mt-28 xl:mt-28 animate-in fade-in duration-500">
              <div className="text-center">
                <div className="text-6xl font-extrabold text-gray-200">
                  <h1>
                    dekode<a>.</a>
                  </h1>
                </div>
                <div className="text-xl text-gray-400">
                  <h2>decode any smart contract to understand better</h2>
                </div>
              </div>
              <div className="flex justify-center mt-4 flex-col">
                <form onSubmit={callGenerateEndpoint}>
                  <div className="flex justify-center flex-row">
                    <input
                      type="text"
                      value={userInput}
                      onChange={onUserChangedText}
                      placeholder="enter the contract address"
                      className="p-3 mr-1 border-solid rounded-[10px] hover:border-gray-600 focus:border-gray-600 outline-none text-gray-200 border-gray-800 border-2 bg-gray-900 items-start leading-1  w-[250px] lg:w-[500px] md:w-[500px] xl:w-[500px]"
                    />
                    <button
                      type="submit"
                      className=" bg-gradient-to-r ml-1 from-sky-800 to-sky-700 hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-600 rounded-[10px] flex items-center border-solid border-2 border-sky-800 px-2 py-1 font-light text-gray-200"
                    >
                      {isGenerating ? (
                        <span className="loader"></span>
                      ) : (
                        <p>Generate</p>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {apiOutput && (
          <div className="max-w-6xl">
            <div className="ml-6 mr-6 lg:ml-12 lg:mr-12 md:ml-12 md:mr-12 xl:ml-12 xl:mr-12 mb-6 ring-1 rounded-[10px] pl-4 pr-4 pb-4 mt-6 ring-sky-800 hover:ring-sky-600">
              <p className="text-gray-200 whitespace-pre-line text-left">
                {apiOutput}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Eth;

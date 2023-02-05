import * as Web3 from "web3";
import React, { useState } from "react";
import NetworkSelectorMatic from "../components/NetworkSelector-matic";
import BannerToast from "../components/NotificationBanner";
import maticLogo from '../public/matic.svg';
import Image from "next/image";

const Home = () => {
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
          `https://api.polygonscan.com//api?module=contract&action=getabi&address=${userInput}&apikey=T12U8T3KDGDZPGRWBCZEVENPU64KAQUTQI`
        );
        web3 = new Web3("https://polygon.network");
      } else if (selectedNetwork === "mumbai") {
        addresponse = await fetch(
          `https://api-testnet.polygonscan.com//api?module=contract&action=getabi&address=${userInput}&apikey=T12U8T3KDGDZPGRWBCZEVENPU64KAQUTQI`
        );
        web3 = new Web3("https://mumbai.polygon.network");
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
      <div className="root-matic font-space">
        <div className="header-wrapper flex w-full p-4">
          {/* <div className="flex-1 text-gray-600 hover:text-gray-500">Matic</div> */}
          <div className="cursor-pointer">
            <Image alt="tz" src={maticLogo} height={30} width={30} />
          </div>
          <div className="flex-1 text-right ">
            <NetworkSelectorMatic
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
            />
          </div>
        </div>
        {!apiOutput && (
          <div className="text-center mt-56 ">
            <div>
              <div className="text-6xl font-extrabold text-gray-200">
                <h1>KeyBrief</h1>
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
                    placeholder="Enter contract address here"
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
                    KeyBrief<a></a>
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
                      placeholder="Enter contract address here"
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

export default Home;

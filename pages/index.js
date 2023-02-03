import React, { useState } from "react";
import NetworkSelector from "../components/NetworkSelector";
import BannerToast from "../components/NotificationBanner";
import tzlogo from "../public/tezos.svg";
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

  const callGhostnetGenerateEndpoint = async (e) => {
    setApiOutput("");
    setIsGenerating(true);
    e.preventDefault();
    console.log("Running Analysis");
    try {
      const addresponse = await fetch(
        `https://api.ghostnet.tzkt.io/v1/contracts/${userInput}/entrypoints`
      );
      const adddata = await addresponse.json();
      if (!adddata.length) {
        setIsGenerating(false);
        newBanner({
          message: "Check the address and network again",
          status: "error",
        });
        console.log("Errorrrrr check the network again");
        return;
      }
      const fieldNames = adddata.map((entrypoint) => entrypoint.name);
      console.log("Address Parsed:", fieldNames);

      const response = await fetch("/api/index", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: fieldNames }),
      });

      if (!response.ok) {
        throw new Error("Fetch Failed");
      }

      const data = await response.json();
      const { output } = data;
      console.log("finished");
      setApiOutput(`${output.text}`);
      setIsGenerating(false);
    } catch (error) {
      console.log(error);
      newBanner({
        message: "Something went wrong, please try again.",
        status: "error",
      });
      setIsGenerating(false);
    }
  };

  const callGenerateEndpoint = async (e) => {
    setApiOutput("");
    setIsGenerating(true);
    e.preventDefault();
    console.log("Running Analysis");
    try {
      const addresponse = await fetch(
        `https://api.tzkt.io/v1/contracts/${userInput}/entrypoints`
      );
      const adddata = await addresponse.json();
      if (!adddata.length) {
        setIsGenerating(false);
        newBanner({
          message: "Check the address and network again",
          status: "error",
        });
        console.log("Errorrrrr check the network again");
        return;
      }
      const fieldNames = adddata.map((entrypoint) => entrypoint.name);
      console.log("Address Parsed:", fieldNames);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: fieldNames }),
      });

      if (!response.ok) {
        throw new Error("Fetch Failed");
      }

      const data = await response.json();
      const { output } = data;
      console.log("finished");
      setApiOutput(`${output.text}`);
      setIsGenerating(false);
    } catch (error) {
      console.log(error);
      newBanner({
        message: "Something went wrong, please try again.",
        status: "error",
      });
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="root font-space">
        <div className="flex w-full p-4">
          <div>
            <div className="grow">
              <Image alt="tz" src={tzlogo} height={20} width={20} />
            </div>
          </div>
          <div className="flex-1 text-right ">
            <NetworkSelector
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
              <form
                onSubmit={(e) =>
                  selectedNetwork === "mainnet"
                    ? callGenerateEndpoint(e)
                    : callGhostnetGenerateEndpoint(e)
                }
              >
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
                    className=" bg-gradient-to-r ml-1 from-blue-800 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 rounded-[10px] flex items-center border-solid border-2 border-blue-800 px-2 py-1 font-light text-gray-200"
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
                <form
                  onSubmit={(e) =>
                    selectedNetwork === "mainnet"
                      ? callGenerateEndpoint(e)
                      : callGhostnetGenerateEndpoint(e)
                  }
                >
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
                      className=" bg-gradient-to-r ml-1 from-blue-800 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 rounded-[10px] flex items-center border-solid border-2 border-blue-800 px-2 py-1 font-light text-gray-200"
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
            <div className="ml-6 mr-6 lg:ml-12 lg:mr-12 md:ml-12 md:mr-12 xl:ml-12 xl:mr-12 mb-6 ring-1 rounded-[10px] pl-4 pr-4 pb-4 mt-6 ring-blue-800 hover:ring-blue-600">
              <p className="text-gray-200 whitespace-pre-line text-left">
                {apiOutput}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* <footer className="bg-dotted">
        <div className="mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              <Link href="/eth" className="underline">
                Eth
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link href="/matic" className="underline">
                Matic
              </Link>
            </p>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default Home;

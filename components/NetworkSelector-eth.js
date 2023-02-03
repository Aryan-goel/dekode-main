import React, { useState, useEffect, useRef } from "react";

const NetworkSelectorEth = ({ selectedNetwork, setSelectedNetwork }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-600 px-2 py-2 bg-gray-900 text-md leading-5 font-medium hover:text-gray-400 text-gray-200 focus:outline-none focus:shadow-outline-blue active:bg-gray-800 active:text-gray-800 transition duration-150 ease-in-out"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-row ml-2 mr-2">
              <p>{selectedNetwork}</p>
            </div>
          </button>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg animate-in fade-in animate-out fade-out duration-500 ">
          <div className="rounded-md bg-gray-900 ">
            <div className="py-0 rounded-md">
              <button
                type="button"
                className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-200 hover:text-gray-300 hover:rounded-tl-md rounded-tl-md rounded-tr-md hover:rounded-tr-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                onClick={() =>
                  setSelectedNetwork("mainnet") || setIsOpen(false)
                }
              >
                Ethereum mainnet
              </button>
              <button
                type="button"
                className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-200 hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                onClick={() => setSelectedNetwork("goerli") || setIsOpen(false)}
              >
                Goerli testnet
              </button>

              <button
                type="button"
                className="block w-full text-left px-4 py-2 text-sm leading-5 hover:rounded-bl-md hover:rounded-br-md rounded-br-md rounded-bl-md text-gray-200 hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                onClick={() => setSelectedNetwork("sepolia") || setIsOpen(false)}
              >
                Sepolia testnet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSelectorEth;

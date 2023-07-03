import React from "react";

// import { useSession } from "next-auth/client";

interface PopupProps {
  show: boolean;
  setShowPopup: (show: boolean) => void;
}

function Popup({ show, setShowPopup }: PopupProps) {
  const handleCloseClick = () => {
    setShowPopup(false);
  };

  return show ? (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-6 w-full max-w-3xl ring-1 ring-inset ring-gray-900/5 m-4">
        <h1 className="text-4xl font-bold mt-6 mb-10 text-center">
          Upgrade to get unlimited access 🚀
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="mx-auto max-w-xs p-6 ring-1 ring-inset ring-gray-900/5 rounded-2xl">
            <p className="text-base font-semibold text-gray-600">
              {" "}
              🥷 Posting Ninja
            </p>
            <p className="text-gray-600 text-sm">
              12 months on unlimited post generations✨
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                $39.99
              </span>
              <span className="line-through text-red-500 text-sm">$59.99</span>
            </p>
            <button
              className="mt-10 block w-full rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-300"
              onClick={() =>
                window.open(
                  "https://buy.stripe.com/8wM16m0o086qgco8wY",
                  "_blank"
                )
              }
            >
              Subscribe
            </button>
          </div>
          <div className="mx-auto max-w-xs p-6 ring-1 ring-inset ring-gray-900/5 rounded-2xl">
            <p className="text-base font-semibold text-gray-600">
              🦸‍♀️Posting Hero
            </p>
            <p className="text-gray-600 text-sm">
              3 months of unlimited post generations✨
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                $9.99
              </span>
              <span className="line-through text-red-500 text-sm">$15.99</span>
              {/* 12/Months */}
            </p>
            <button
              className="mt-10 block w-full rounded-md bg-blue-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              onClick={() =>
                window.open(
                  "https://buy.stripe.com/28o8yOeeQ9aud0c4gJ",
                  "_blank"
                )
              }
            >
              Subscribe
            </button>
          </div>
        </div>
        <p className="text-sm mt-6 text-center text-gray-500">
          And you will never see this popup again 😜
        </p>
        <button
          onClick={handleCloseClick}
          className=" mt-6 block w-full rounded-md bg-black text-white px-4 py-2 text-center text-sm font-semibold"
        >
          Continue without upgrade
        </button>
      </div>
    </div>
  ) : null;
}

export default Popup;

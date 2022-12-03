import React from "react";
import car from "../assets/Icons/car.png";

const Car = () => (
  <div className="w-full">
    <img
      src={car}
      alt="car"
      className="object-contain rounded-lg hover:scale-x-105 hover:scale-y-105"
    />
    <div className="flex w-full p-4 justify-around ">
      <button
        type="button"
        className=" px-8 py-2.5 bg-red-800 h-10 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:scale-x-105 hover:scale-y-105 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800  active:shadow-lg transition duration-150 ease-in-out"
      >
        Recordings
      </button>
      <button
        type="button"
        className=" px-8 py-2.5 bg-blue-800 h-10 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:scale-x-105 hover:scale-y-105 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Streaming
      </button>
    </div>
  </div>
);

export default Car;

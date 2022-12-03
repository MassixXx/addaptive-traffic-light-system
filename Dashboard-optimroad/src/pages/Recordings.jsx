import React from "react";
import Car from "../components/Car";

const Recordings = () => {
  const arrayElement = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 10, 11, 12];

  return (
    <>
      <div className="flex justify-between m-8 mt-20 ">
        <input
          type="text"
          placeholder="Adress/Control Point ID"
          className="pl-8 p-2 w-1/3 bg-slate-100"
        />
        <button
          type="button"
          className=" px-6 py-2.5 bg-green-400 text-white font-medium text-lg leading-tight uppercase rounded shadow-lg hover:scale-x-105 hover:scale-y-105 hover:shadow-lg focus:bg-green-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-400  active:shadow-lg transition duration-150 ease-in-out"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 m-8">
        {arrayElement.map(() => (
          <Car />
        ))}
      </div>
    </>
  );
};

export default Recordings;

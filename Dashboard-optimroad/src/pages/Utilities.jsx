import React from "react";

import icon from "../assets/Icons/icon.png";
import icon1 from "../assets/Icons/icon1.png";
import icon2 from "../assets/Icons/icon2.png";
import icon3 from "../assets/Icons/icon3.png";

const Utilities = () => {
  const homeElements = [
    {description: "Road Traffic Status", image: icon},
    {description: "Streaming and Viewing Cameras", image: icon1},
    {description: "Exception date", image: icon2},
    {description: "Code Violations", image: icon3},
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-12 w-2/3 mx-auto mt-20 lg:grid-cols-2">
        {homeElements.map((homeElement) => (
          <div className="border-2 border-slate-200 rounded-lg p-10 ">
            <img
              src={homeElement.image}
              alt="HomeElement"
              className="object-contain mx-auto"
            />
            <h3 className="text-center text-lg font-bold mt-6 text-slate-700 hover:scale-x-103">
              {homeElement.description}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Utilities;

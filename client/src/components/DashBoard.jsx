import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const DashBoard = () => {
  

  return (
    <div className=" bg-[url('../src/assets/signInBg.jpeg')] h-screen lg:gap-20 flex justify-center items-center">
      <img src="../src/assets/ai-ills.svg" alt="" className="lg:block hidden" />
      <div className="bg-[#04091E] mx-9 lg:mx-0 py-5 px-3 text-center lg:px-9 text-white w-[35rem] rounded-2xl border border-white relative">
        {/* <RxCross1 className="text-[25px] text-end absolute right-5 top-4" /> */}

        <div>
          <h1 className="text-[32px] font-[700] leading-[28px] py-12">
            Twitter Automation Dashboard
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8 lg:mt-0 mt-5">
            <label
              htmlFor="schedule"
              className="text-[28px] font-[400] leading-[16px] px-4"
            >
              Schedule :
            </label>
            <select
              className="px-16 bg-[#0E1327] border border-white py-3 text-[20px] rounded-2xl"
              id="schedule"
              
            >
              <option value="">Select...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className="mb-12 flex flex-col lg:mt-0 mt-5">
            <label
              htmlFor="catagory"
              className="text-[28px] font-[400] leading-[16px] px-4 py-10"
            >
              News Catagory :
            </label>
            <select
              className="px-16 bg-[#0E1327] border border-white py-3 text-[20px] rounded-2xl"
              id="catagory"
             
            >
              <option value="">Select...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <button className="aai-gradient-outline-btn">Start Automation</button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
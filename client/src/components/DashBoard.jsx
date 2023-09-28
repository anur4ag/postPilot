import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from "../../Firebase/Firebase";
import axios from "axios";
const DashBoard = () => {
  const [type, setType]=useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const methodParam = queryParams.get('method');
    const providerName=methodParam.charAt(0).toUpperCase() + methodParam.slice(1)
   const navigate=useNavigate();

async function start(){
   try{
    console.log(type);
    if(providerName=='Twitter'){
        const response=await axios.post("http://localhost:3000/postGenerator/twitter",{
            type: type,
            email: auth.currentUser.email
        })
        console.log("reached");
        navigate("/projectsection")
    }else{
        alert("linkedin spotted");
    }
   
   }catch(e){
    console.log(e);
   }
    
}

  return (
    <div className=" bg-[url('../src/assets/signInBg.jpeg')] h-screen lg:gap-20 flex justify-center items-center">
      <img src="../src/assets/ai-ills.svg" alt="" className="lg:block hidden" />
      <div className="bg-[#04091E] mx-9 lg:mx-0 py-5 px-3 text-center lg:px-9 text-white w-[35rem] rounded-2xl border border-white relative">
        {/* <RxCross1 className="text-[25px] text-end absolute right-5 top-4" /> */}

        <div>
          <h1 className="text-[32px] font-[700] leading-[28px] py-12">
            {providerName} Automation Dashboard
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
              <option value="option1">Daily</option>
              <option value="option2">Weekly</option>
              {/* <option value="option3">Option 3</option> */}
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
             onChange={(e)=>{
                setType(e.target.value);
             }}
            >
              <option value="">Select...</option>
              <option >Startups</option>
              <option >Technology</option>
              <option >Funding</option>
            </select>
          </div>
          <button className="aai-gradient-outline-btn" onClick={start}>Start Automation</button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
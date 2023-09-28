import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const SelectApp = ({ setProject }) => {
  const handleLinkedinClick = () => {
    console.log("linkedin")
    const res = axios.get("http://localhost:3000/linkedin/authorize")
      .then((res) => { console.log(res.data) })
      .catch((err) => { console.log(err) })


  }
  const handleTwitterClick = () => {
    console.log("twitter")
    const res = axios.get("http://localhost:3000/auth/twitter")
      .then((res) => { console.log(res.data) })
      .catch((err) => { console.log(err) })
  }
  return (
    <div className="flex items-center text-center text-white absolute top-32 left-[35%] z-10">
      <div className="bg-[#04091E] text-center px-20 w-[30rem] border border-white rounded-3xl relative text-white">
        <RxCross1 className="text-[25px] text-end absolute right-5 top-4 cursor-pointer" onClick={() => {
          setProject(false);

        }} />

        <h1 className="text-[55px] font-[700] leading-[52px] py-20">
          Select App
        </h1>
        <div className="py-6 border border-gray-500 rounded-3xl">
          <button onClick={handleLinkedinClick} className="fa-brands fa-linkedin text-blue-600 text-[50px]"></button>
        </div>
        <div className="py-6 border border-gray-500 rounded-3xl my-10">
          <button onClick={handleTwitterClick} className="fa-brands fa-twitter text-blue-600 text-[50px]"></button>
        </div>
        {/*   <div className="py-6 border border-gray-500 rounded-3xl mb-20">
          <i className="fa-brands fa-youtube text-red-600 text-[50px]"></i>
        </div> */}
      </div>
    </div>
  );
};

export default SelectApp;

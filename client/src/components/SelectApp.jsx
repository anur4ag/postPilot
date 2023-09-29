import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../../Firebase/Firebase";

const SelectApp = ({ setProject }) => {
  const uid = auth.currentUser.uid;
  const handleLinkedinClick = () => {
    console.log("linkedin")
    // const res = axios.get("http://localhost:3000/linkedin/authorize")
    //   .then((res) => { console.log(res.data) })
    //   .catch((err) => { console.log(err) })
    window.location.href = `http://localhost:3000/linkedin/authorize?uid=${uid}`;


  }
  const handleTwitterClick = () => {
    console.log("twitter")
    // const res = axios.get("http://localhost:3000/auth/twitter")
    //   .then((res) => { console.log(res.data) })
    //   .catch((err) => { console.log(err) })
    window.location.href = `http://localhost:3000/auth/twitter?uid=${uid}`;
  }

  return (
    <div className="flex  text-center text-white absolute top-[26%] lg:top-[25%] left-[10%] lg:left-[50%] z-10">
      <div className="bg-[#04091E] flex flex-col justify-center items-center lg:px-20 lg:w-[30rem] border border-white rounded-3xl relative text-white">
        <RxCross1
          className="text-[25px] text-end absolute right-5 top-4 cursor-pointer"
          onClick={() => {
            setProject(false);
          }}
        />

        <h1 className="text-[32px] lg:mx-0 mx-10 lg:text-[55px] font-[700] leading-[52px] pb-10 pt-20 lg:px-0 px-6">
          Select App
        </h1>
        <button onClick={handleLinkedinClick}>
          <div className="py-2 w-[50%] lg:w-full lg:py-6 border border-gray-500 rounded-xl lg:rounded-3xl">
            <i className="fa-brands fa-linkedin text-blue-600 text-[22px] lg:text-[50px]"></i>
          </div>
        </button>
        <div className="py-3 w-[50%] lg:w-full lg:py-6 border border-gray-500 rounded-xl lg:rounded-3xl my-10">
          <button onClick={handleTwitterClick}>
            <i className="fa-brands fa-twitter text-blue-600 trxt-[22px] lg:text-[50px]"></i>
          </button>
        </div>
        {/*   <div className="py-6 border border-gray-500 rounded-3xl mb-20">
          <i className="fa-brands fa-youtube text-red-600 text-[50px]"></i>
        </div> */}
      </div>
    </div >
  );


};

export default SelectApp;

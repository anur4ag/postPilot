import SignUp from "./Signup";
import Login from "./Login";
import SelectApp from "./SelectApp";
import { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import { selector, useRecoilValue, useSetRecoilState } from "recoil";
import { getLogin, getSignUp } from "../../Store/Getters";
import { checkState } from "../../Store/Variables";
const Hero = () => {
 
  const el = useRef(null);

const isSignUpOpen=useRecoilValue(getSignUp);
const isLoginOpen=useRecoilValue(getLogin);

const setLogin=useSetRecoilState(checkState);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Technical Writing", "Outerbase"], 
      startDelay: 600,
      typeSpeed: 70,
      // backSpeed: 70,
      backDelay: 3000,
      fadeOut: true,
      loop: true,
      showCursor: false,
      smartBackspace: true
     
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div
   className="bg-[url('../src/assets/hero-bg-1.jpeg')]  pb-10 lg:mt-[-107px] pt-10 lg:pt-0 overflow-x-hidden"
      id="cta_form-03-690461">
  

      <div className="flex lg:flex-row flex-col items-center lg:gap-14 lg:justify-end lg:pt-44" >
        <div className="text-white lg:w-[40%] px-4 lg:px-0" >
          <h1 className="text-[36px] font-[700] lg:text-[72px] leading-[54px] lg:leading-[93.6px]">
            Hight-Quality Way to Write your{" "}
          </h1>
          <h1
            ref={el}
            className="lg:text-[72px] text-[36px] font-[700] leading-[54px] lg:leading-[93.6px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          ></h1>

          <p className="font-[500] text-[20px] leading-[30px] py-12">
            AI Copywriting is revolutionizing the way content is created. AI can
            create content for blogs, articles, websites, social media and more.
          </p>
          <div className="">
            <button className="aai-gradient-outline-btn w-[90%] lg:w-[180px] pb-15" onClick={()=>{
              setLogin({
                isLoginOpen: false,
                isSignUpOpen: true
              })
            }}>
              Get Started
            </button>
          </div>
        </div>
        <div className="">
          <img src="../src/assets/dashboard-img.png" alt="" />
        </div>
      </div>
      
      {!isLoginOpen && isSignUpOpen ? (
        <SignUp />
      ) : null}
       {isLoginOpen && !isSignUpOpen ? (
        <Login />
      ) : null}
    </div>
  );
};

export default Hero;

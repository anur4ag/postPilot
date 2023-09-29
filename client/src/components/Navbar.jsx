import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkState, userProfileDetails } from "../../Store/Variables";
import { userName } from "../../Store/Getters";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import ManageProfile from "./ManageProfile";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

const Navbar = () => {
  const setLogin=useSetRecoilState(checkState);
  const getUserName=useRecoilValue(userName);
  const setUserProfile=useSetRecoilState(userProfileDetails);
const[isToggleOn, setToggle]=useState(false);
const[mobileNav, setMobileNav]=useState(false);
  const navigate=useNavigate();
// const link='https://wwhttps://repository-images.githubusercontent.com/317553358/1bff1d80-33ea-11eb-92c9-261d90080973w.google.com/url?sa=i&url=https%3A%2F%2Fwww.adobe.com%2Fcreativecloud%2Fphotography%2Fdiscover%2Fstock-photography.html&psig=AOvVaw1jkU08uDmk4EHKvMTWMXsA&ust=1696005118043000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJj7u8fdzYEDFQAAAAAdAAAAABAE'

// console.log(link);
 
return (
  <>
    <div className="bg-[#080E26] sticky top-0 z-20 px-4">
      <div className="text-white lg:flex lg:justify-between lg:items-center lg:w-[65%] py-4 lg:mx-auto">
        <div className="flex justify-between items-center overflow-hidden">
          <Link to="/">
            <img
              src="../src/assets/PostPilot.png"
              alt=""
              className="h-[76px] w-[75px] lg:h-[75px] lg:w-[85px] cursor-pointer"
            />
          </Link>
          {mobileNav? (
          <i className="fa-solid fa-xmark lg:hidden visible text-[24px]" onClick={()=>{
            setMobileNav(false);
          }}></i>

          ) : (
          <i className="fa-solid fa-bars lg:hidden visible text-[24px]"  onClick={()=>{
            setMobileNav(true);
          }}></i>

          )}
        </div>
        <div className="lg:flex gap-6 px-9 text-[16px] font-[500] lg:visible hidden">
          <Link to="/">Home</Link>
          <p className=" cursor-pointer">About Us</p>
          <p
            className=" cursor-pointer"
            onClick={() => {
              const navbar = document.getElementById("demo_section"); // Assuming 'navbar' is the id of your navbar element
              const navbarPosition = navbar.offsetTop;

              // Scroll to the navbar position
              window.scrollTo({
                top: navbarPosition,
                behavior: "smooth", // Smooth scrolling animation
              });
            }}
          >
            Demo
          </p>
          {/* <p>Pages</p> */}
          <Link to="/pricing">Pricing</Link>
          <Link to="/contactus">Contact</Link>
        </div>
        <div className="lg:flex flex-row gap-5 lg:visible hidden">
          {getUserName ? (
                <div className="lg:flex lg:justify-center lg:items-center lg:visible hidden cursor-pointer">
                <div className="bg-[orange] w-10 h-10 rounded-full" onClick={()=>{
                  setToggle(true)
                }}>
                  <img
                    src="../src/assets/profile.png"
                    className=" rounded-full"
                    alt=""
                  />
                </div>
              </div> 
          ) : (
            <>
              {" "}
              <button
                className="text-[20px] font-[300] underline underline-offset-8"
                onClick={() => {
                  setLogin({
                    isSignUpOpen: false,
                    isLoginOpen: true,
                  });
                }}
              >
                Login
              </button>
           
              <button
                className="aai-gradient-outline-btn"
                onClick={() => {
                  setLogin({
                    isLoginOpen: false,
                    isSignUpOpen: true,
                  });
                }}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
     {isToggleOn? (<Toogle setToggle={setToggle} />): (null)}
    </div>
    {mobileNav? (
     <MobileNav />

    ): (null)}
  </> 
);




  // return (
  //   <div className="bg-[#080E26] sticky top-0 z-20 px-4 overflow-x-hidden relative">
  //     {/* <ManageProfile /> */}
  //     <div className="text-white lg:flex lg:justify-between lg:items-center lg:w-[65%] py-4 lg:mx-auto">
  //       <div className="flex justify-between items-center overflow-hidden">
  //         <img
  //           src="../src/assets/PostPilot.png"
  //           alt=""
  //           className="h-[76px] w-[75px] lg:h-[75px] lg:w-[75px]"
  //         />
  //         <i className="fa-solid fa-bars lg:hidden visible text-[16px]"></i>
  //       </div>
  //       <div className="lg:flex gap-6 px-9 text-[16px] font-[500] lg:visible hidden">
  //         <Link to="/">Home</Link>
  //         <p>About Us</p>
  //         <p onClick={()=>{
  //           navigate("/");
  //           const navbar = document.getElementById('demo_section'); // Assuming 'navbar' is the id of your navbar element
  //           const navbarPosition = navbar.offsetTop;
        
  //           // Scroll to the navbar position
  //           window.scrollTo({
  //             top: navbarPosition,
  //             behavior: 'smooth', // Smooth scrolling animation
  //           });
          
  //         }}>Demo</p>
  //         {/* <p>Pages</p> */}
  //         <Link to="/pricing">Pricing</Link>
  //         <Link to="/contactus">Contact</Link>
  //       </div>
  //       <div className="lg:flex flex-row gap-5 lg:visible hidden">
  //        {getUserName? (
  //         <div className="lg:flex lg:justify-center lg:items-center lg:visible hidden cursor-pointer" onClick={()=>{
  //           setUserProfile({
  //             isProfile: true
  //           })
  //         }}>
  //               <div className={`bg-[orange] w-10 h-10 rounded-full `}>
  //                 {/* <img src={link} alt="" width={50} height={50} /> */}
  //               </div>
  //             </div>): (<> <button className="text-[20px] font-[300] underline underline-offset-8" onClick={()=>{
  //           setLogin({
  //             isSignUpOpen: false,
  //             isLoginOpen: true
  //           })
  //         }}>
  //           Login
  //         </button>
          
  //         <button className="aai-gradient-outline-btn" onClick={()=>{
  //           setLogin({
  //             isLoginOpen: false,
  //             isSignUpOpen: true
  //           })
  //         }}>Signup</button></>)}
  //       </div>
  //     </div>
    
  //   </div>
  // );
};

export default Navbar;
 

function Toogle({setToggle}){
  const navigate=useNavigate();
  const setUserProfile=useSetRecoilState(userProfileDetails);
  async function logout(){
    try{
      const response=await signOut(auth);
      setUserProfile({
        isProfile: false
      })
      return navigate("/");
    }catch(e){
      console.log(e);
    }
  }
  return(
    <div className="absolute text-white bg-[#152637] border border-white rounded-2xl lg:mx-0 mx-3 px-10 py-10 top-28 lg:left-[46%]">
    <div className="flex lg:flex-row flex-col gap-8">
      <RxCross1 className="text-[25px] text-end absolute right-5 top-4 cursor-pointer" onClick={()=>{
        setToggle(false);
      }} />
      <div className="bg-[blue] w-10 h-10 rounded-full" >
        <img
          src="../src/assets/profile.png"
          className=" rounded-full"
          alt=""
        />
      </div>
      <div>
        <div></div>
        <div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[28px] lg:text-[32px] font-[400] leading-[28px]">
              Amanda Lee
            </h1>
            <p className="text-[18px] lg:text-[22px] font-[400] leading-[16px]">
              amandalee@example.com
            </p>
          </div>
          <div className="my-3">
            <div className="flex gap-3 items-center my-5">
              <i className="fa-solid fa-gear"></i>
              <p>Manage Account</p>
            </div>
            <div className="flex gap-3 items-center">
              <i className="fa-solid fa-right-from-bracket"></i>
              <p onClick={()=>{
                logout();
                setToggle(false);
              }}>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
  )
}


function MobileNav(){
  const setLogin=useSetRecoilState(checkState);
  const getUserName=useRecoilValue(userName);
  const setUserProfile=useSetRecoilState(userProfileDetails);
  return(
     <div className="w-[80%] lg:hidden visible h-screen bg-[#04091E] absolute z-50 mt-[-33%]">
      <div className="text-white">
        <Link to="/">
          <img
            src="../src/assets/PostPilot.png"
            alt=""
            className="h-[76px] w-[75px] lg:h-[75px] lg:w-[85px] cursor-pointer"
          />
        </Link>
        <div className="text-[18px] font-[400] leading-normal py-10 px-6 flex flex-col gap-5">
          <Link to="/">Home</Link>
          <hr />
          <p>About Us </p>
          <hr />
          <p>Demo</p>
          <hr />
          <Link to="/pricing">Pricing</Link>
          <hr />
          <Link to="/contactus">Contact</Link>
          <hr />
        </div>
        {getUserName ? (
                <div className="lg:flex lg:justify-center lg:items-center lg:visible hidden cursor-pointer">
                <div className="bg-[orange] w-10 h-10 rounded-full" onClick={()=>{
                  setToggle(true)
                }}>
                  <img
                    src="../src/assets/profile.png"
                    className=" rounded-full"
                    alt=""
                  />
                </div>
              </div> 
          ) : (
            <>
              {" "}
              <button
                className="text-[20px] font-[300] underline underline-offset-8"
                onClick={() => {
                  setLogin({
                    isSignUpOpen: false,
                    isLoginOpen: true,
                  });
                }}
              >
                Login
              </button>
           
              <button
                className="aai-gradient-outline-btn"
                onClick={() => {
                  setLogin({
                    isLoginOpen: false,
                    isSignUpOpen: true,
                  });
                }}
              >
                Signup
              </button>
            </>
          )}
        {/* <div className="flex flex-col gap-8">
          <button
            className="text-[20px] font-[300] underline underline-offset-8 pr-32"
            onClick={() => {
              setLogin({
                isSignUpOpen: false,
                isLoginOpen: true,
              });
            }}
          >
            Login
          </button>
          <button
            className="aai-gradient-outline-btn w-[50%] ml-4"
            onClick={() => {
              setLogin({
                isLoginOpen: false,
                isSignUpOpen: true,
              });
            }}
          >
            Signup
          </button>
        </div> */}
      </div>
    </div> 
  )
}
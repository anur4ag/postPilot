import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkState } from "../../Store/Variables";
import { userName } from "../../Store/Getters";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
const Navbar = () => {
  const setLogin=useSetRecoilState(checkState);
  const getUserName=useRecoilValue(userName);
  const navigate=useNavigate();
async function logout(){
  try{
    const response=await signOut(auth);
    return navigate("/");
  }catch(e){
    console.log(e);
  }
}

  return (
    <div className="bg-[#080E26] sticky top-0 z-20 px-4 overflow-x-hidden">
      <div className="text-white lg:flex lg:justify-between lg:items-center lg:w-[65%] py-4 lg:mx-auto">
        <div className="flex justify-between items-center overflow-hidden">
          <img
            src="../src/assets/PostPilot.png"
            alt=""
            className="h-[76px] w-[75px] lg:h-[75px] lg:w-[75px]"
          />
          <i className="fa-solid fa-bars lg:hidden visible text-[16px]"></i>
        </div>
        <div className="lg:flex gap-6 px-9 text-[16px] font-[500] lg:visible hidden">
          <p>Home</p>
          <p>About Us</p>
          <p>Demo</p>
          {/* <p>Pages</p> */}
          <p>Pricing</p>
          <p>Contact</p>
        </div>
        <div className="lg:flex flex-row gap-5 lg:visible hidden">
         {getUserName? (
          <button className="aai-gradient-outline-btn" onClick={logout}>Logout</button>): (<> <button className="text-[20px] font-[300] underline underline-offset-8" onClick={()=>{
            setLogin({
              isSignUpOpen: false,
              isLoginOpen: true
            })
          }}>
            Login
          </button>
          <button className="aai-gradient-outline-btn" onClick={()=>{
            setLogin({
              isLoginOpen: false,
              isSignUpOpen: true
            })
          }}>Signup</button></>)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

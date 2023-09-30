import { RxCross1 } from "react-icons/rx";

import { useSetRecoilState } from "recoil";
import { userProfileDetails } from "../../Store/Variables";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
const ManageProfile = () => {
    const setUserProfile=useSetRecoilState(userProfileDetails);
const navigate=useNavigate();
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
  return (
    <div className="absolute text-white bg-[#080E26] border border-white rounded-2xl px-10 py-10 top-28 left-[46%]">
      <div className="flex gap-8">
        <RxCross1 className="text-[25px] text-end absolute right-5 top-4 cursor-pointer" onClick={()=>{
            setUserProfile({
                isProfile: false
            })
        }} />
        <div className="bg-[orange] w-10 h-10 rounded-full"></div>
        <div>
          <div></div>
          <div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[32px] font-[400] leading-[28px]">
                {auth.currentUser.displayName}
              </h1>
              <p className="text-[22px] font-[400] leading-[16px]">
                {auth.currentUser.email}
              </p>
              
            </div>
            <div className="my-3">
              <div className="flex gap-3 items-center my-5">
                <i className="fa-solid fa-gear"></i>

                <p>Manage Account</p>
                <i className="fa-solid fa-gear"></i>
                <Link to="/projectsection">Dashoard</Link>
              </div>
              <div className="flex gap-3 items-center">
                <i className="fa-solid fa-right-from-bracket"></i>
                <p onClick={logout}>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkState, userProfileDetails } from "../../Store/Variables";
import { userName } from "../../Store/Getters";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import ManageProfile from "./ManageProfile";
import { Link } from "react-router-dom";
const Navbar = () => {
  const setLogin=useSetRecoilState(checkState);
  const getUserName=useRecoilValue(userName);
  const setUserProfile=useSetRecoilState(userProfileDetails);

  const navigate=useNavigate();
// const link='https://wwhttps://repository-images.githubusercontent.com/317553358/1bff1d80-33ea-11eb-92c9-261d90080973w.google.com/url?sa=i&url=https%3A%2F%2Fwww.adobe.com%2Fcreativecloud%2Fphotography%2Fdiscover%2Fstock-photography.html&psig=AOvVaw1jkU08uDmk4EHKvMTWMXsA&ust=1696005118043000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJj7u8fdzYEDFQAAAAAdAAAAABAE'

// console.log(link);


  return (
    <div className="bg-[#080E26] sticky top-0 z-20 px-4 overflow-x-hidden relative">
      {/* <ManageProfile /> */}
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
          <Link to="/">Home</Link>
          <p>About Us</p>
          <p onClick={()=>{
            navigate("/");
            const navbar = document.getElementById('demo_section'); // Assuming 'navbar' is the id of your navbar element
            const navbarPosition = navbar.offsetTop;
        
            // Scroll to the navbar position
            window.scrollTo({
              top: navbarPosition,
              behavior: 'smooth', // Smooth scrolling animation
            });
          
          }}>Demo</p>
          {/* <p>Pages</p> */}
          <Link to="/pricing">Pricing</Link>
          <Link to="/contactus">Contact</Link>
        </div>
        <div className="lg:flex flex-row gap-5 lg:visible hidden">
         {getUserName? (
          <div className="lg:flex lg:justify-center lg:items-center lg:visible hidden cursor-pointer" onClick={()=>{
            setUserProfile({
              isProfile: true
            })
          }}>
                <div className={`bg-[orange] w-10 h-10 rounded-full `}>
                  {/* <img src={link} alt="" width={50} height={50} /> */}
                </div>
              </div>): (<> <button className="text-[20px] font-[300] underline underline-offset-8" onClick={()=>{
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

import { useSetRecoilState } from 'recoil';
import { checkState } from '../../Store/Variables';
import ReactPlayer from 'react-player';
const Demo = () => {

  const setLogin=useSetRecoilState(checkState);
  return (
    <div className="bg-[url('../src/assets/service-1.jpeg')] bg-no-repeat text-white overflow-x-hidden">
      <div className="flex gap-20 justify-center items-center py-28" controls>
        <div>
          {/* <img src="../src/assets/service-1.svg" alt="" /> */}
          <ReactPlayer url='<https://youtu.be/fhyNHwSMR3E?si=GEJs1PhEoSTDvo-_>' />
        </div>
        <div className="w-[35%] flex flex-col gap-8">
          <h1 className="text-[48px] font-[700] leading-[56px]">
            How to use?
            <span className='text-[38px] font-[500] leading-[56px]'>
              Check Our Demo!
            </span>
          </h1>
          
          <p className="text-[18px] font-[400] leading-[28px]">
            Give our AI a few descriptions and we all automatically create blog
            articles, product descriptions and more for you within just few
            second.
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="bg-[#4562ff] w-6 h-6 rounded-full p-1">
                <img
                  src="chrome-extension://bhlhnicpbhignbdhedgjhgdocnmhomnp/images/checkmark-icon.svg"
                  alt=""
                />
              </div>

              <p className="text-[18px] font-[400] leading-[27px]">
                Country Citizenship
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#4562ff] w-6 h-6 rounded-full p-1">
                <img
                  src="chrome-extension://bhlhnicpbhignbdhedgjhgdocnmhomnp/images/checkmark-icon.svg"
                  alt=""
                />
              </div>
              <p>Settling In Country</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#4562ff] w-6 h-6 rounded-full p-1">
                <img
                  src="chrome-extension://bhlhnicpbhignbdhedgjhgdocnmhomnp/images/checkmark-icon.svg"
                  alt=""
                />
              </div>
              <p>Entering & Leaving From Country</p>
            </div>
          </div>
          <button className="aai-gradient-outline-btn w-44" onClick={()=>{
            const navbar = document.getElementById('cta_form-03-690461'); // Assuming 'navbar' is the id of your navbar element
            const navbarPosition = navbar.offsetTop;
        
            // Scroll to the navbar position
            window.scrollTo({
              top: navbarPosition,
              behavior: 'smooth', // Smooth scrolling animation
            });
            setLogin({
              isSignUpOpen: true,
              isLoginOpen: false
            })
          }} >
           <a href="#cta_form-03-690461" target="_self"> Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;

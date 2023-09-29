const Error = () => {
    return (
      <div className="bg-[#04091E]">
        <div className="py-20 flex flex-col justify-center items-center text-white text-center">
          <img src="../src/assets/error-vect.svg" className=" px-4" alt="" />
          <h1 className="text-[48px] font-[700] leading-[56px] py-12">
            Oops! Page not found.
          </h1>
          <div className="flex lg:flex-row flex-col gap-10">
            <button className="aai-gradient-outline-btn">Back to Home</button>
            <button className="aai-gradient-outline-btn">Contact Us</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Error;
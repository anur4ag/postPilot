import { useState } from "react";
import { auth } from "../../Firebase/Firebase";
import Navbar from "./Navbar";
import SelectApp from "./SelectApp";
const AddProjects = () => {
const[isProjectOpen, setProject]=useState(false);

return (
  <div className="bg-[url('../src/assets/service-1.jpeg')] text-white">
    {isProjectOpen ? <SelectApp setProject={setProject} /> : null}
    <div className="flex justify-center flex-wrap gap-10 pt-[10rem] lg:px-0 px-10 py-20">
      <div className="bg-[#111629] w-[28rem] h-[15rem] lg:h-[20rem] flex gap-4 flex-col justify-center items-center rounded-3xl border border-white">
        <i
          className="fa-solid fa-plus text-[24px]"
          onClick={() => {
            setProject(true);
          }}
        ></i>
        <p
          onClick={() => {
            setProject(true);
          }}
        >
          Add Project
        </p>
      </div>
      <div className="bg-[#111629] w-[28rem] h-[15rem] lg:h-[20rem] flex justify-center items-center rounded-3xl border border-white flex-col gap-6">
        <h1 className="text-[24px] font-[400]">Project Name</h1>
        <div className="flex gap-8">
          <i className="fa-brands fa-linkedin text-blue-600 text-[50px]"></i>
          <i className="fa-brands fa-twitter text-blue-600 text-[50px]"></i>
        </div>
      </div>
      {/*  <div className="bg-[#111629] w-[28rem] h-[20rem] flex justify-center items-center rounded-3xl border border-white">
        <p>Add Project</p>
      </div>
      <div className="bg-[#111629] w-[28rem] h-[20rem] flex justify-center items-center rounded-3xl border border-white">
        <p>Add Project</p>
      </div> 
      {/* <div className="bg-[#111629] w-[28rem] h-[20rem] flex justify-center items-center rounded-3xl border border-white">
        <p>Add Project</p>
      </div>
      <div className="bg-[#111629] w-[28rem] h-[20rem] flex justify-center items-center rounded-3xl">
        <p>Add Project</p>
      </div>
      <div className="bg-[#111629] w-[28rem] h-[20rem] flex justify-center items-center rounded-3xl">
        <p>Add Project</p>
      </div> */}
    </div>
  </div>
);


 
};

export default AddProjects;

import React from "react";
import User from "./user"
import Usegetallusers from "../../context/Usegetallusers"
const users = ({usersdata}) => {
 
 console.log("i am users")
 console.log(usersdata)
  return (
    <div className="text-white h-[80vh]  overflow-hidden scrollbar-none overflow-y-scroll">
      <h1 className="bg-gray-800 text-white px-4 py-2 text-2xl sticky top-0 z-[100]">Messages</h1>
       {usersdata.map((item)=>{
          return   <User key={item._id} data ={item}/>
       })}                                                          
    </div>
  );
};

export default users;

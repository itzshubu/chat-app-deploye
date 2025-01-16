import React from "react";
import { use } from "react";
import toast from "react-hot-toast";
import { RiLogoutCircleLine } from "react-icons/ri";

const logout = () => {
  console.log("i am in logout");
  async function logout1() {
    try {
      let response = await fetch("api/user/logout", { method: "POST" });
      let data = await response.json();
      toast.success(data.message);
      localStorage.clear();
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex justify-center h-[10vh] items-center">
      <RiLogoutCircleLine onClick={logout1} className="text-[50px] h-full" />
    </div>
  );
};

export default logout;

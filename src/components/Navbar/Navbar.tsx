/* eslint-disable @next/next/no-img-element */
import React from "react";
import Logo from "./components/Logo";
import SearchInput from "./components/SearchInput";
import NavMenu from "./components/NavMenu";

const Navbar = () => {
  return (
    <div className="bg-black flex items-center justify-between py-4 px-4 lg:px-10 fixed top-0 left-0 right-0">
      <div className="items-center gap-8 justify-between w-1/3 hidden lg:flex">
        <Logo />
        <SearchInput />
      </div>
      <NavMenu />
      <MobileNavbar />
    </div>
  );
};

const MobileNavbar: React.FC = () => {
  return (
    <div className="w-full lg:hidden flex items-center justify-between">
      <div className="relative">
        <img src="/icons/user.svg" alt="user icon" className="h-10" />
        <div className="h-5 w-5 rounded-full bg-white absolute -bottom-1 -right-1 flex justify-center items-center">
          <img
            src="/icons/menu.svg"
            alt="menu icon"
            className="h-[8px] ml-[1px]"
          />
        </div>
      </div>
      <Logo />
    </div>
  );
};

export default Navbar;

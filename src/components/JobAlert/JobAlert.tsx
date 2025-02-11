/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import SwitchButton from "../SwitchButton/SwitchButton";
import { useSideMenu } from "@/providers/SideMenuContext";

const JobAlert = () => {
  const { openMenu } = useSideMenu();

  return (
    <div className="w-full flex ">
      <div className="w-full px-4 py-2 lg:p-4 rounded-md bg-primary text-white flex items-center justify-between me-2">
        <div className="flex flex-col gap-y-1">
          <p className="lg:text-base font-semibold">UI Designer in Egypt</p>
          <p className="text-xs font-light">70 job positions</p>
        </div>
        <SwitchButton />
      </div>
      <button
        onClick={openMenu}
        className="p-4 border rounded-md flex items-center justify-center border-gray-200 lg:hidden"
      >
        <img src="/icons/menu.svg" alt="menu icon" className="h-5" />
      </button>
    </div>
  );
};

export default JobAlert;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useMobile } from "@/hooks/useMobile";
import { useSideMenu } from "@/providers/SideMenuContext";
import * as React from "react";
import SideMenuHeader from "./components/SideMenuHeader";
import SideMenuList from "./components/SideMenuList";

const SideMenu = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [save, setSave] = React.useState(false);
  const { isOpen, closeMenu, openMenu } = useSideMenu();
  const isMobile = useMobile();

  React.useEffect(() => {
    if (!isMobile) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [isMobile]);

  return (
    <div
      className={`fixed z-10  top-0 right-0  lg:top-20 lg:left-0 h-screen w-full lg:w-80 bg-white shadow-lg transform transition-transform lg:transition-none lg:transform-none  ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <SideMenuHeader
        isEdit={isEdit}
        openEdit={() => setIsEdit(true)}
        closeEdit={() => setIsEdit(false)}
        saveMenu={() => setSave(true)}
      />
      <SideMenuList
        isEdit={isEdit}
        save={save}
        toggleSave={() => setSave(false)}
      />
    </div>
  );
};

export default SideMenu;

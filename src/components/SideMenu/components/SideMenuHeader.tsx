/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSideMenu } from "@/providers/SideMenuContext";

interface SideMenuHeaderProps {
  isEdit: boolean;
  openEdit: () => void;
  closeEdit: () => void;
  saveMenu: () => void;
}

const SideMenuHeader: React.FC<SideMenuHeaderProps> = ({
  isEdit,
  openEdit,
  closeEdit,
  saveMenu,
}) => {
  const { closeMenu } = useSideMenu();

  return (
    <div className="flex items-center justify-between  border-b border-gray-200 px-4 py-6">
      <div className="flex items-center gap-4">
        <button onClick={closeMenu} className="lg:hidden">
          <img src="/icons/left-arrow.svg" alt="close icon" className="h-4" />
        </button>
        <p className="text-lg">Menu</p>
      </div>

      {!isEdit ? (
        <button onClick={openEdit}>
          <img src="/icons/settings.svg" alt="setting icon" className="h-6" />
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={closeEdit}>
            <img src="/icons/cancel.svg" alt="close icon" className="h-7" />
          </button>
          <button
            onClick={() => {
              saveMenu();
              closeEdit();
            }}
          >
            <img src="/icons/save.svg" alt="save icon" className="h-7" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SideMenuHeader;

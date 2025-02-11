/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const navItems = [
  {
    icon: "/icons/home.svg",
    name: "Home",
    url: "/",
  },
  {
    icon: "/icons/jobs.svg",
    name: "Jobs",
    url: "/",
  },
  {
    icon: "/icons/employers.svg",
    name: "Employers",
    url: "/",
  },
];

const settingItems = [
  {
    icon: "/icons/bell.svg",
    name: "Notifications",
    url: "/",
  },
  {
    icon: "/icons/message.svg",
    name: "Messages",
    url: "/",
    count: 2,
  },
  {
    icon: "/icons/user.svg",
    name: "Profile",
    url: "/",
  },
];

const NavMenu = () => {
  return (
    <>
      <div className="items-end gap-x-8 hidden lg:flex">
        {navItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
        <div className="h-12 w-px bg-gray-300"></div>
        {settingItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </div>
    </>
  );
};

interface NavItemProps {
  icon: string;
  name: string;
  url: string;
  count?: number;
}
const NavItem: React.FC<NavItemProps> = ({ icon, name, url, count }) => {
  return (
    <Link
      href={url}
      className="cursor-pointer flex flex-col items-center justify-center gap-y-2 text-white text-xs relative"
    >
      {count && (
        <div className="absolute -top-1 right-3 bg-red-500 rounded-full w-3 h-3 flex items-center justify-center text-xxs">
          <p className="mb-[1px]">{count}</p>
        </div>
      )}
      <img
        src={icon}
        alt={name}
        className={name === "Profile" ? "h-6" : "h-5"}
      />
      <p>{name}</p>
    </Link>
  );
};

export default NavMenu;

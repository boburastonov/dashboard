"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { IoCarSportSharp, IoNewspaper, IoStorefront } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { sideBar } from "../interface";
import { BiSolidCategory } from "react-icons/bi";
import Image from "next/image";
import Logo from "../../../public/logo.svg";

const sidebarData: sideBar[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiFillHome />,
    path: "/",
  },
  {
    id: 2,
    title: "Categories",
    icon: <BiSolidCategory />,
    path: "/categories",
  },
  {
    id: 3,
    title: "Brands",
    icon: <IoStorefront />,
    path: "/brands",
  },
  {
    id: 4,
    title: "Models",
    icon: <IoNewspaper />,
    path: "/models",
  },
  {
    id: 5,
    title: "Locations",
    icon: <FaMapLocationDot />,
    path: "/locations",
  },
  {
    id: 6,
    title: "Cities",
    icon: <PiBuildingApartmentFill />,
    path: "/cities",
  },
  {
    id: 7,
    title: "Cars",
    icon: <IoCarSportSharp />,
    path: "/cars",
  },
];

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  useEffect(() => {
    // Avvalgi active itemni localStorage'dan olish
    const savedActiveItem = localStorage.getItem("activeItem");
    if (savedActiveItem) {
      setActiveItem(Number(savedActiveItem));
    } else {
      // Agar hech narsa saqlanmagan bo'lsa, default active itemni belgilash
      setActiveItem(sidebarData[0].id); // Masalan, birinchi item
    }
  }, []);

  const handleItemClick = (id: number) => {
    setActiveItem(id);
    // localStorage.setItem("activeItem", id.toString()); // active itemni saqlash
  };

  return (
    <aside
      className={`${
        open ? "w-[15.6%]" : "w-[6.2%]"
      } h-full bg-[#001529] pt-6 -mt-[60px] text-center text-white float-left z-[999] transition-all duration-[0.3s]`}
    >
      {open ? (
        <h1 className="font-bold text-[20px] leading-[28px] mb-6">
          AutoZoom Admin
        </h1>
      ) : (
        <Image
          src={Logo}
          alt="logo"
          width={72}
          height={74}
          className="m-auto mb-6"
        />
      )}
      <ul className="list-none">
        {sidebarData.map((item) => (
          <li
            key={item.id}
            className={`${activeItem === item.id ? "active" : ""} m-1 ${
              open ? "pl-6" : "pl-4"
            } pr-4 py-3 rounded-[10px]`}
            onClick={() => handleItemClick(item.id)}
          >
            <Link
              href={item.path}
              className={`${
                open ? "gap-2" : "gap-0" && "text-xl"
              } flex items-center transition-all duration-[0.3s] text-center`}
            >
              {item.icon} {open && item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

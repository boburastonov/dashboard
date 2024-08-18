"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { IoCarSportSharp, IoNewspaper, IoStorefront } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { useRouter } from "next/router";
import { sideBar } from "../interface";

const sidebarData: sideBar[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiFillHome />,
    path: "/",
  },
  {
    id: 2,
    title: "Settings",
    icon: <IoMdSettings />,
    path: "/settings",
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

const Sidebar: React.FC = () => {
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
    localStorage.setItem("activeItem", id.toString()); // active itemni saqlash
  };

  return (
    <aside className="w-56 h-full bg-[#001529] pt-6 text-center text-white float-start">
      <h1 className="font-bold text-[20px] leading-[28px] mb-6">
        AutoZoom Admin
      </h1>
      <ul className="list-none">
        {sidebarData.map((item) => (
          <li
            key={item.id}
            className={`${activeItem === item.id ? 'active' : ''} m-1 pl-6 pr-4 py-3 rounded-[10px]`}
            onClick={() => handleItemClick(item.id)}
          >
            <Link href={item.path} className="flex items-center gap-2">
              {item.icon} {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

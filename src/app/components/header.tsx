"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";

const Header = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <header className="w-[85.4%] flex items-center justify-between px-10 py-[10px] ml-auto bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#1677ff] py-3 px-[15px] text-center rounded-md text-white hover:opacity-90 outline-0"
      >
        {open ? <RiMenuFoldFill /> : <RiMenuUnfoldFill />}
      </button>
      <Link
        href={"/login"}
        className="inline-flex items-center #3e3e3e text-center px-3 py-1 bg-transparent rounded-md outline-0 border border-solid border-[#2e2e2e] text-[20px] font-semibold gap-2 transition-all duration-[0.3s] hover:border-none hover:bg-[#1677ff] hover:text-white"
      >
        Log out <IoMdLogOut />
      </Link>
    </header>
  );
};

export default Header;

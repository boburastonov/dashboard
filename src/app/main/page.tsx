"use client";
import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Footer from "../components/footer";

const Main = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <section className="h-[100vh]">
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <div
        className={`${
          open ? "w-[84.4%]" : "w-[93.8%]"
        } fixed top-[60px] bottom-[57px] right-0 p-[30px] ml-auto bg-[#4094f726] transition-all duration-[0.3s]`}
      >
        Dashboardga xush kelibsiz!
      </div>
      <Footer open={open} setOpen={setOpen} />
    </section>
  );
};

export default Main;

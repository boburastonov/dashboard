import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Main = () => {
  return (
    <section className="h-[100vh]">
      <Header />
      <Sidebar />
    </section>
  );
};

export default Main;

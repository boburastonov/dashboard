import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Footer from "../components/footer";

const Main = () => {
  return (
    <section className="h-[100vh]">
      <Header />
      <Sidebar />
      <Footer />
    </section>
  );
};

export default Main;

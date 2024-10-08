"use client";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Main from "./main/page";
import { useEffect } from "react";

export default function Home() {
  let router = useRouter();
  const goGome = () => {
    router.push("/");
  };
  const goLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    let tokenPr = localStorage.getItem("token");
    if (tokenPr?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1")) {
      goGome();
    } else {
      goLogin();
    }
  }, []);
  return (
    <>
      <Main />
      <ToastContainer />
    </>
  );
}

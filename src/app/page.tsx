"use client";
import { useRouter } from "next/navigation";
import Login from "./login/page";
import { ToastContainer } from "react-toastify";

export default function Home() {
  let router = useRouter();
  const goGome = () => {
    router.push("/");
  };
  const goLogin = () => {
    router.push("/login");
  };

  let tokenPr = localStorage.getItem("token");
  if (tokenPr?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1")) {
    goGome();
  } else {
    goLogin();
  }
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

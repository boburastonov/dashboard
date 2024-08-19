"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { MyResponseData } from "../interface";

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleRouter = () => {
    router.push("/");
  };

  const LoginFunction = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post<MyResponseData>(
        "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin",
        {
          phone_number: phone,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: AxiosResponse<MyResponseData>) => res.data)
      .then((data: MyResponseData) => {
        if (data?.success) {
          localStorage.setItem(
            "token",
            (data?.data as any)?.tokens?.accessToken?.token
          );
          toast.success(data?.message);
          handleRouter();
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err: AxiosError<MyResponseData>) => {
        err?.message === "Token expired" && localStorage.removeItem("token");
      });
  };
  return (
    <section className="bg-white h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
        <div className="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[50%] px-4 py-6">
          <Image src={Logo} width={52} height={52} alt="logo" />
        </div>
        <form className="p-12 md:p-24 shadow-2xl" onSubmit={LoginFunction}>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
            </svg>
            <input
              type="text"
              id="username"
              minLength={3}
              placeholder="Phone Number"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPhone((e?.target as HTMLInputElement)?.value)
              }
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
            </svg>
            <input
              type="password"
              id="password"
              minLength={3}
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPassword((e?.target as HTMLInputElement)?.value)
              }
            />
          </div>
          <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

"use client";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { MyResponseData } from "../interface";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import Image from "next/image";
import { toast } from "react-toastify";

const Categories: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<MyResponseData[] | undefined>();
  const [nameRu, setNameRu] = useState<string>();
  const [nameEn, setNameEn] = useState<string>();
  const [pic, setPic] = useState<File | undefined>();
  const token = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("name_ru", nameRu || "");
  formData.append("name_en", nameEn || "");
  formData.append("images", pic || "");

  const openModalItem = () => {
    setOpenModal(true);
    setEditModal(false);
  };
  const closeModalItem = () => setOpenModal(false);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.id === "modal-background"
      ) {
        closeModalItem();
      }
    };

    if (openModal) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [openModal]);
  const getFunction = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res: AxiosResponse<{ data: MyResponseData[] }>) => res?.data?.data)
      .then((data: MyResponseData[]) => setData(data))
      .catch((err) => console.error("API request failed: ", err));
  };
  useEffect(() => {
    getFunction();
  }, []);

  const addFunction = (e: React.FormEvent) => {
    axios
      .post(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: AxiosResponse<MyResponseData>) => res?.data)
      .then((data: MyResponseData) => {
        if (data?.success) {
          toast.success(data?.message);
          getFunction();
        } else {
          toast.error(data?.message);
        }
      });
  };
  /* Delete Datas */
  const deleteFunction = (id: string) => {
    axios
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: AxiosResponse<MyResponseData>) => res?.data)
      .then((data: MyResponseData) => {
        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      });
  };

  /* Edit Data */
  const [editModal, setEditModal] = useState<boolean>(false);
  const editModalFunction = (status: boolean) => {
    setOpenModal(false);
    setEditModal(true);
  };
  const [idBtn, setIdBtn] = useState<string>();
  const editFunction = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${idBtn}`,
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: AxiosResponse<MyResponseData>) => res?.data)
      .then((data: MyResponseData) => {
        if (data?.success) {
          toast.success(data?.message);
          setEditModal(false);
        } else {
          toast.error(data?.message);
        }
      });
  };

  return (
    <section className="h-[100vh]">
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      {openModal && (
        /* Modal */
        <div
          id="modal-background"
          className="fixed top-0 h-full w-full z-50 flex items-center justify-center bg-[#00000072]"
        >
          <div className="flex flex-col justify-center mx-3 mt-6 lg:flex-row">
            <div className="w-full lg:w-2/3 m-1">
              <form
                onSubmit={editModal ? editFunction : addFunction}
                className="w-full bg-white shadow-md p-6"
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name_ru"
                    >
                      NameRu
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                      type="text"
                      onChange={(e: React.FormEvent) =>
                        setNameRu((e?.target as HTMLInputElement)?.value)
                      }
                      name="name"
                      id="name_ru"
                      required
                    />
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name_ru"
                    >
                      NameEn
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                      type="text"
                      onChange={(e: React.FormEvent) =>
                        setNameEn((e?.target as HTMLInputElement)?.value)
                      }
                      name="name"
                      id="name_en"
                      required
                    />
                  </div>

                  <div className="w-full px-3 mb-8">
                    <label
                      className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                      htmlFor="dropzone-file"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        id="dropzone-file"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                        Category image
                      </h2>
                      <p className="mt-2 text-gray-500 tracking-wide">
                        Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
                      </p>

                      <input
                        id="dropzone-file"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPic(file);
                          }
                        }}
                        className="hidden"
                        name="category_image"
                        accept="image/png, image/jpeg, image/webp"
                      />
                    </label>
                  </div>
                  <div className="w-full md:w-full px-3 mb-6">
                    <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">
                      {editModal ? "Edit Category" : "Add Category"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {
        <div
          className={`${
            open ? "w-[84.4%]" : "w-[93.8%]"
          } fixed top-[60px] bottom-[57px] right-0 p-[30px] ml-auto bg-[#4094f726] transition-all duration-[0.3s]`}
        >
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                  &#8470;
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                  Name Ru
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                  NameEn
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                  Image
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                  Actions
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                  <button
                    onClick={openModalItem}
                    className="bg-[#1677ff] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Add Categories
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {data &&
                Array.isArray(data) &&
                data.map((item, index) => (
                  <tr
                    key={item?.id}
                    className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                  >
                    <td
                      key={item?.index}
                      className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                    >
                      {index + 1}
                    </td>
                    <td
                      key={item?.index}
                      className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                    >
                      {item?.name_ru}
                    </td>
                    <td
                      key={item?.index}
                      className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                    >
                      {item?.name_en}
                    </td>
                    <td
                      key={item?.index}
                      className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                    >
                      <Image
                        src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                        width={60}
                        height={60}
                        alt={item?.name_ru}
                      />
                    </td>
                    <td
                      onClick={() => editModalFunction(true)}
                      key={item?.index}
                      className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                    >
                      <button
                        onClick={() => setIdBtn(item?.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                        onClick={() => deleteFunction(item?.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td
                      key={item?.index}
                      className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                    ></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      }
      <Footer open={open} setOpen={setOpen} />
    </section>
  );
};

export default Categories;

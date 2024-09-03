"use client";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { MyResponseData } from "../interface";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
// import { toast } from "react-toastify";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Cars: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [data, setData] = useState<MyResponseData[] | undefined>();
  const [categoryData, setCategoryData] = useState<MyResponseData[]>();
  const [brandData, setBrandData] = useState<MyResponseData[]>();
  const [locationData, setLocationData] = useState<MyResponseData[]>();
  const [cityData, setCityData] = useState<MyResponseData[]>();
  const [brandId, setBrandId] = useState<string>();
  const [modelId, setModelId] = useState<string>();
  const [cityId, setCityId] = useState<string>();
  const [color, setColor] = useState<string>();
  const [yil, setYil] = useState<string>();
  const [seconds, setSeconds] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();
  const [pic, setPic] = useState<File | null>();
  const [speed, setSpeed] = useState<string>();
  const [maxPeople, setMaxPeople] = useState<string>();
  const [transmission, setTransmission] = useState<string>();
  const [mator, setMator] = useState<string>();
  const [driveSide, setDriveSide] = useState<string>();
  const [yoqilgi, setYoqilgi] = useState<string>();
  const [limit, setLimit] = useState<string>();
  const [deposit, setDeposit] = useState<string>();
  const [protectionPrice, setProtectionPrice] = useState<string>();
  const [priceAed, setPriceAed] = useState<string>();
  const [priceUsd, setPriceUsd] = useState<string>();
  const [priceAedOtd, setPriceAedOtd] = useState<string>();
  const [priceUsdOtd, setPriceUsdOtd] = useState<string>();
  const [locationId, setLocationId] = useState<string>();
  const [inclusive, setInclusive] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>();
  const [cover, setCover] = useState<File | null>();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const formData = new FormData();

  formData.append("brand_id", brandId || "");
  formData.append("model_id", modelId || "");
  formData.append("city_id", cityId || "");
  formData.append("color", color || "");
  formData.append("year", yil || "");
  formData.append("seconds", seconds || "");
  formData.append("category_id", categoryId || "");
  if (pic) {
    formData.append("images", pic);
  }
  formData.append("max_speed", speed || "");
  formData.append("max_people", maxPeople || "");
  formData.append("transmission", transmission || "");
  formData.append("motor", mator || "");
  formData.append("drive_side", driveSide || "");
  formData.append("petrol", yoqilgi || "");
  formData.append("limitperday", limit || "");
  formData.append("deposit", deposit || "");
  formData.append("premium_protection", protectionPrice || "");
  formData.append("price_in_aed", priceAed || "");
  formData.append("price_in_usd", priceUsd || "");
  formData.append("price_in_aed_sale", priceAedOtd || "");
  formData.append("price_in_usd_sale", priceUsdOtd || "");
  formData.append("location_id", locationId || "");
  formData.append("inclusive", inclusive ? "true" : "false");
  if (cover) {
    formData.append("cover", cover);
  }
  if (image) {
    formData.append("images", image);
  }

  const openModalItem = () => {
    setOpenModal(true);
    setEditModal(false);
  };
  const closeModalItem = () => {
    setOpenModal(false);
    setEditModal(false); // Edit modalni yopish
  };
  const editModalFunction = (status: boolean, item?: MyResponseData) => {
    setOpenModal(false);
    setEditModal(true);
    setIdBtn(item?.id);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.id === "modal-background"
      ) {
        closeModalItem();
      }
    };

    if (openModal || editModal) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [openModal, editModal]);

  const getFunction = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((res: AxiosResponse<{ data: MyResponseData[] }>) => res?.data?.data)
      .then((data: MyResponseData[]) => setData(data))
      .catch((err) => console.error("API request failed: ", err));
  };
  const getFunctionCategory = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res: AxiosResponse<{ data: MyResponseData[] }>) => res?.data?.data)
      .then((data: MyResponseData[]) => setCategoryData(data))
      .catch((err) => console.error("API request failed: ", err));
  };
  const getFunctionBrand = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((res: AxiosResponse<{ data: MyResponseData[] }>) => res?.data?.data)
      .then((data: MyResponseData[]) => setBrandData(data))
      .catch((err) => console.error("API request failed: ", err));
  };
  const getFunctionLocation = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
      .then((res: AxiosResponse<{ data: MyResponseData[] }>) => res?.data?.data)
      .then((data: MyResponseData[]) => setLocationData(data))
      .catch((err) => console.error("API request failed: ", err));
  };
  const getFunctionCity = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
      .then((res: AxiosResponse<{ data: MyResponseData[] }>) => res?.data?.data)
      .then((data: MyResponseData[]) => setCityData(data))
      .catch((err) => console.error("API request failed: ", err));
  };
  useEffect(() => {
    getFunction();
    getFunctionCategory();
    getFunctionBrand();
    getFunctionLocation();
    getFunctionCity();
  }, []);

  const addFunction = (e: React.FormEvent) => {
    e.preventDefault(); // Form submitlashi oldini olish uchun
    axios
      .post("https://autoapi.dezinfeksiyatashkent.uz/api/cars", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: AxiosResponse<MyResponseData>) => {
        const data = res?.data;
        if (data?.success) {
          toast.success(data?.message);
          getFunction();
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => console.error("API request failed: ", err));
  };

  /* Delete Datas */
  const deleteFunction = (id: string) => {
    axios
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`, {
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

  const [idBtn, setIdBtn] = useState<string>();
  const editFunction = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${idBtn}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: AxiosResponse<MyResponseData>) => {
        const data = res?.data;
        if (data?.success) {
          toast.success(data?.message);
          setEditModal(false);
          getFunction(); // Ma'lumotlarni yangilash uchun chaqirish
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => console.error("API request failed: ", err));
  };

  //filter data
  const filteredData = (data || []).filter(
    (item) =>
      item?.brand?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.model?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) setPic(files[0]);
  };
  const handleChangeFiles = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) setImage(files[0]);
  };
  const handleChangeFileCover = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) setCover(files[0]);
  };

  return (
    <section className="h-[100vh] w-full overflow-hidden">
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      {openModal ? (
        /* Modal */
        <div
          id="modal-background"
          className="fixed top-0 h-[100vh] w-full z-50 flex items-center justify-center bg-[#00000072]"
        >
          <div className="flex justify-center bg-white w-1/3 m-2 h-full overflow-auto">
            <form
              onSubmit={editModal ? editFunction : addFunction}
              className="w-full shadow-md p-6"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">Category</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setCategoryId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {categoryData &&
                        categoryData?.map((category, index) => (
                          <option value={category.id} key={index}>
                            {category.name_en}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">Brand</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setBrandId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {brandData &&
                        brandData?.map((brand, index) => (
                          <option value={brand.id} key={index}>
                            {brand.brand_title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">Model</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setModelId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {brandData &&
                        brandData?.map((brand, index) => (
                          <option value={brand.id} key={index}>
                            {brand.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">Location</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setLocationId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {locationData &&
                        locationData?.map((location, index) => (
                          <option value={location.id} key={index}>
                            {location.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">City</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setCityId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {cityData &&
                        cityData?.map((city, index) => (
                          <option value={city.id} key={index}>
                            {city.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="color"
                  >
                    Color
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setColor((e?.target as HTMLInputElement)?.value)
                    }
                    name="color"
                    id="color"
                    placeholder="3"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="yil"
                  >
                    Yil
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setYil((e?.target as HTMLInputElement)?.value)
                    }
                    name="yil"
                    id="yil"
                    placeholder="3"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="seconds"
                  >
                    Seconds
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setSeconds((e?.target as HTMLInputElement)?.value)
                    }
                    name="seconds"
                    id="seconds"
                    placeholder="1"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="speed"
                  >
                    Speed
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setSpeed((e?.target as HTMLInputElement)?.value)
                    }
                    name="speed"
                    id="speed"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="max-people"
                  >
                    Max People
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setMaxPeople((e?.target as HTMLInputElement)?.value)
                    }
                    name="max-people"
                    id="max-people"
                    placeholder="3"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="mator"
                  >
                    Mator
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setMator((e?.target as HTMLInputElement)?.value)
                    }
                    name="mator"
                    id="mator"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="transmission"
                  >
                    Transmission
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setTransmission((e?.target as HTMLInputElement)?.value)
                    }
                    name="transmission"
                    id="transmission"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="drive-side"
                  >
                    Drive Side
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setDriveSide((e?.target as HTMLInputElement)?.value)
                    }
                    name="drive-side"
                    id="drive-side"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="yoqilgi"
                  >
                    Yoqilg'i
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setYoqilgi((e?.target as HTMLInputElement)?.value)
                    }
                    name="yoqilgi"
                    id="yoqilgi"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="limit-per-day"
                  >
                    Limit Per Day
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setLimit((e?.target as HTMLInputElement)?.value)
                    }
                    name="limit-per-day"
                    id="limit-per-day"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="deposit"
                  >
                    Deposit
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setDeposit((e?.target as HTMLInputElement)?.value)
                    }
                    name="deposit"
                    id="deposit"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="protection-price"
                  >
                    Premium Protection Price
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setProtectionPrice((e?.target as HTMLInputElement)?.value)
                    }
                    name="protection-price"
                    placeholder="2"
                    id="protection-price"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price-in-aed"
                  >
                    Price in AED
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setPriceAed((e?.target as HTMLInputElement)?.value)
                    }
                    name="price-in-aed"
                    id="price-in-aed"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price-usd-otd"
                  >
                    Price in USD(Otd)
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setPriceUsdOtd((e?.target as HTMLInputElement)?.value)
                    }
                    name="price-usd-otd"
                    id="price-usd-otd"
                    placeholder="0"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price-aed-otd"
                  >
                    Price in AED(Otd)
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setPriceAedOtd((e?.target as HTMLInputElement)?.value)
                    }
                    name="price-aed-otd"
                    id="price-aed-otd"
                    placeholder="0"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price-in-usd"
                  >
                    Price in USD
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setPriceUsd((e?.target as HTMLInputElement)?.value)
                    }
                    name="price-in-usd"
                    id="price-in-usd"
                    placeholder="0"
                    required
                  />

                  <div className="relative inline-block w-10 mt-5 mr-2 align-middle select-none transition duration-200 ease-in">
                    <label
                      htmlFor="toggle"
                      className="text-base text-black mb-4"
                    >
                      Inclusive
                    </label>
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      onChange={() => setInclusive(!inclusive)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>

                  <div className="w-full px-3 mb-8 mt-8">
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
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                        Car image
                      </h2>

                      <p className="mt-2 text-gray-500 tracking-wide">
                        Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
                      </p>

                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="car_image"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleChangeFile}
                      />
                    </label>
                  </div>
                  <div className="w-full px-3 mb-8">
                    <label
                      className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                      htmlFor="dropzone-coverFile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                        Car image
                      </h2>

                      <p className="mt-2 text-gray-500 tracking-wide">
                        Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
                      </p>

                      <input
                        id="dropzone-coverFile"
                        type="file"
                        className="hidden"
                        name="car_image"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleChangeFileCover}
                      />
                    </label>
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
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                        Car image
                      </h2>

                      <p className="mt-2 text-gray-500 tracking-wide">
                        Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
                      </p>

                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="car_image"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleChangeFiles}
                      />
                    </label>
                  </div>
                </div>

                <div className="w-full md:w-full px-3 mb-6">
                  <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">
                    Add Car
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : editModal ? (
        /* Modal */
        <div
          id="modal-background"
          className="fixed top-0 w-full h-[100vh] z-50 flex items-center justify-center bg-[#00000072]"
        >
          <div className="flex justify-center bg-white w-1/3 m-2 h-full overflow-auto">
            <form
              onSubmit={editModal ? editFunction : addFunction}
              className="w-full shadow-md p-6"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6">
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">Category</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setCategoryId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {categoryData &&
                        categoryData?.map((category, index) => (
                          <option value={category.id} key={index}>
                            {category.name_en}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">Brand</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setBrandId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {brandData &&
                        brandData?.map((brand, index) => (
                          <option value={brand.id} key={index}>
                            {brand.brand_title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">Model</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setModelId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {brandData &&
                        brandData?.map((brand, index) => (
                          <option value={brand.id} key={index}>
                            {brand.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">Location</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setLocationId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {locationData &&
                        locationData?.map((location, index) => (
                          <option value={location.id} key={index}>
                            {location.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <p className="pb-2 text-start text-[15px]">City</p>
                    <select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setCityId(e?.target?.value);
                      }}
                      className="w-full p-3 shadow-2xl rounded-lg border border-solid border-[#ccc] outline-none"
                    >
                      {cityData &&
                        cityData?.map((city, index) => (
                          <option value={city.id} key={index}>
                            {city.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="color"
                  >
                    Color
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setColor((e?.target as HTMLInputElement)?.value)
                    }
                    name="color"
                    id="color"
                    placeholder="3"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="yil"
                  >
                    Yil
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setYil((e?.target as HTMLInputElement)?.value)
                    }
                    name="yil"
                    id="yil"
                    placeholder="3"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="seconds"
                  >
                    Seconds
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setSeconds((e?.target as HTMLInputElement)?.value)
                    }
                    name="seconds"
                    id="seconds"
                    placeholder="1"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="speed"
                  >
                    Speed
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setSpeed((e?.target as HTMLInputElement)?.value)
                    }
                    name="speed"
                    id="speed"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="max-people"
                  >
                    Max People
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setMaxPeople((e?.target as HTMLInputElement)?.value)
                    }
                    name="max-people"
                    id="max-people"
                    placeholder="3"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="mator"
                  >
                    Mator
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setMator((e?.target as HTMLInputElement)?.value)
                    }
                    name="mator"
                    id="mator"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="transmission"
                  >
                    Transmission
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setTransmission((e?.target as HTMLInputElement)?.value)
                    }
                    name="transmission"
                    id="transmission"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="drive-side"
                  >
                    Drive Side
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setDriveSide((e?.target as HTMLInputElement)?.value)
                    }
                    name="drive-side"
                    id="drive-side"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="yoqilgi"
                  >
                    Yoqilg'i
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setYoqilgi((e?.target as HTMLInputElement)?.value)
                    }
                    name="yoqilgi"
                    id="yoqilgi"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="limit-per-day"
                  >
                    Limit Per Day
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setLimit((e?.target as HTMLInputElement)?.value)
                    }
                    name="limit-per-day"
                    id="limit-per-day"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="deposit"
                  >
                    Deposit
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setDeposit((e?.target as HTMLInputElement)?.value)
                    }
                    name="deposit"
                    id="deposit"
                    placeholder="2"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="protection-price"
                  >
                    Premium Protection Price
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setProtectionPrice((e?.target as HTMLInputElement)?.value)
                    }
                    name="protection-price"
                    placeholder="2"
                    id="protection-price"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price-in-aed"
                  >
                    Price in AED
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setPriceAed((e?.target as HTMLInputElement)?.value)
                    }
                    name="price-in-aed"
                    id="price-in-aed"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price-usd-otd"
                  >
                    Price in USD(Otd)
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setPriceUsdOtd((e?.target as HTMLInputElement)?.value)
                    }
                    name="price-usd-otd"
                    id="price-usd-otd"
                    placeholder="0"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price-aed-otd"
                  >
                    Price in AED(Otd)
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setPriceAedOtd((e?.target as HTMLInputElement)?.value)
                    }
                    name="price-aed-otd"
                    id="price-aed-otd"
                    placeholder="0"
                    required
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price-in-usd"
                  >
                    Price in USD
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    onChange={(e: React.FormEvent) =>
                      setPriceUsd((e?.target as HTMLInputElement)?.value)
                    }
                    name="price-in-usd"
                    id="price-in-usd"
                    placeholder="0"
                    required
                  />
                  <div className="relative inline-block w-10 mt-5 mr-2 align-middle select-none transition duration-200 ease-in">
                    <label
                      htmlFor="toggle"
                      className="text-base text-black mb-4"
                    >
                      Inclusive
                    </label>
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      onChange={() => setInclusive(!inclusive)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  <div className="w-full px-3 mb-8 mt-8">
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
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                        Car image
                      </h2>

                      <p className="mt-2 text-gray-500 tracking-wide">
                        Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
                      </p>

                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="car_image"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleChangeFile}
                      />
                    </label>
                  </div>
                  <div className="w-full px-3 mb-8">
                    <label
                      className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                      htmlFor="dropzone-coverFile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                        Car image
                      </h2>

                      <p className="mt-2 text-gray-500 tracking-wide">
                        Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
                      </p>

                      <input
                        id="dropzone-coverFile"
                        type="file"
                        className="hidden"
                        name="car_image"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleChangeFileCover}
                      />
                    </label>
                  </div>
                  <div className="w-full px-3 mb-8">
                    <label
                      className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                      htmlFor="dropzone-files"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                        Car image
                      </h2>

                      <p className="mt-2 text-gray-500 tracking-wide">
                        Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
                      </p>

                      <input
                        id="dropzone-files"
                        type="file"
                        className="hidden"
                        name="car_image"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleChangeFiles}
                      />
                    </label>
                  </div>
                  2
                </div>

                <div className="w-full md:w-full px-3 mb-6">
                  <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">
                    Edit Car
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {
        <div
          className={`${
            open ? "w-[84.4%]" : "w-[93.8%]"
          }  top-[60px] bottom-[57px] right-0 p-[30px] ml-auto bg-[#4094f726] transition-all duration-[0.3s]`}
        >
          <form className="w-[50%]">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <IoSearchSharp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          <div className="w-full h-[72vh] overflow-scroll overflow-x-hidden">
            <table className="w-full h-full border-collapse block md:table overflow-y-scroll">
              <thead className="block md:table-header-group sticky top-0">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    &#8470;
                  </th>
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Brand
                  </th>
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Model
                  </th>
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Color
                  </th>
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    City
                  </th>
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Actions
                  </th>
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    <button
                      onClick={openModalItem}
                      className="bg-[#1677ff] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Add Cars
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className=" block md:table-row-group">
                {filteredData &&
                  Array.isArray(filteredData) &&
                  filteredData.map((item, index) => (
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
                        {item?.brand?.title}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        {item?.model?.name}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        {item?.color}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        {item?.city?.name}
                      </td>
                      <td
                        key={item?.index}
                        className="p-2 md:border md:border-grey-500 text-center block md:table-cell"
                      >
                        <button
                          onClick={() => editModalFunction(true, item)}
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
        </div>
      }
      <Footer open={open} setOpen={setOpen} />
    </section>
  );
};

export default Cars;

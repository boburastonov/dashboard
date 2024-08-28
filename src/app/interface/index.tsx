export interface sideBar {
  id: number;
  title: string;
  icon: JSX.Element;
  path: string;
}

export interface MyResponseData {
  id: string;
  phone: number;
  password: string;
  success: boolean;
  message: string;
  image_src: string;
  name_ru: string;
  name_en: string;
  title: string;
  brand_title: string;
  text: string;
  index: number;
  name: string;
  color: string;
  data: {
    tokens: {
      accessToken: {
        token: string;
      };
    };
  }[];
}

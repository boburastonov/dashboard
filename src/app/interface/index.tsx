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
  index: number;
  data: {
    tokens: {
      accessToken: {
        token: string;
      };
    };
  }[];
}

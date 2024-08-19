export interface sideBar {
  id: number;
  title: string;
  icon: JSX.Element;
  path: string;
}

export interface MyResponseData {
  phone: number;
  password: string;
  success: boolean;
  message: string;
  data: {
    tokens: {
      accessToken: {
        token: string;
      };
    };
  };
}

import axios, { AxiosRequestHeaders, Method } from "axios";

interface RequestFormat {
  method: Method;
  uri: string;
  body?: any;
  token?: string;
  query?: object;
  headers?: AxiosRequestHeaders;
  config?: any;
}

export const API = (req: RequestFormat) => {
  const { body } = req;
  return axios({
    method: "post",
    url: "http://localhost:5000",
    data: body,
  });
};

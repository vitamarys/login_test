import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { ILogin, ILoginResponse, IPasswordSet } from "../types";
const URL = process.env.REACT_APP_BASE_URL;
const GIT_CLIENTID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const GIT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  async logIn(credentials: ILogin): Promise<ILoginResponse> {
    try {
      const { data } = await axios.post<ILogin, AxiosResponse<ILoginResponse>>(
        `${URL}/v1/auth/login`,
        credentials
      );
      localStorage.setItem("token", data.access_token);
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  async resetPassword(
    email: string,
    redirect_url: string = `${window.location.origin}/password-reset`
  ) {
    try {
      const { data } = await axios.post(`${URL}/v1/auth/password-reset`, {
        email,
        redirect_url,
      });
      
      return data.detail;
    } catch (error: any) {
      throw new Error(error.message);
     
    }
  },
  async setPassword(passData: IPasswordSet) {
    try {
      const { data } = await axios.post(`${URL}/v1/auth/password-set`, {
        passData,
      });
      return data;
      
    } catch (error: any) {
        
     throw new Error(error.message);
    }
  },

};
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return Promise.reject(new Error("Unauthorized email"));
    }
    if (error.response && error.response.status === 429) {
      return Promise.reject(
        new Error("Something went wrong. Try again later.")
      );
    }
    if (error.response && error.response.status === 422) {
        return Promise.reject(
          new Error("Something went wrong. Try again later.")
        );
      }
    return Promise.reject(error);
  }
);

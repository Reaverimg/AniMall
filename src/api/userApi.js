import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "v1/accounts/register";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/accounts/login";
    return axiosClient.post(url, data);
  },
};

import axios from "axios";

let baseURL = "https://chartjs-serverjs.herokuapp.com/"; // Todo chage

if (window.location.hostname === "localhost") {
  baseURL = "http://localhost:4000/";
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

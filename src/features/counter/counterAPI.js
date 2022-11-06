import axios from "../../axios/axiosInstance";

export function getMessages() {
  return axios.get("message/messages");
}

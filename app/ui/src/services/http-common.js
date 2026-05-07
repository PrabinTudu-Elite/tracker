import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/tracker/app/api",
  headers: {
    "Content-type": "application/json"
  }
});
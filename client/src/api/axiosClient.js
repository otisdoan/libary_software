import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { 
    "Content-Type": "application/json", 
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  }
});
export default instance;
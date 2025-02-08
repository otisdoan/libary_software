import { useEffect, useState } from "react";
import axiosClient from "./api/axiosClient";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosClient.get("/")
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, []);

  return <h1>{message}</h1>;
}

export default App;

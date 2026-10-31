import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function MyRegistrations() {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .get(API + "/registrations/my", config)
      .then((res) => setList(res.data))
      .catch(() => setMessage("Please login first"));
  }, []);

  return (
    <div className="page">
      <h1>My Registrations</h1>

      <p>{message}</p>

      {list.map((r) => (
        <p key={r._id}>
          {r.event.name} - Rs. {r.event.fee}
        </p>
      ))}
    </div>
  );
}

export default MyRegistrations;
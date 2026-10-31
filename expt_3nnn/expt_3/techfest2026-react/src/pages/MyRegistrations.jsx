import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function MyRegistrations() {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(API + "/registrations/my", {
        withCredentials: true,
      })
      .then((res) => {
        setList(res.data);
        setMessage(
          res.data.length === 0
            ? "You have not registered for any events yet."
            : ""
        );
      })
      .catch((err) => {
        setMessage(
          err.response?.status === 401
            ? "Please login first"
            : "Could not load your registrations"
        );
      });
  }, []);

  return (
    <div className="page">
      <h1>My Registrations</h1>

      <p role="status">{message}</p>

      {list.map((registration) => (
        <p key={registration._id}>
          {registration.event.name} - Rs. {registration.event.fee}
        </p>
      ))}
    </div>
  );
}

export default MyRegistrations;
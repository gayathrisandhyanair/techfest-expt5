import { useState, useEffect } from "react";
import axios from "axios";
import EventList from "../components/EventList";

const API = "http://localhost:5000/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function loadEvents() {
    axios
      .get(API + "/events")
      .then((res) => setEvents(res.data))
      .catch(() => setError("Could not load events"));
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function registerForEvent(eventId) {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const res = await axios.post(
        API + "/registrations",
        { eventId: eventId },
        config
      );

      setMessage(res.data.message);
      loadEvents();
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server not reachable");
      }
    }
  }

  const filteredEvents = events.filter((event) => {
    const nameMatches = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatches =
      category === "All" || event.category === category;

    return nameMatches && categoryMatches;
  });

  return (
    <div className="page">
      <h1>Events</h1>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Technical">Technical</option>
        <option value="Workshop">Workshop</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
      </select>

      <EventList
        events={filteredEvents}
        registerForEvent={registerForEvent}
      />
    </div>
  );
}

export default Events;
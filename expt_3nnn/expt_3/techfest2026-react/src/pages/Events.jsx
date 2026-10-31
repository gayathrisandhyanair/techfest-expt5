import { useState, useEffect } from "react";
import axios from "axios";
import EventList from "../components/EventList";

const API = "/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function loadEvents() {
    axios
      .get(API + "/events")
      .then((res) => {
        setEvents(res.data);
        setError("");
      })
      .catch(() => setError("Could not load events"));
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function registerForEvent(eventId) {
    setMessage("");

    try {
      const res = await axios.post(
        API + "/registrations",
        { eventId },
        { withCredentials: true }
      );

      setMessage(res.data.message);
      loadEvents();
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Server not reachable"
      );
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

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <input
        type="search"
        aria-label="Search events"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        aria-label="Filter by category"
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
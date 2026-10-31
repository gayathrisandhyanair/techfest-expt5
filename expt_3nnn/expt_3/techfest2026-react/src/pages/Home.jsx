import { useState, useEffect } from "react";

function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        return response.json();
      })
      .then(() => {
        const techFestAnnouncements = [
          {
            id: 1,
            title: "Registrations for TechFest 2026 are now open."
          },
          {
            id: 2,
            title: "Coding Contest and Robotics Challenge will be held on Day 1."
          },
          {
            id: 3,
            title: "Participants are requested to report 30 minutes before their events."
          }
        ];

        setAnnouncements(techFestAnnouncements);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load announcements");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <h1>Welcome to TechFest 2026</h1>

      <p>
        Three days of hackathons, workshops and competitions.
      </p>

      <h2>Announcements</h2>

      {loading && <p>Loading...</p>}

      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && (
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              {announcement.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
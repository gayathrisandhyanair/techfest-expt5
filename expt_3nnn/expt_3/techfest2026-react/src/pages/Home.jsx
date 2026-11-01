const announcements = [
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

function Home() {
  return (
    <div className="page">
      <h1>Welcome to TechFest 2026</h1>

      <p>Three days of hackathons, workshops and competitions.</p>

      <h2>Announcements</h2>

      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>
            {announcement.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
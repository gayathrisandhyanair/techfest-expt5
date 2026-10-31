function EventCard({ event, registerForEvent }) {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>

      <p>Category: {event.category}</p>

      <p>
        Fee: {event.fee === 0 ? "Free" : `Rs. ${event.fee}`}
      </p>

      <p>Seats left: {event.seats}</p>

      {event.seats === 0 ? (
        <button disabled>SOLD OUT</button>
      ) : (
        <button onClick={() => registerForEvent(event._id)}>
          Register
        </button>
      )}
    </div>
  );
}

export default EventCard;
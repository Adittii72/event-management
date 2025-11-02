import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function EventDetail() {
  const [event, setEvent] = useState(null); // State for ONE event, starts as null
  const { id } = useParams(); // Gets the ':id' from the URL

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Fetch a single event using its ID
        const response = await axios.get(`http://localhost:5001/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEvent();
  }, [id]); // This effect re-runs if the 'id' in the URL changes

  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Show a loading message while we fetch data
  if (!event) {
    return <p>Loading event details...</p>;
  }

  // Once data is loaded, show the details
  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      {/* This line is now fixed with </p> */}
      <p><strong>When:</strong> {formatDate(event.date)}</p>
      <p><strong>Where:</strong> {event.location}</p>
      <p>
        <strong>Attendance:</strong> {event.currentParticipants} / {event.maxParticipants}
      </p>
      <p>{event.description}</p>

      <Link to="/" className="back-link">
        &larr; Back to all events
      </Link>
    </div>
  );
}

export default EventDetail;


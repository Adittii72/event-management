import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function EventDetail() {
  const [event, setEvent] = useState(null);
  // --- NEW: Add loading and error states ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      // --- NEW: Set loading/error states ---
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5001/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        console.error('Error fetching event details:', err);
        // --- NEW: Set error message ---
        setError('Failed to load event details. It may not exist.');
      } finally {
        // --- NEW: Set loading to false ---
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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

  // --- NEW: Render loading and error states ---
  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  // If the event is not found (but no server error), event will be null
  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
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


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Our backend API URL
const API_URL = 'http://localhost:5001/api/events';

function EventList() {
  // State to hold our list of events
  const [events, setEvents] = useState([]);

  // This code runs once when the component first loads
  useEffect(() => {
    // We define an async function to fetch data
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_URL);
        setEvents(response.data); // Put the array of events from our API into state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call the function
  }, []); // The empty array [] means "run this only once"

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

  return (
    <div>
      <h2>Upcoming Events</h2>
      <div className="card-list">
        {events.map((event) => (
          // Each card is a Link to the event's detail page
          <Link to={`/events/${event.id}`} key={event.id} className="card">
            <h3>{event.title}</h3>
            <p><strong>Where:</strong> {event.location}</p>
            <p><strong>When:</strong> {formatDate(event.date)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EventList;


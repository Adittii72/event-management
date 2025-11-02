import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// This is the API_URL our backend is running on
const API_URL = 'http://localhost:5001/api/events';

function EventList() {
  // --- All our state variables ---
  const [events, setEvents] = useState([]); // Holds the list of events
  const [loading, setLoading] = useState(true); // Is it currently loading?
  const [error, setError] = useState(null); // Did an error occur?

  // New state for our filters
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // --- Data Fetching ---
  useEffect(() => {
    // We define an async function inside the effect to fetch data
    const fetchEvents = async () => {
      setLoading(true); // Set loading to true before the API call
      setError(null); // Clear any previous errors

      try {
        // --- THIS IS THE UPDATED PART ---
        // We use URLSearchParams to easily add our search and location queries
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        if (locationFilter) {
          params.append('location', locationFilter);
        }

        // Make the GET request with our new query parameters
        // e.g., http://localhost:5001/api/events?search=react&location=online
        const response = await axios.get(`${API_URL}?${params.toString()}`);
        
        setEvents(response.data); // Store the results
      } catch (err) {
        // If the API call fails, store the error message
        console.error('Error fetching events:', err);
        setError('Failed to fetch events. Please try again later.');
      } finally {
        // This runs whether the request succeeded or failed
        setLoading(false); // Set loading to false
      }
    };

    fetchEvents(); // Call the function
  }, [searchTerm, locationFilter]); // Re-run this effect when searchTerm or locationFilter changes

  // --- Rendering Logic ---

  // 1. Show a loading message
  if (loading) {
    return <p>Loading events...</p>;
  }

  // 2. Show an error message if something went wrong
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  // 3. Show the events and filters
  return (
    <div className="container">
      <h2>Upcoming Events</h2>

      {/* --- NEW: Filter and Search Inputs --- */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by title..."
          className="filter-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location..."
          className="filter-input"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      {/* Event List */}
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id} className="card-link">
              <div className="card">
                <h3>{event.title}</h3>
                <p>{event.location}</p>
                <p>{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No events found. Try changing your filters!</p>
        )}
      </div>
    </div>
  );
}

export default EventList;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EventForm() {
  // navigate is a function to redirect the user
  const navigate = useNavigate();

  // State to hold all the data from our form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    maxParticipants: '',
  });

  // A single function to update our state as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // This function runs when the user clicks the "Create" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the browser from refreshing the page

    try {
      // Send the form data to our backend's POST endpoint
      const response = await axios.post(
        'http://localhost:5001/api/events',
        formData
      );

      console.log('Event created:', response.data);

      // Success! Redirect the user back to the home page
      navigate('/');
    } catch (error) {
      console.error('Error creating event:', error);
      // We'll add a user-facing error message in the next step
    }
  };

  return (
    <div>
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date and Time</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxParticipants">Max Participants</label>
          <input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="btn">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;


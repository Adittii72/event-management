import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

// --- Middleware ---
// This allows your frontend (running on a different port) to make requests to this backend.
app.use(cors());
// This allows the server to understand incoming JSON in request bodies (for our POST endpoint).
app.use(express.json());

// --- In-Memory Database ---
// This is our simple 'database' as requested in the PDF.
let events = [
  {
    id: 1,
    title: 'React Meetup',
    description: 'A deep dive into React Hooks and server components.',
    location: 'Online',
    date: '2025-11-10T19:00:00.000Z',
    maxParticipants: 50,
    currentParticipants: 15,
  },
  {
    id: 2,
    title: 'Node.js Workshop',
    description: 'Building fast and scalable APIs with Express and Node.js.',
    location: 'Community Hall',
    date: '2025-11-12T10:00:00.000Z',
    maxParticipants: 30,
    currentParticipants: 28,
  },
  {
    id: 3,
    title: 'CSS Masters',
    description: 'Join us to explore the new features of CSS, including container queries and cascade layers.',
    location: 'Online',
    date: '2025-11-14T17:00:00.000Z',
    maxParticipants: 100,
    currentParticipants: 45,
  },
  {
    id: 4,
    title: 'AI & The Future of Devs',
    description: 'A panel discussion on how generative AI is changing the landscape for software engineers.',
    location: 'IISc, Bangalore',
    date: '2025-11-25T18:00:00.000Z',
    maxParticipants: 150,
    currentParticipants: 0,
  },
  {
    id: 5,
    title: 'Cubbon Park Dog Meetup',
    description: 'Bring your furry friends! All breeds (and humans) welcome.',
    location: 'Cubbon Park',
    date: '2025-11-30T09:00:00.000Z',
    maxParticipants: 50,
    currentParticipants: 0,
  },
];
// This keeps track of the next available ID for new events
let nextId = 6;

// --- API Endpoints ---

// 1. GET /api/events (Get all events, with optional search and location filter)
//    This is the part that we just updated.
app.get('/api/events', (req, res) => {
  // Get the 'search' and 'location' query parameters from the URL
  // e.g., /api/events?search=react&location=online
  const { search, location } = req.query;

  let filteredEvents = events;

  // 1. Filter by search term (if one is provided)
  if (search) {
    filteredEvents = filteredEvents.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 2. Filter by location (if one is provided)
  if (location) {
    filteredEvents = filteredEvents.filter((event) =>
      event.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // We reverse the list so that new events appear at the top
  res.json(filteredEvents.slice().reverse());
});

// 2. GET /api/events/:id (Get a single event by its ID)
app.get('/api/events/:id', (req, res) => {
  // Find the event in our 'database'
  const event = events.find((e) => e.id === parseInt(req.params.id));
  
  // If we don't find the event, send a 404 (Not Found) error
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  // If we find it, send the event
  res.json(event);
});

// 3. POST /api/events (Create a new event)
app.post('/api/events', (req, res) => {
  // Get the data from the request body
  const { title, description, location, date, maxParticipants } = req.body;

  // Create the new event object
  const newEvent = {
    id: nextId++,
    title,
    description,
    location,
    date,
    maxParticipants: parseInt(maxParticipants, 10),
    currentParticipants: 0, // New events always start with 0 participants
  };

  // Add the new event to our 'database'
  events.push(newEvent);

  // Send a 201 (Created) status and the new event back to the frontend
  res.status(201).json(newEvent);
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});


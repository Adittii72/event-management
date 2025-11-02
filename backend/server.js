import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5001;
app.use(cors()); // Allows React app (on a different port) to make requests
app.use(bodyParser.json()); // Allows server to read JSON from POST requests

// In-Memory "Database" 
let events = [
  {
    id: 1,
    title: 'React Meetup',
    description: 'A deep dive into React Hooks and state management.',
    location: 'Online',
    date: '2025-11-10T19:00:00.000Z',
    maxParticipants: 50,
    currentParticipants: 15,
  },
  {
    id: 2,
    title: 'Node.js Workshop',
    description: 'Building fast and scalable APIs with Express and Node.',
    location: 'Community Hall',
    date: '2025-11-12T10:00:00.000Z',
    maxParticipants: 30,
    currentParticipants: 28,
  },
  {
    id: 3,
    title: 'Startup Pitch Night',
    description: 'Local founders pitch their ideas. Networking and snacks provided.',
    location: 'WeWork, Koramangala',
    date: '2025-11-15T18:30:00.000Z',
    maxParticipants: 75,
    currentParticipants: 40,
  },
  {
    id: 4,
    title: 'Intro to Generative AI',
    description: 'A beginner-friendly session on ChatGPT, DALL-E, and the future of AI.',
    location: 'Online',
    date: '2025-11-18T17:00:00.000Z',
    maxParticipants: 100,
    currentParticipants: 0,
  },
  {
    id: 5,
    title: 'Local Farmers Market',
    description: 'Support local vendors and enjoy fresh produce.',
    location: 'Community Hall',
    date: '2025-11-22T09:00:00.000Z',
    maxParticipants: 200,
    currentParticipants: 0,
  },
];

let nextId = 6;

// API Endpoints (The 3 Requirements) 


app.get('/api/events', (req, res) => {
  const { location } = req.query;

  let filteredEvents = [...events];

  if (location) {
    filteredEvents = filteredEvents.filter(event =>
      event.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  res.json(filteredEvents.reverse());
});


app.get('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  res.json(event);
});


app.post('/api/events', (req, res) => {
  const { title, description, location, date, maxParticipants } = req.body;

  if (!title || !description || !location || !date || !maxParticipants) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  const newEvent = {
    id: nextId++, 
    title,
    description,
    location,
    date,
    maxParticipants: parseInt(maxParticipants),
    currentParticipants: 0,
  };


  events.push(newEvent);

  console.log('Event created:', newEvent);
  

  res.status(201).json(newEvent);
});

//  Start the Server 
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});


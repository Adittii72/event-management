import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import our three new pages
import EventList from './pages/EventList.jsx';
import EventDetail from './pages/EventDetail.jsx';
import EventForm from './pages/EventForm.jsx';

function App() {
  return (
    <div>
      {/* --- Navigation Bar --- */}
      <nav>
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            EventFinder
          </Link>
        </h1>
        <div>
          <Link to="/">Home</Link>
          <Link to="/create">Create Event</Link>
        </div>
      </nav>

      {/* --- Page Content Area --- */}
      <main>
        <Routes>
          {/* Page 1: The Event List (Home Page) */}
          <Route path="/" element={<EventList />} />

          {/* Page 2: The Event Detail Page */}
          <Route path="/events/:id" element={<EventDetail />} />

          {/* Page 3: The Create Event Form */}
          <Route path="/create" element={<EventForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;



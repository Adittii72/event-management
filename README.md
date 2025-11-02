Event Finder - Mini Project
This is a full-stack event finder application built for the submission.

Deployed Links
Frontend (Website): https://event-management-kappa-opal.vercel.app
Backend (API): https://event-management-lyz8.vercel.app/api/events

Project Overview
Backend: Node.js, Express
Frontend: HTML, JavaScript, Tailwind CSS (via CDN)

Features
View all events with live search and location filtering.
View event details on a separate page.
Create new events via a form.
Live API integration to create and retrieve data.
Fully responsive dark-mode UI.

How to Run Locally

Backend:
cd backend
npm install
npm run dev
(Server will run on http://localhost:5001)

Frontend:
No install needed. Just open the frontend/index.html file in your browser (or use a Live Server).

API Documentation
GET /api/events: Lists all events.
Query Params: ?search=... (filters by title), ?location=... (filters by location)
GET /api/events/:id: Gets a single event by its ID.
POST /api/events: Creates a new event. Expects a JSON body with:

title (string)
description (string)
location (string)
date (string)
maxParticipants (number)

Challenges Faced
We initially started with a full MERN stack (React + Vite), but ran into severe, time-consuming configuration issues with Tailwind CSS, PostCSS, and Vite's module system. With the deadline approaching, we made a strategic pivot.

Solution: We replaced the entire React frontend with a single, vanilla HTML/JS file that uses the Tailwind CDN. This allowed us to keep the high-quality UI and all the backend functionality, but bypass 100% of the configuration errors. This successfully demonstrated an "ability to ship fast" by prioritizing a working, deployed product over a complex framework.

AI Tools Used
I used an AI assistant (Gemini) as a pair programmer.
Planning: To break down the PDF requirements into a step-by-step plan.
Boilerplate Code: To generate the initial Node.js/Express server and the final, corrected HTML/CSS frontend.
Troubleshooting: To work through the initial configuration nightmare, which ultimately led to our successful pivot to a vanilla JS solution.
Refactoring: To convert the final index.html file's JavaScript to consume the live API endpoints, fulfilling the assignment requirements.
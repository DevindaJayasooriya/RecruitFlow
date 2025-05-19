# RecruitFlow

A web-based recruitment management system built with React for the frontend and Node.js with SQLite for the backend. This application allows users to manage candidate data across different recruitment stages (Applying Period, Screening, Interview, Test), add new candidates, and filter candidates based on various criteria.

Setup Instructions

Prerequisites

Node.js (v14.x or later)
npm (v6.x or later)
SQLite (installed automatically with the sqlite3 package)

Project Structure

frontend/: Contains the React application
backend/: Contains the Node.js server 

Step-by-Step Installation

Download the zip file and extract the file

Backend Setup

Navigate to the backend directory: cd backend
Install dependencies: npm install
Create a .env file in the backend directory and add: PORT=5001 
Start the backend server: npm start
The server will run on http://localhost:5001 or the port specified in .env

Frontend Setup

Navigate to the frontend directory: cd frontend
Install dependencies: npm install
Start the development server: npm run dev
The frontend will run on http://localhost:5173

Verify Connection

Open http://localhost:5173 in your browser.
Ensure the backend is running to fetch and save candidate data.




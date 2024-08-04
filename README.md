# Minimum Wage Calculator

This is a web application that calculates the minimum wage in Switzerland for a given job, based on the age of the employee, location (some cantons offer a minimum wage), and job position.

NOTE: This state heavily relies on dummy data. So do NOT assume that any of the values in this draft are legally binding and safe.

## Project Structure

The project is organized into the following directories:

```
/ # Root directory
/backend # Express server for backend logic
/frontend # React + TypeScript frontend
/test-e2e # End-to-end tests using Playwright
```

## Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

## Installation

To get started, you need to install the dependencies for both the backend and frontend.

1. **Backend**

   ```bash
   cd backend
   npm install
   ```

2. **Frontend**

   ```bash
   cd frontend
   npm install
   ```

## Running the Application

To run the application in development mode, you need to start both the backend and frontend servers.

1. **Backend**

   Navigate to the backend directory and run:

   ```bash
   npm run dev
   ```

2. **Frontend**

   In a new terminal window, navigate to the frontend directory and run:

   ```bash
   npm run dev
   ```

The frontend application will typically be accessible at `http://localhost:5173` and the backend at `http://localhost:4000`, or depending on your configuration.

## Running End-to-End Tests

The project includes end-to-end tests written with Playwright. To run these tests, use the following command from the root directory:

```bash
npm run test
```

## Building for Production

To create a production build of the frontend that can be hosted by the backend service:

Frontend Build

Navigate to the frontend directory and run:

```bash
npm run build
```

The build process uses a copy plugin to automatically copy the generated bundle into the backend folder. This allows the backend to serve the static files in production.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/Header.jsx';
import { Toaster } from './components/ui/sonner.jsx';
  
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <App />
        <Toaster />
      </>
    ),
  },
  {
    path: '/create-trip',
    element: (
      <>
        <Header />
        <CreateTrip />
        <Toaster />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

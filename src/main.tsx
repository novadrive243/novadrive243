
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'sonner'

// Create the root element first
const rootElement = document.getElementById("root");

// Check if the root element exists
if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a div with id 'root' in your HTML.");
}

// Create the React root
const root = createRoot(rootElement);

// Render with providers in the correct order
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <App />
        <Toaster position="top-right" richColors />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

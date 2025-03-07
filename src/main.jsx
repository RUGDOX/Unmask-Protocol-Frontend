
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Simple, reliable initialization
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  
  // Hide loading screen after rendering
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // Use a slight delay to ensure content is rendered
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
} else {
  console.error("Could not find root element");
}

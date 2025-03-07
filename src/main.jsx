
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// More robust initialization
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("root");

  if (rootElement) {
    try {
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
    } catch (error) {
      console.error("Error rendering the application:", error);
      // Show error message in the UI
      rootElement.innerHTML = `<div style="color: red; padding: 20px;">Failed to load application. Please try refreshing the page.</div>`;
      
      // Also hide loading screen on error
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
    }
  } else {
    console.error("Could not find root element");
  }
});

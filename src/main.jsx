
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./utils/performance"; // Import performance monitoring

// Enable more detailed error reporting
console.log("Application initializing...");

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Log the element that caused the error if available
  if (event.target && event.target.outerHTML) {
    console.error('Error source element:', event.target.outerHTML.substring(0, 100));
  }
  
  // Don't hide the loading screen on error, allow error UI to display
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
});

// Mark the application start time
if (window.performance && window.performance.mark) {
  window.performance.mark('app-init-start');
}

// Create root with error handling
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Fatal: Could not find root element!");
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>Application Error</h2>
      <p>Could not find the root element. Please refresh the page or contact support.</p>
    </div>
  `;
} else {
  try {
    console.log("Mounting React app to root element:", rootElement);
    
    // Hide loading screen on successful mount
    const hideLoadingScreen = () => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          if (loadingScreen) loadingScreen.style.display = 'none';
        }, 500);
      }
    };
    
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App onLoad={hideLoadingScreen} />
        </BrowserRouter>
      </React.StrictMode>
    );
    
    console.log("React app mounted successfully");
  } catch (error) {
    console.error("Error rendering React application:", error);
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Application Error</h2>
        <p>Sorry, there was a problem loading the application. Please try refreshing the page.</p>
        <pre style="text-align: left; background: #333; color: #f88; padding: 10px; border-radius: 4px; max-width: 800px; margin: 20px auto; overflow: auto;">${error.message}</pre>
      </div>
    `;
  }
}

// Mark application initialization complete
if (window.performance && window.performance.mark) {
  window.performance.mark('app-init-end');
  window.performance.measure('App Initialization', 'app-init-start', 'app-init-end');
  const measures = window.performance.getEntriesByName('App Initialization');
  if (measures.length > 0) {
    console.log(`App initialization took: ${measures[0].duration.toFixed(2)}ms`);
  }
}

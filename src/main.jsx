
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
});

// Mark the application start time
if (window.performance && window.performance.mark) {
  window.performance.mark('app-init-start');
}

// Create root with error handling
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Fatal: Could not find root element!");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
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

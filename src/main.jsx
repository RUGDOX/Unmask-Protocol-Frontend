
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./utils/performance"; // Import performance monitoring

// Mark the application start time
if (window.performance && window.performance.mark) {
  window.performance.mark('app-init-start');
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Mark application initialization complete
if (window.performance && window.performance.mark) {
  window.performance.mark('app-init-end');
  window.performance.measure('App Initialization', 'app-init-start', 'app-init-end');
}

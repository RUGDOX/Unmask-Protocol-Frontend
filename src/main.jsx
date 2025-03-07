
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Get the root element
const root = document.getElementById("root");

// Create and render the app
if (root) {
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Hide loading screen after rendering
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
} else {
  console.error("Could not find root element");
}

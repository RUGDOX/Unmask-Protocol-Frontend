
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    this.setState({ errorInfo });
    
    // Ensure loading screen is hidden when an error occurs
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-4 bg-red-950/30 border border-red-500/30 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4 text-red-400">Something went wrong</h2>
          <p className="mb-4 text-gray-300">The application encountered an error. Try refreshing the page.</p>
          <details className="text-left bg-black/50 p-4 rounded max-w-4xl mx-auto overflow-auto">
            <summary className="cursor-pointer mb-2 text-yellow-400">Error details</summary>
            <p className="text-red-300 mb-2">{this.state.error && this.state.error.toString()}</p>
            <pre className="text-xs text-gray-400 overflow-auto p-2 bg-black/80 rounded">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


/**
 * Utility functions for performance monitoring
 */

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  // Monitor page load performance
  window.addEventListener('load', reportLoadMetrics);
  
  // Monitor navigation performance
  if ('PerformanceObserver' in window) {
    // Create observer for navigation timing
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('Navigation Performance:', {
            type: entry.type,
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            load: entry.loadEventEnd - entry.loadEventStart,
            domInteractive: entry.domInteractive - entry.startTime,
            firstPaint: entry.responseEnd - entry.startTime,
            total: entry.duration
          });
        }
      }
    });
    
    // Start observing navigation timing
    navigationObserver.observe({ entryTypes: ['navigation'] });
    
    // Create observer for long tasks (potential UI freezes)
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('Long Task Detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name
        });
      }
    });
    
    // Start observing long tasks if supported
    if (PerformanceObserver.supportedEntryTypes.includes('longtask')) {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    }
  }
};

// Report load metrics
const reportLoadMetrics = () => {
  if (window.performance) {
    // Get timing information
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domLoadTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
    
    console.log('Page Performance Metrics:', {
      pageLoadTime: `${pageLoadTime}ms`,
      domLoadTime: `${domLoadTime}ms`,
      redirectTime: perfData.redirectEnd - perfData.redirectStart,
      dnsLookupTime: perfData.domainLookupEnd - perfData.domainLookupStart,
      serverResponseTime: perfData.responseEnd - perfData.requestStart,
      domParsingTime: perfData.domComplete - perfData.domInteractive
    });
    
    // Alert for very slow load times
    if (pageLoadTime > 3000) { // 3 seconds threshold
      console.warn('Page load time is very slow!');
    }
  }
};

// Mark the start of a performance measure
export const markStart = (name) => {
  if (window.performance && window.performance.mark) {
    window.performance.mark(`${name}-start`);
  }
};

// Mark the end of a performance measure and log the result
export const markEnd = (name, logResult = true) => {
  if (window.performance && window.performance.mark) {
    window.performance.mark(`${name}-end`);
    window.performance.measure(name, `${name}-start`, `${name}-end`);
    
    if (logResult) {
      const entries = window.performance.getEntriesByName(name);
      if (entries.length > 0) {
        console.log(`${name}: ${entries[0].duration.toFixed(2)}ms`);
      }
    }
    
    return window.performance.getEntriesByName(name)[0]?.duration;
  }
  return null;
};

// Initialize performance monitoring on import
initPerformanceMonitoring();

// Export performance utility functions
export default {
  markStart,
  markEnd,
  initPerformanceMonitoring
};

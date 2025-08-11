import { useState, useEffect, useCallback } from 'react';

// Performance metrics interface
export interface PerformanceMetrics {
  // Web Vitals
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  
  // Navigation timing
  loadTime?: number;
  domContentLoaded?: number;
  
  // Memory info (if available)
  memoryUsage?: {
    used: number;
    total: number;
    percentage: number;
  };
  
  // Network info
  connection?: {
    effectiveType: string;
    downlink?: number;
    rtt?: number;
  };
}

// Hook for monitoring application performance
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isSupported, setIsSupported] = useState(false);

  // Check Web Vitals support
  useEffect(() => {
    setIsSupported('performance' in window && 'PerformanceObserver' in window);
  }, []);

  // Measure Web Vitals
  const measureWebVitals = useCallback(() => {
    if (!isSupported) return;

    // First Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
        }
      }).observe({ entryTypes: ['paint'] });
    } catch (error) {
      console.warn('FCP measurement failed:', error);
    }

    // Largest Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP measurement failed:', error);
    }

    // First Input Delay
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fidEntry = entries[0] as any;
        if (fidEntry) {
          setMetrics(prev => ({ ...prev, fid: fidEntry.processingStart - fidEntry.startTime }));
        }
      }).observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID measurement failed:', error);
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS measurement failed:', error);
    }
  }, [isSupported]);

  // Measure navigation timing
  const measureNavigationTiming = useCallback(() => {
    if (!('performance' in window) || !performance.timing) return;

    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;

    setMetrics(prev => ({
      ...prev,
      loadTime,
      domContentLoaded,
    }));
  }, []);

  // Measure memory usage
  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const used = memory.usedJSHeapSize;
      const total = memory.totalJSHeapSize;
      const percentage = (used / total) * 100;

      setMetrics(prev => ({
        ...prev,
        memoryUsage: { used, total, percentage },
      }));
    }
  }, []);

  // Measure network information
  const measureNetworkInfo = useCallback(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setMetrics(prev => ({
        ...prev,
        connection: {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        },
      }));
    }
  }, []);

  // Initialize all measurements
  useEffect(() => {
    if (!isSupported) return;

    measureWebVitals();
    measureNavigationTiming();
    measureMemoryUsage();
    measureNetworkInfo();

    // Re-measure memory usage periodically
    const memoryInterval = setInterval(measureMemoryUsage, 30000); // Every 30 seconds

    return () => {
      clearInterval(memoryInterval);
    };
  }, [isSupported, measureWebVitals, measureNavigationTiming, measureMemoryUsage, measureNetworkInfo]);

  // Log performance metrics (for development)
  const logMetrics = useCallback(() => {
    console.group('Performance Metrics');
    console.table(metrics);
    console.groupEnd();
  }, [metrics]);

  // Get performance score (0-100)
  const getPerformanceScore = useCallback((): number => {
    let score = 100;

    // FCP scoring (target: < 1.8s)
    if (metrics.fcp) {
      if (metrics.fcp > 3000) score -= 20;
      else if (metrics.fcp > 1800) score -= 10;
    }

    // LCP scoring (target: < 2.5s)
    if (metrics.lcp) {
      if (metrics.lcp > 4000) score -= 25;
      else if (metrics.lcp > 2500) score -= 15;
    }

    // FID scoring (target: < 100ms)
    if (metrics.fid) {
      if (metrics.fid > 300) score -= 20;
      else if (metrics.fid > 100) score -= 10;
    }

    // CLS scoring (target: < 0.1)
    if (metrics.cls) {
      if (metrics.cls > 0.25) score -= 15;
      else if (metrics.cls > 0.1) score -= 8;
    }

    return Math.max(0, score);
  }, [metrics]);

  return {
    metrics,
    isSupported,
    logMetrics,
    getPerformanceScore,
    measureMemoryUsage,
  };
};

import { useState, useEffect } from 'react';

interface DevicePerformance {
  isLowEnd: boolean;
  memoryInfo?: {
    totalJSHeapSize: number;
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  reducedMotion: boolean;
  shouldReduceAnimations: boolean;
}

export const useDevicePerformance = (): DevicePerformance => {
  const [performance, setPerformance] = useState<DevicePerformance>({
    isLowEnd: false,
    connectionSpeed: 'unknown',
    reducedMotion: false,
    shouldReduceAnimations: false
  });

  useEffect(() => {
    const detectPerformance = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Detect device memory (if available)
      const navigator = window.navigator as any;
      const deviceMemory = navigator.deviceMemory || 4; // Default to 4GB if not available

      // Detect network connection
      const connection = (navigator.connection || navigator.mozConnection || navigator.webkitConnection) as any;
      const connectionSpeed = connection ? 
        (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' ? 'slow' : 'fast') : 
        'unknown';

      // Detect if device is low-end based on multiple factors
      const isLowEnd = 
        deviceMemory < 2 || // Less than 2GB RAM
        connectionSpeed === 'slow' ||
        navigator.hardwareConcurrency < 4; // Less than 4 CPU cores

      // Get memory info if available (Chrome only)
      const memoryInfo = (performance as any).memory ? {
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : undefined;

      setPerformance({
        isLowEnd,
        memoryInfo,
        connectionSpeed,
        reducedMotion: prefersReducedMotion,
        shouldReduceAnimations: isLowEnd || prefersReducedMotion
      });
    };

    detectPerformance();

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => detectPerformance();
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return performance;
};

// Hook for monitoring frame rate and performance
export const useFrameRate = () => {
  const [fps, setFps] = useState(60);
  const [isStable, setIsStable] = useState(true);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsArray: number[] = [];

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime));
        fpsArray.push(currentFPS);
        
        // Keep only last 10 measurements
        if (fpsArray.length > 10) {
          fpsArray = fpsArray.slice(-10);
        }
        
        const avgFPS = fpsArray.reduce((a, b) => a + b, 0) / fpsArray.length;
        setFps(Math.round(avgFPS));
        
        // Consider stable if FPS is consistently above 30
        setIsStable(avgFPS > 30);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    const animationId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return { fps, isStable };
};

// Hook for adaptive animation settings
export const useAdaptiveAnimations = () => {
  const devicePerf = useDevicePerformance();
  const { fps, isStable } = useFrameRate();

  const getAnimationConfig = () => {
    if (devicePerf.shouldReduceAnimations || !isStable || fps < 30) {
      return {
        duration: 0.3, // Faster animations
        particles: false,
        heavyEffects: false,
        staggerDelay: 0.05,
        quality: 'low'
      };
    }

    if (devicePerf.isLowEnd || fps < 50) {
      return {
        duration: 0.4,
        particles: false,
        heavyEffects: false,
        staggerDelay: 0.08,
        quality: 'medium'
      };
    }

    return {
      duration: 0.6,
      particles: true,
      heavyEffects: true,
      staggerDelay: 0.1,
      quality: 'high'
    };
  };

  return {
    ...devicePerf,
    fps,
    isStable,
    config: getAnimationConfig()
  };
};

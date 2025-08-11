import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';

// Loading component for code-split sections
const SectionSkeleton: React.FC = () => (
  <div className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-700 rounded mb-8 w-1/3 mx-auto"></div>
        <div className="h-6 bg-gray-800 rounded mb-4 w-2/3 mx-auto"></div>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Enhanced loading component with animation
const LoadingSection: React.FC<{ message?: string }> = ({ message = 'Loading section...' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="py-20 px-4"
  >
    <div className="max-w-6xl mx-auto text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
      />
      <p className="text-gray-400">{message}</p>
    </div>
  </motion.div>
);

// HOC for wrapping sections with suspense and error boundaries
export const withLazySection = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType,
  errorFallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>,
) => {
  const LazySection: React.FC<P> = (props) => {
    const ErrorComponent = errorFallback || DefaultErrorFallback;

    return (
      <ErrorBoundary
        FallbackComponent={ErrorComponent}
        onReset={() => {
          // Reset any state if needed
        }}
      >
        <Suspense fallback={fallback ? React.createElement(fallback) : <LoadingSection />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return LazySection;
};

// Default error fallback
const DefaultErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="py-20 px-4">
    <div className="max-w-2xl mx-auto text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-red-400 mb-2">Something went wrong</h3>
      <p className="text-gray-400 mb-6">{error.message || 'Failed to load this section'}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

export { SectionSkeleton, LoadingSection };

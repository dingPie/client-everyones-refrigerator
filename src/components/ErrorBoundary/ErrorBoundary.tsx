import React from 'react';

import FallbackComponent from './FallbackComponent';

type FallbackComponentProps = { error: Error; resetError: () => void };

type ErrorBoundaryProps = {
  children: Exclude<NonNullable<React.ReactNode>, string | number | boolean>;
  FallbackComponent?: React.ComponentType<FallbackComponentProps>;
  onError?: (error: Error, stackTrace: string) => void;
};

function ErrorBoundary({
  children,
  FallbackComponent: ErrorFallbackComponent = FallbackComponent,
  onError,
}: ErrorBoundaryProps) {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = () => {
    setError(null);
  };

  const handleCatchError = (error: Error, info: { componentStack: string }) => {
    if (typeof onError === 'function') {
      onError(error, info.componentStack);
    }
    setError(error);
  };

  return error ? (
    <ErrorFallbackComponent error={error} resetError={resetError} />
  ) : (
    <React.Fragment>{React.Children.only(children)}</React.Fragment>
  );
}

export default ErrorBoundary;

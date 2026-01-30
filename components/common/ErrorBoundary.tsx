import React from 'react';

export class ErrorBoundary extends React.Component<{children?: React.ReactNode}, {hasError: boolean}> {
  public state: {hasError: boolean};
  public props: Readonly<{children?: React.ReactNode}>;

  constructor(props: {children?: React.ReactNode}) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-center p-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong.</h1>
            <p className="text-gray-600">Our engineers have been notified. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
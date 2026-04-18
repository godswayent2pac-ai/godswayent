import * as React from "react";

interface Props {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6 transition-colors duration-500">
          <div className="max-w-md w-full bg-card border border-border p-8 rounded-[2rem] text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-accent transition-all">Something went wrong</h2>
            <p className="text-muted-foreground text-sm mb-6 font-sans transition-all">
              The application encountered an unexpected error.
            </p>
            <div className="bg-muted p-4 rounded-xl text-[10px] font-mono text-red-500/80 overflow-auto mb-6 text-left max-h-48 transition-all border border-border">
              {this.state.error?.message || "Unknown error"}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-12 font-bold uppercase tracking-widest text-xs transition-all shadow-md active:scale-95"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

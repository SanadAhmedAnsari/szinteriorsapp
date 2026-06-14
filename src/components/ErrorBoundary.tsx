import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  private handleReset() {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong. Please try again later.";
      let isPermissionError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error?.includes('Missing or insufficient permissions')) {
            errorMessage = "You don't have permission to access this resource. Please make sure you are logged in with the correct account.";
            isPermissionError = true;
          }
        }
      } catch (e) {
        // Not a JSON error, use default
      }

      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl border border-stone-100 p-10 text-center space-y-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-500">
              <AlertTriangle size={40} />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-stone-900">
                {isPermissionError ? 'Access Denied' : 'Application Error'}
              </h1>
              <p className="text-stone-500 text-sm leading-relaxed">
                {errorMessage}
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center space-x-2 w-full py-4 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-800 transition-colors"
              >
                <RefreshCcw size={14} />
                <span>Reload Application</span>
              </button>
              
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex items-center justify-center space-x-2 w-full py-4 bg-stone-100 text-stone-900 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-200 transition-colors"
              >
                <Home size={14} />
                <span>Return Home</span>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 pt-8 border-t border-stone-100">
                <p className="text-[10px] font-mono text-stone-400 text-left overflow-auto max-h-40 p-4 bg-stone-50 rounded-xl">
                  {this.state.error.stack}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

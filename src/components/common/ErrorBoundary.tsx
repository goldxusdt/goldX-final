import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here you would log to a service like Sentry
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
          <Card className="w-full max-w-md border-destructive/20 v56-glass">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                  <ShieldAlert className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-2xl font-black">System Protection Triggered</CardTitle>
              <CardDescription>
                A security anomaly or application error has occurred. Your session remains secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/50 border border-white/5 text-xs font-mono break-all opacity-70">
                {this.state.error?.message || 'Unknown Execution Error'}
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="w-full h-12 rounded-xl font-bold uppercase tracking-widest text-xs"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Restart Application
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'} 
                  className="w-full h-12 rounded-xl font-bold uppercase tracking-widest text-xs"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

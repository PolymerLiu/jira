import React from 'react'
import { AuthenticatedApp } from 'authenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from 'unauthenticated-app';
import "./App.css";

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      </ErrorBoundary> */}
      {user?.token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;

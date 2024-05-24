import React from 'react';
import RoutesApp from "./routes";
import { AuthProvider } from "./auth/auth";

const App = () => (
  <AuthProvider>
    <RoutesApp/>
  </AuthProvider>
);

export default App;
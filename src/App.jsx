import './App.css';
import { useState, useEffect } from 'react';
import LoginForm from "./components/LoginForm";
import HomePage from './components/HomePage';
import { ensureDefaultUserExists } from "./services/api";

function App() {
  const [token, setToken] = useState(null);

  // Ensure the default user exists when the app starts
  useEffect(() => {
    ensureDefaultUserExists();
  }, []);

  return token ? (
    <HomePage token={token} />
  ) : (
    <LoginForm onLogin={setToken} />
  );
}

export default App;
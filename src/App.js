import { useEffect } from 'react';
import './App.css';
import getOrCreateUserToken from './hooks/useUserTokens';
import RouteApp from './routes';

function App() {
  useEffect(() => {
    document.title = "List's";
  }, []);

getOrCreateUserToken();

  return (
    <div>
      <RouteApp/>
    </div>
  );
}

export default App;
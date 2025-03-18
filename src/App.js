import './App.css';
import getOrCreateUserToken from './hooks/useUserTokens';
import RouteApp from './routes';

function App() {

getOrCreateUserToken();

  return (
    <div>
      <RouteApp/>
    </div>
  );
}

export default App;
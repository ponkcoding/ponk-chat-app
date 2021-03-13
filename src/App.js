import logo from './logo.svg';
import './App.css';
import {useAuth0} from "@auth0/auth0-react";

function App() {
  const {loginWithRedirect} = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          className="App-link"
          onClick={() => {loginWithRedirect()}}
          target="_blank"
          rel="noopener noreferrer"
        >
          Login
        </button>
      </header>
    </div>
  );
}

export default App;

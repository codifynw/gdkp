import logo from "./logo.svg";
import "./App.css";
import Raid from "./components/raid/Raid";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

const User = () => {
  return <div>This is the user page</div>;
};

const Home = () => {
  return <div>This is the home page</div>;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
        <p>Test</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
          <nav>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/user/:id">User</Link>
            </div>
          </nav>
          <Switch>
            <Route path="/user/:id">
              <User />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./components/LandingPage.jsx";
import { Home } from "./components/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          {/* <Route exact path="/*">
            <Home />
          </Route> */}
        </Switch>
        {/* <h1>Dogs</h1> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

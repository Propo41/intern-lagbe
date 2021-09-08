import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routerList from "./utils/route_list";

function App() {
  console.log(window.location);
  console.log(localStorage);
  if (localStorage.getItem("token") !== null) {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* private pages */}
            {routerList.private.map((route, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* public pages */}
            {routerList.public.map((route, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

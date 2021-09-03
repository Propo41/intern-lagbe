import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, useRoutes, Navigate} from "react-router-dom";
import routerList from "./utils/route_list";
import ChangePassword from "./containers/ChangePassword";
import ThemeConfig from './styles/admin';
import AdminRouter from './routes';
import GeneralRouter from './general-routes';

import LandingPage from "./containers/LandingPage";


function App() {
  console.log(window.location);
  console.log(localStorage);

/*   return (  
  <ThemeConfig>
    <AdminRouter />
  </ThemeConfig>
  ); 
*/

return (  
  <ThemeConfig>
    <GeneralRouter />
  </ThemeConfig>
  ); 



  if (localStorage.getItem("token") !== null) {
    return (
      <div className="App">
        <Router>
          <Routes>
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
          </Routes>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <Routes>
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
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;

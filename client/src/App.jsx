import "./styles/App.css";
import OrganisationHomepage from "./containers/OrganisationHomepage";
import LandingPage from "./containers/LandingPage";
import CompanyPage from "./containers/CompanyPage";
import SignInPage from "./containers/SignInPage";
import ForgotPassword from "./containers/ForgotPassword";
import ChangePassword from "./containers/ChangePassword";
import RegisterPage from "./containers/RegisterPage";
import VerifedPage from "./containers/VerifedPage";
import OrganisationProfilePage from "./containers/OrganisationProfilePage";
import OrganisationCreateJob from "./containers/OrganisationCreateJob";
import OrganisationJobPost from "./containers/OrganisationJobPost";
import OrganisationJobPostEdit from "./containers/OrganisationJobPostEdit";
import OrganisationApplicants from "./containers/OrganisationApplicants";
import AboutPage from "./containers/AboutPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  console.log(window.location);
  // if user is logged in, then redirect all public routes to private route
  //localStorage.clear();
  if (localStorage.getItem("token") !== null) {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* private pages */}
            <Route path="/home" exact component={OrganisationHomepage} />
            <Route path="/profile" exact component={OrganisationProfilePage} />
            <Route
              path="/applicants"
              exact
              component={OrganisationApplicants}
            />
            <Route path="/create-job" exact component={OrganisationCreateJob} />
            <Route path="/job/:jobid" exact component={OrganisationJobPost} />
            <Route
              path="/job/:jobid/edit"
              exact
              component={OrganisationJobPostEdit}
            />
            <Route path="/*" component={OrganisationHomepage} />
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
            <Route path="/" exact component={LandingPage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/company/:company" exact component={CompanyPage} />
            <Route path="/sign-in" exact component={SignInPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route
              path="/change-password/:token"
              exact
              component={ChangePassword}
            />
            <Route
              path="/verification-success/:token"
              exact
              component={VerifedPage}
            />
            <Route path="/*" component={LandingPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

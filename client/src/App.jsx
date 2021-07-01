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
          {/* private pages */}
          <Route path="/home" exact component={OrganisationHomepage} />
          <Route
            path="/home/profile"
            exact
            component={OrganisationProfilePage}
          />
          <Route
            path="/home/applicants"
            exact
            component={OrganisationApplicants}
          />
          <Route
            path="/home/create-job"
            exact
            component={OrganisationCreateJob}
          />
          <Route
            path="/home/job/:jobid"
            exact
            component={OrganisationJobPost}
          />
          <Route
            path="/home/job/:jobid/edit"
            exact
            component={OrganisationJobPostEdit}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

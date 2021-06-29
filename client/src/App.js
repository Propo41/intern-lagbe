import "./styles/App.css";
import PrivateJobCard from "./components/PrivateJobCard";
import ApplicantCard from "./components/ApplicantCard";
import AvailPositionCard from "./components/AvailPositionCard";
import LandingPage from "./containers/LandingPage/index";
import FilterBySort from "./components/FilterBySort";
import FilterByLocation from "./components/FilterByLocation";
import CompanyPage from "./containers/CompanyPage";
import TextInputLayout from "./components/TextInputLayout";
import SignInPage from "./containers/SignInPage";
import ForgotPassword from "./containers/ForgotPassword";
import ChangePassword from "./containers/ChangePassword";
import RegisterPage from "./containers/RegisterPage";
import VerifyYourselfPage from "./containers/VerifyYourselfPage";
import OrganisationProfilePage from "./containers/OrganisationProfilePage";
import OrganisationHomepage from "./containers/OrganisationHomepage";
function App() {
  return (
    <div className="App">
      {/* <PrivateJobCard />
      <ApplicantCard />
      <AvailPositionCard />
      <FilterBySort />
      <FilterByLocation /> */}
      {/*  <LandingPage /> */}
      {/*  <CompanyPage /> */}
      {/*    <SignInPage /> */}
      {/*  <ForgotPassword /> */}
      {/* <ChangePassword /> */}
      {/*    <RegisterPage /> */}
      {/* <VerifyYourselfPage/> */}
      {/*  <OrganisationProfilePage /> */}
      <OrganisationHomepage />
    </div>
  );
}

export default App;

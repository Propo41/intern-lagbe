import "./styles/App.css";
import OrganisationHomepage from "./containers/OrganisationHomepage";
import LandingPage from "./containers/LandingPage";
import CompanyPage from "./containers/CompanyPage";
import SignInPage from "./containers/SignInPage";
import ForgotPassword from "./containers/ForgotPassword";
import ChangePassword from "./containers/ChangePassword";
import RegisterPage from "./containers/RegisterPage";
import VerifyYourselfPage from "./containers/VerifyYourselfPage";
import OrganisationProfilePage from "./containers/OrganisationProfilePage";
import OrganisationCreateJob from "./containers/OrganisationCreateJob";
import OrganisationJobPost from "./containers/OrganisationJobPost";
import OrganisationJobPostEdit from "./containers/OrganisationJobPostEdit";
import OrganisationApplicants from "./containers/OrganisationApplicants";
import AboutPage from "./containers/AboutPage";
function App() {
  return (
    <div className="App">
      {/* <PrivateJobCard />
      <ApplicantCard />
      <AvailPositionCard />
      <FilterBySort />
      <FilterByLocation /> */}
      {/*  <LandingPage /> */}
      {/* <CompanyPage /> */}
      {/*  <SignInPage /> */}
      {/*  <ForgotPassword /> */}
      {/*  <ChangePassword /> */}
      {/*    <RegisterPage /> */}
      {/*  <VerifyYourselfPage/> */}
      {/*    <OrganisationProfilePage /> */}
      {/*  <OrganisationApplicants /> */}
      {/*  <OrganisationCreateJob /> */}
      {/*   <OrganisationJobPost /> */}
      {/*  <OrganisationJobPostEdit /> */}
      <AboutPage />

   {/*    <OrganisationHomepage /> */}
    </div>
  );
}

export default App;

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
function App() {
  return (
    <div className="App">
      {/* <PrivateJobCard />
      <ApplicantCard />
      <AvailPositionCard />
      <FilterBySort />
      <FilterByLocation /> */}
      <LandingPage />
      {/*    <CompanyPage /> */}
      {/*    <TextInputLayout /> */}
      {/* <SignInPage /> */}
    </div>
  );
}

export default App;

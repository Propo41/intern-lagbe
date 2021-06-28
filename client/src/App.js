import "./styles/App.css";
import PrivateJobCard from "./components/PrivateJobCard";
import ApplicantCard from "./components/ApplicantCard";
import AvailPositionCard from "./components/AvailPositionCard";
import LandingPage from "./containers/LandingPage/LandingPage";
import FilterBySort from "./components/FilterBySort";
import FilterByLocation from "./components/FilterByLocation";

function App() {
  return (
    <div className="App">
      {/* <PrivateJobCard />
      <ApplicantCard />
      <AvailPositionCard />
      <FilterBySort />
      <FilterByLocation /> */}
      <LandingPage />
    </div>
  );
}

export default App;

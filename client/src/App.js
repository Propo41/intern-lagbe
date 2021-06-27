import "./styles/App.css";
import PrivateJobCard from "./components/PrivateJobCard";
import ApplicantCard from "./components/ApplicantCard";
import AvailPositionCard from "./components/AvailPositionCard";
import LandingPage from "./containers/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
    {/*   <PrivateJobCard />
      <ApplicantCard />
      <AvailPositionCard /> */}
      <LandingPage/>
    </div>
  );
}

export default App;

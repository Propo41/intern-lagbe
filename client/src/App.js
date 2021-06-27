import "./styles/App.css";
import PrivateJobCard from "./components/PrivateJobCard";
import ApplicantCard from "./components/ApplicantCard";
import AvailPositionCard from "./components/AvailPositionCard";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <PrivateJobCard />
      <ApplicantCard />
      <AvailPositionCard />
    </div>
  );
}

export default App;

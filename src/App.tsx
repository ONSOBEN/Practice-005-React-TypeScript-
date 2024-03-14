import "./App.css";
import FooterComponent from "./components/FooterComponent";
import MainComponent from "./components/MainComponent";

import NavBarComponent from "./components/NavBarComponent";

function App() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <NavBarComponent />

      <MainComponent />
      <FooterComponent />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";

import SearchVehicles from "./components/searchVehicles/SearchVehicles";

const App: React.FC = () => {
  return (
    <div className="App">
      <SearchVehicles />
    </div>
  );
};

export default App;

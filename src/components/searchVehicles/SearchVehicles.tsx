import React, { useState } from "react";
import SearchWithDelay from "../SearchWithDelay";
import DataTable from "./DataTable";

const initalSearchText: string = "Search vehicles";

const SearchVehicles: React.FC = () => {
  const [searchText, setSearchText] = useState(initalSearchText);

  return (
    <div className="App">
      <h2>Vehicles</h2>

      <SearchWithDelay
        {...{
          initialSearchText: "Search vehicles",
          timeInMs: 500,
          setState: setSearchText,
        }}
      />

      <DataTable {...{ countPerPage: 10, searchText: searchText }} />
    </div>
  );
};

export default SearchVehicles;

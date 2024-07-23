import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
 
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [inputValue, setInputValue] = useState(""); // Manage input value
 
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };
 
  const handleOnChange = (selectedOption) => {
    setSearch(selectedOption);
  };
 
  const handleSearch = () => {
    if (search) {
      onSearchChange(search);
    }
  };
 //const buttonStyle={
 // backgroundColor: "blue";
  //color:"white";
  //fontSize: "16px";
 // borderRadius:"5px";
//}
  return (
  
    <div className="search-container">
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        onInputChange={(value) => setInputValue(value)} // Update input value
      />
      <button onClick={handleSearch}>Fetch Weather</button>
    </div>
  );
};
 
export default Search;
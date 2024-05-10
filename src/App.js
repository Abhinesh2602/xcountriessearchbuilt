import { useEffect, useState } from "react";
import "./App.css";

const URL = "https://restcountries.com/v3.1/all";

function Country({ countryName, flag, alt }) {
  return (
    <div className="countryCard">
      <div>
        <img className="flag" src={flag} alt={alt} />
      </div>
      <div className="countryName">{countryName}</div>
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const loadCountries = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Failed to fetch countries");
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const filterCountries = (value, countries) => {
    const searched = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(searched);
  };

  useEffect(() => {
    filterCountries(value, countries);
  }, [value, countries]);

  return (
    <div className="container">
      <div>
        <input
          className="search"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="mapContainer">
        {filteredCountries.map((country) => (
          <Country
            countryName={country.name.common}
            flag={country.flags.png}
            alt={country.flags.alt}
            key={country.cca2}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

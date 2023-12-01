import { useState } from "react";
import "./App.css";
import { Country } from "./date.type";
import CountrySelector from "./components/CountrySelector";

const countries: Country[] = [
  {
    id: "0",
    name: "Germany",
    isSelected: true,
  },
  {
    id: "1",
    name: "France",
    isSelected: false,
  },
  {
    id: "2",
    name: "Spain",
    isSelected: false,
  },
];

function App() {
  const [isAllSelected, setIsAllSelected] = useState(false);

  return (
    <>
      <form className="select-countries-form">
        <label htmlFor="all">
          <input
            type="checkbox"
            id="all"
            name="all"
            checked={isAllSelected}
            readOnly
          />
          All
        </label>
        <div className="container">
          {countries.map((country) => {
            return <CountrySelector country={country} key={country.id} />;
          })}
        </div>
      </form>
      <form className="add-country-form">
        <label htmlFor="all">
          New country
          <input type="text" id="newCountry" name="newCountry" />
        </label>
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default App;

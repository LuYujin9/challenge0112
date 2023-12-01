import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Country } from "./date.type";
import CountrySelector from "./components/CountrySelector";

const initialCountries: Country[] = [
  {
    id: "0",
    name: "Germany",
    isSelected: false,
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
  const [countries, setCountries] = useState(initialCountries);
  const [newCountry, setNewCountry] = useState("");

  /* <-- another solution of changing the situation of all Countries checkbox -->*/
  /*   useEffect(() => {
    for (let index = 0; index < countries.length; index++) {
      if (countries[index].isSelected === false) {
        setIsAllSelected(false);
        return;
      }
    }
    setIsAllSelected(true);
  }, [countries]); */

  useEffect(() => {
    const unSelectedCountry = countries.find(
      (country) => country.isSelected === false
    );
    setIsAllSelected(unSelectedCountry ? false : true);
  }, [countries]);

  function toggleAllSelected() {
    if (isAllSelected === false) {
      const updatedCountries = countries.map((country) => {
        if (country.isSelected === false) {
          return { ...country, isSelected: true };
        }
        return country;
      });
      setCountries(updatedCountries);
    } else {
      const updatedCountries = countries.map((country) => {
        return { ...country, isSelected: false };
      });
      setCountries(updatedCountries);
    }
  }

  function updateSelected(id: string, isSelected: boolean) {
    const updatedCountries = countries.map((country) => {
      if (country.id === id) {
        return { ...country, isSelected: !isSelected };
      } else return country;
    });
    setCountries(updatedCountries);
  }

  function addNewCountry(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const newCountryName = newCountry;
    if (newCountryName) {
      const id = countries.length.toString();
      const isSelected = isAllSelected ? true : false;
      const newCountry = {
        id: id,
        name: newCountryName,
        isSelected: isSelected,
      };
      setCountries([...countries, newCountry]);
      setNewCountry("");
    }
  }

  return (
    <>
      <form className="select-countries-form">
        <label htmlFor="all">
          <input
            type="checkbox"
            id="all"
            name="all"
            checked={isAllSelected}
            onChange={toggleAllSelected}
          />
          All
        </label>
        <div className="container">
          {countries.map((country) => {
            return (
              <CountrySelector
                country={country}
                key={country.id}
                updateSelected={updateSelected}
              />
            );
          })}
        </div>
      </form>
      <form
        className="add-country-form"
        onSubmit={(event) => addNewCountry(event)}
      >
        <label htmlFor="all">
          New country
          <input
            type="text"
            id="newCountry"
            name="newCountry"
            value={newCountry}
            onChange={(event) => {
              setNewCountry(event.target.value);
            }}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default App;

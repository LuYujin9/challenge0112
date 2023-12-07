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
  /**
   * TODO: Try to not maintain this as a separate state.
   * the information wether the all checkbox is selected or not can be completely
   * derived from the information about which countries are currently selected and which are not.
   */
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

  /**
   * TODO: if you remove the isAllSelected state, then this effect won't be necessary anymore
   */
  useEffect(() => {
    /**
     * INFO: you don't really care about the unselected country, you just care about
     * wether any country exists, that is not selected. the countries.some method better reflects
     * this intent
     */
    const unSelectedCountry = countries.find(
      /**
       * INFO: instead of checking if isSelected === false, you coult just return !country.isSelected
       */
      (country) => country.isSelected === false
    );
    setIsAllSelected(unSelectedCountry ? false : true);
  }, [countries]);

  function toggleAllSelected() {
    if (isAllSelected === false) {
      /**
       * TODO: This needs to be adjusted, once countries no longer have the field "isSelected"
       */
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

  /**
   * LIKE: Very nice that you used a proper form for this input to allow pressing
   * enter to add the country!
   */
  function addNewCountry(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const newCountryName = newCountry;

    /**
     * TODO: instead of wrapping 9 lines of code in an if clause, you can just do an early return:
     * if (!newCountryName) return;
     * 
     * This way, the code after that return is no longer indented. Indentation always mean that we need to remember
     * some context/scope for these lines of code, so we always try to keep indentations low
     */
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
        /**
         * TODO: Instead of passing a new function, that just passes the argument to another function,
         * you could just do:
         * onSubmit={addNewCountry}
         */
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

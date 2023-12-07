import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { Country } from "./date.type";
import CountrySelector from "./components/CountrySelector";

const initialCountries: Country[] = [
  {
    id: "0",
    name: "Germany",
  },
  {
    id: "1",
    name: "France",
  },
  {
    id: "2",
    name: "Spain",
  },
];

function App() {
  /**
   * TODO: Try to not maintain this as a separate state.
   * the information wether the all checkbox is selected or not can be completely
   * derived from the information about which countries are currently selected and which are not.
   */
  /**
   * UPDATE: Replace the state 'isAllSelected' with 'selectedCountries'.
   */
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countries, setCountries] = useState(initialCountries);
  /**
   * UPDATE: Changed the name of this state so it is not confused with countries.
   */
  const [newCountryName, setNewCountryName] = useState("");

  /**
   * TODO: if you remove the isAllSelected state, then this effect won't be necessary anymore
   */
  /**
   * UPDATE: Deleted the effect
   */

  /**
   * TODO: This needs to be adjusted, once countries no longer have the field "isSelected"
   */
  /**
   * UPDATE: Updated the function toggleAllSelected
   */
  function toggleAllSelected() {
    if (selectedCountries.length === countries.length) {
      setSelectedCountries([]);
      return;
    }
    const allCountries = countries.map((country) => country.id);
    setSelectedCountries(allCountries);
  }

  /**
   * UPDATE: Updated the function updateSelected
   */
  function updateSelected(id: string, event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setSelectedCountries([...selectedCountries, id]);
      return;
    }
    setSelectedCountries(selectedCountries.filter((value) => value !== id));
  }

  /**
   * LIKE: Very nice that you used a proper form for this input to allow pressing
   * enter to add the country!
   */
  function addNewCountry(event: FormEvent) {
    event?.preventDefault();
    /**
     * TODO: instead of wrapping 9 lines of code in an if clause, you can just do an early return:
     * if (!newCountryName) return;
     *
     * This way, the code after that return is no longer indented. Indentation always mean that we need to remember
     * some context/scope for these lines of code, so we always try to keep indentations low
     */
    /**
     * UPDATE: changed the way to use 'if'
     */
    if (!newCountryName) return;
    const id = countries.length.toString();
    const newCountry = {
      id: id,
      name: newCountryName,
    };
    setCountries([...countries, newCountry]);
    setNewCountryName("");

    if (selectedCountries.length === countries.length)
      setSelectedCountries([...selectedCountries, id]);
  }

  return (
    <>
      <form className="select-countries-form">
        <label htmlFor="all">
          <input
            type="checkbox"
            id="all"
            name="all"
            checked={selectedCountries.length === countries.length}
            onChange={toggleAllSelected}
          />
          All
        </label>
        <div className="container">
          {countries.map((country) => {
            return (
              <CountrySelector
                country={country}
                selectedCountries={selectedCountries}
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
        /**
         * UPDATE: Deleted the arrow function.
         * After I sended the link to you, I also noticed that, the function addNewCountry is in the same file.
         * I don't need to pass an arrow function for it.
         */
        onSubmit={addNewCountry}
      >
        <label htmlFor="all">
          New country
          <input
            type="text"
            id="newCountryName"
            name="newCountryName"
            value={newCountryName}
            onChange={(event) => {
              setNewCountryName(event.target.value);
            }}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default App;

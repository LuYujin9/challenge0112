import { ChangeEvent } from "react";
import { Country } from "../date.type";

type Props = {
  country: Country;
  selectedCountries: string[];
  updateSelected: (id: string, event: ChangeEvent<HTMLInputElement>) => void;
};

export default function CountrySelector({
  country,
  selectedCountries,
  updateSelected,
}: Props) {
  return (
    <label htmlFor={country.id}>
      <input
        type="checkbox"
        id={country.id}
        name={country.name}
        checked={selectedCountries.includes(country.id)}
        onChange={(event) => updateSelected(country.id, event)}
      />
      {country.name}
    </label>
  );
}

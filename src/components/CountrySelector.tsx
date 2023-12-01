import { Country } from "../date.type";

type Props = {
  country: Country;
  updateSelected: (id: string, isSelected: boolean) => void;
};

export default function CountrySelector({ country, updateSelected }: Props) {
  return (
    <label htmlFor={country.id}>
      <input
        type="checkbox"
        id={country.id}
        name={country.name}
        checked={country.isSelected}
        onChange={() => {
          updateSelected(country.id, country.isSelected);
        }}
      />
      {country.name}
    </label>
  );
}

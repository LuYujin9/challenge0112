import { Country } from "../date.type";

type Props = {
  country: Country;
};

export default function CountrySelector({ country }: Props) {
  return (
    <label htmlFor={country.id}>
      <input
        type="checkbox"
        id={country.id}
        name={country.name}
        checked={country.isSelected}
        readOnly
      />
      {country.name}
    </label>
  );
}

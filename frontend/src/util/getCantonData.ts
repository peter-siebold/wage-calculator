interface City {
  city: string;
  canton: string;
  postalCodes: string[];
}

const cities: City[] = [
  {
    city: "Zurich",
    canton: "Zurich",
    postalCodes: ["8000-8099", "8100-8199", "8800-8899"],
  },
  { city: "Geneva", canton: "Geneva", postalCodes: ["1200-1299"] },
  { city: "Basel", canton: "Basel-Stadt", postalCodes: ["4000-4099"] },
  { city: "Lausanne", canton: "Vaud", postalCodes: ["1000-1099"] },
  { city: "Bern", canton: "Bern", postalCodes: ["3000-3099"] },
  { city: "Winterthur", canton: "Zurich", postalCodes: ["8400-8499"] },
  { city: "Lucerne", canton: "Lucerne", postalCodes: ["6000-6099"] },
  { city: "St. Gallen", canton: "St. Gallen", postalCodes: ["9000-9099"] },
  { city: "Lugano", canton: "Ticino", postalCodes: ["6900-6999"] },
  { city: "Biel/Bienne", canton: "Bern", postalCodes: ["2500-2599"] },
];

export const getCantonByInput = (input: string): string | null => {
  const normalizedInput = input.trim().toLowerCase();

  // Check if the input is a city name
  const cityMatch = cities.find(
    (city) => city.city.toLowerCase() === normalizedInput
  );
  if (cityMatch) {
    return cityMatch.canton;
  }

  // Check if the input is a postal code
  for (const city of cities) {
    for (const range of city.postalCodes) {
      const [start, end] = range.split("-").map(Number);
      const postalCode = Number(normalizedInput);
      if (postalCode >= start && postalCode <= end) {
        return city.canton;
      }
    }
  }

  // Return null if no match is found
  return null;
};

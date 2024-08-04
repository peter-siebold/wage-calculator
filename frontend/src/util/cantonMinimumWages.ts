interface CantonMinimumWage {
  canton: string;
  minimumWage: number; // in Swiss Francs (CHF)
}

const cantonMinimumWages: CantonMinimumWage[] = [
  { canton: "Zurich", minimumWage: 4349 },
  { canton: "Geneva", minimumWage: 4426 },
  { canton: "Basel-Stadt", minimumWage: 3949 },
  { canton: "Vaud", minimumWage: 3900 },
  { canton: "Bern", minimumWage: 3800 },
  { canton: "Lucerne", minimumWage: 3700 },
  { canton: "St. Gallen", minimumWage: 3600 },
  { canton: "Ticino", minimumWage: 3549 },
  { canton: "Aargau", minimumWage: 3750 },
  { canton: "Appenzell Innerrhoden", minimumWage: 3400 },
  { canton: "Appenzell Ausserrhoden", minimumWage: 3450 },
  { canton: "Basel-Landschaft", minimumWage: 3850 },
  { canton: "Fribourg", minimumWage: 3650 },
  { canton: "Glarus", minimumWage: 3550 },
  { canton: "Graubünden", minimumWage: 3450 },
  { canton: "Jura", minimumWage: 3749 },
  { canton: "Neuchâtel", minimumWage: 3838 },
  { canton: "Nidwalden", minimumWage: 3500 },
  { canton: "Obwalden", minimumWage: 3400 },
  { canton: "Schaffhausen", minimumWage: 3750 },
  { canton: "Schwyz", minimumWage: 3800 },
  { canton: "Solothurn", minimumWage: 3700 },
  { canton: "Thurgau", minimumWage: 3600 },
  { canton: "Uri", minimumWage: 3300 },
  { canton: "Valais", minimumWage: 3500 },
  { canton: "Zug", minimumWage: 4349 },
];
// TODO This should be fetched from the server
// const SERVER_URL = "http://localhost:4000";
export const getMinimumWageByCanton = async (
  canton: string
): Promise<number | null> => {
  //  in dev mode, return mock data, otherwise fetch from server

  //   if (process.env.NODE_ENV === "development") {
  const minimumWage = cantonMinimumWages.find(
    (cantonMinimumWage) => cantonMinimumWage.canton === canton
  );
  const wage = minimumWage ? minimumWage.minimumWage : null;
  return Promise.resolve(wage);
  //   }

  //   const response = await fetch(`${SERVER_URL}/api/canton/${canton}`);
  //   const data = (await response.json()) as Promise<CantonMinimumWage[]>;
  //   const minimumWage = (await data).find(
  //     (cantonMinimumWage: CantonMinimumWage) =>
  //       cantonMinimumWage.canton === canton
  //   );
  //   const result = minimumWage ? minimumWage.minimumWage : null;
  //   return Promise.resolve(result);
};

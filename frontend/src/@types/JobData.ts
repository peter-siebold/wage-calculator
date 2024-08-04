export interface Job {
  id: string;
  title: string;
  profileShort: string;
  baseSalary: number;
  earliestStartDate: string;
  location: string;
  zipCode: string;
}

export type Jobs = Job[];

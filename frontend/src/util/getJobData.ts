import { Job } from "../@types/JobData";

const jobData: Job[] = [
  {
    id: "1",
    title: "Software Developer",
    profileShort: "Software Developer, Full Stack, Intermediate",
    baseSalary: 3950,
    earliestStartDate: "2024-07-01",
    location: "Zurich",
    zipCode: "8000",
  },
  {
    id: "2",
    title: "Software Architect",
    profileShort: "Software Architect, Full Stack, Senior",
    baseSalary: 4595,
    earliestStartDate: "2024-10-01",
    location: "Zurich",
    zipCode: "8000",
  },
  {
    id: "3",
    title: "Software Tester",
    profileShort: "Software Tester, Full Stack, Junior",
    baseSalary: 3700,
    earliestStartDate: "2024-08-01",
    location: "Lucerne",
    zipCode: "6000",
  },
  {
    id: "4",
    title: "Project Manager",
    profileShort: "Project Manager, Senior",
    baseSalary: 4800,
    earliestStartDate: "2024-08-01",
    location: "Bern",
    zipCode: "3000",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    profileShort: "DevOps Engineer, Intermediate",
    baseSalary: 4126,
    earliestStartDate: "2025-01-01",
    location: "Geneva",
    zipCode: "1200",
  },
  {
    id: "6",
    title: "Team Leader",
    profileShort: "Team Leader",
    baseSalary: 3700,
    earliestStartDate: "2024-09-01",
    location: "Bern",
    zipCode: "3000",
  },
  {
    id: "7",
    title: "Scrum Master",
    profileShort: "Scrum Master, certified",
    baseSalary: 4200,
    earliestStartDate: "2024-09-14",
    location: "Winterthur",
    zipCode: "8400",
  },
];

// const SERVER_URL = "http://localhost:4000";

export const getJobData = async (): Promise<Job[]> => {
  //  if dev mode, return mock data, else fetch from server
  //   if (process.env.NODE_ENV === "development") {
  return Promise.resolve(jobData);
  //   }

  //   const response = await fetch(`${SERVER_URL}/api`);
  //   return response.json() as Promise<Job[]>;
};

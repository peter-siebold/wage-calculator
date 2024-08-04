import {
  Box,
  Divider,
  ListItemButton,
  Typography,
  List,
  ListItemText,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Job, Jobs } from "../@types/JobData";
import { SelectedCandidateSummary } from "../components/SelectedCandidateSummary";
import { useWizardContext } from "../contexts/WizardContextProvider";
import { getJobData } from "../util/getJobData";

const SelectJobDescription: React.FC = () => {
  const [jobEntries, setJobEntries] = useState<Jobs>([]);
  const { nextStep, handleAddJobData } = useWizardContext();
  const [loading, setLoading] = useState(true);

  const { handleSubmit, control, setValue } = useForm<Job>({
    defaultValues: {
      id: "",
      title: "",
      profileShort: "",
      baseSalary: 0.0,
      earliestStartDate: new Date().toISOString(),
    },
  });

  const onSubmit = (data: Job) => {
    handleAddJobData(data);
    nextStep();
  };

  const handleItemClick = (job: Job) => {
    setValue("id", job.id);
    setValue("title", job.title);
    setValue("profileShort", job.profileShort);
    setValue("baseSalary", job.baseSalary);

    void handleSubmit(onSubmit)();
  };

  useEffect(() => {
    void getJobData().then((data) => {
      setJobEntries(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          marginBottom: 4,
        }}
      >
        <SelectedCandidateSummary />
      </Box>
      <Box>
        <Typography variant="body1" gutterBottom>
          2. Select Job Description
        </Typography>
      </Box>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <List>
            {jobEntries.map((job) => (
              <Fragment key={job.id}>
                <ListItemButton
                  sx={{
                    cursor: "pointer",
                    margin: 1,
                    padding: 1,
                    borderRadius: 1,
                  }}
                  onClick={() => {
                    handleItemClick(job);
                  }}
                >
                  <ListItemText
                    primary={job.title}
                    secondary={job.profileShort}
                  />
                </ListItemButton>
                {job.id !== jobEntries[jobEntries.length - 1].id && (
                  <Divider component="li" aria-hidden="true" />
                )}
              </Fragment>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export { SelectJobDescription };

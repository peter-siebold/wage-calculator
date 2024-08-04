import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

import { Job } from "../@types/JobData";

import type { PropsWithChildren, JSX, FunctionComponent } from "react";

interface WizardContextType {
  minStep: number;
  maxStep: number;
  currentStep: number;
  formData: {
    startDate: string;
    location: string;
    birthDate: string;
    position: Job;
  };
  setFormData: (data: {
    startDate: string;
    location: string;
    birthDate: string;
    position: Job;
  }) => void;
  nextStep: () => void;
  prevStep: () => void;
  restart: () => void;
  handleAddFormData: (data: Partial<AppState>) => void;
  handleAddJobData: (data: Job) => void;
  goToStep: (step: number) => void;
  initializeWizard: (steps: number) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const useWizardContext = (): WizardContextType => {
  const context = useContext(WizardContext);
  if (typeof context === "undefined") {
    throw new Error("useWizardContext must be used inside the WizardProvider");
  }
  return context;
};

interface AppState {
  startDate: string;
  location: string;
  birthDate: string;
  position: Job;
}

export const WizardContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [numberOfSteps, setNumberOfSteps] = useState(4);
  const [minStep, setMinStep] = useState(1);
  const [maxStep, setMaxStep] = useState(numberOfSteps);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AppState>({
    startDate: "",
    location: "",
    birthDate: "",
    position: {
      id: "",
      title: "",
      profileShort: "",
      baseSalary: 0,
      earliestStartDate: "",
      location: "",
      zipCode: "",
    },
  });

  const handleAddFormData = useCallback(
    (data: Partial<AppState>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    [setFormData]
  );

  const handleAddJobData = useCallback(
    (data: Job) => {
      setFormData((prev) => ({ ...prev, position: data }));
    },
    [setFormData]
  );

  const initializeWizard = useCallback((steps: number) => {
    setNumberOfSteps(steps);
    setMaxStep(steps);
    setMinStep(1);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < maxStep) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, maxStep]);

  const prevStep = useCallback(() => {
    if (currentStep > minStep) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep, minStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= minStep && step <= maxStep) {
        setCurrentStep(step);
      }
    },
    [minStep, maxStep]
  );

  const restart = useCallback(() => {
    setFormData({
      startDate: "",
      location: "",
      birthDate: "",
      position: {
        id: "",
        title: "",
        profileShort: "",
        baseSalary: 0,
        earliestStartDate: "",
        location: "",
        zipCode: "",
      },
    });
    setCurrentStep(1);
  }, []);

  const value = useMemo(() => {
    return {
      minStep,
      maxStep,
      currentStep,
      formData,
      setFormData,
      nextStep,
      prevStep,
      restart,
      handleAddFormData,
      handleAddJobData,
      goToStep,
      initializeWizard,
    };
  }, [
    currentStep,
    formData,
    nextStep,
    prevStep,
    restart,
    handleAddFormData,
    handleAddJobData,
    goToStep,
    initializeWizard,
  ]);

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};

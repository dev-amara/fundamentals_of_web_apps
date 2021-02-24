import diagnoses from "../data/diagnoses";
import { Diagnosis } from "../tools/types";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};

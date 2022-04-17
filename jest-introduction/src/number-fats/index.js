import { getRandomNumberFactService } from "./services";

export const getRandomNumberFact = async () => {
  const randomNumberFact = await getRandomNumberFactService();
  return randomNumberFact;
};

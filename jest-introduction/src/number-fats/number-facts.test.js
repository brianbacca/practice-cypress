import { getRandomNumberFact } from ".";
import { getRandomNumberFactService } from "./services";

jest.mock("./services");

beforeEach(() => {
  getRandomNumberFactService.mockClear();
});

test("should return a random number fact", async () => {
  getRandomNumberFactService.mockReturnValueOnce({
    text: "346 is the year that Julius Firmicus Maternus writes De erroribus profanarum religionum.",
  });
  const randomNumberFact = await getRandomNumberFact();
  const text = randomNumberFact.text;

  expect(text).toBe(
    "346 is the year that Julius Firmicus Maternus writes De erroribus profanarum religionum."
  );
  expect(getRandomNumberFactService).toHaveBeenCalledTimes(1);
});

test("should return an error when the service throws an exception", async () => {
  getRandomNumberFactService.mockReturnValueOnce(new Error("Upss"));
  const randomNumberFact = await getRandomNumberFact();

  expect(randomNumberFact).toBeInstanceOf(Error);
  expect(getRandomNumberFactService).toHaveBeenCalledTimes(1);
});

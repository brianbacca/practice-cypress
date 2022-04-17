import { calculator } from "./index";

test("sum calculator", () => {
  const result = calculator.sum(1, 2);
  expect(result).toBe(3);
});
test("subtractio calculator", () => {
  const result = calculator.subtract(1, 2);
  expect(result).toBe(-1);
});
test("multiply calculator", () => {
  const result = calculator.multiply(1, 2);
  expect(result).toBe(2);
});
test("divide calculator", () => {
  const result = calculator.divide(1, 2);
  expect(result).toBe(0.5);
});

beforeAll(() => {
  console.log("Antes de todas"); // 1
});

beforeEach(() => {
  console.log("Antes de cada una"); // 2 // 5
});

afterEach(() => {
  console.log("Después de cada una"); // 4 // 7
});

afterAll(() => {
  console.log("Después de todas"); // 8
});

test("first test", () => {
  console.log("primera prueba"); // 3
  expect(true).toBe(true);
});

test("second test", () => {
  console.log("segunda prueba"); // 6
  expect(true).toBe(true);
});

import { getRandomNumberFactService } from ".";
const axios = require("axios");

jest.mock("axios");
test("should return a valid response", async () => {
  const response = axios.mockResolvedValueOnce({
    data: {
      text: "346 is the year that Julius Firmicus Maternus writes De erroribus profanarum religionum.",
    },
  });
  console.log(response);
  response.data.mockReturnValueOnce({
    data: {
      text: "346 is the year that Julius Firmicus Maternus writes De erroribus profanarum religionum.",
    },
  });
  const res = await getRandomNumberFactService();
  expect(res.text).toBe("test pass");
});

import { calculateUsage } from "../libs/usage-lib";

test("calculateUsage", () => {
  const currentLogSize = 10;
  const logUsage = 1024;
  const cost = 1034;
  const expectedCost = calculateUsage(currentLogSize, logUsage);

  expect(cost).toEqual(expectedCost);
});

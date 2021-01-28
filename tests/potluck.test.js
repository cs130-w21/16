import React from "react";
import renderer from "react-test-renderer";
import TestComponent from "../app/components/testComponent.js";

console.error = jest.fn(() => console.log("error received - ignoring"));
const sum = (a, b) => a + b;

test("adds 1 + 2 to equal 3 - sanity check", () => {
  expect(sum(1, 2)).toBe(3);
});

it("renders menu card", () => {
  const tree = renderer.create(<TestComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

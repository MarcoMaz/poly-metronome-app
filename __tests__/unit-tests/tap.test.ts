import { htmlPage } from "./setup";

import { TAP_CHIP_SELECTOR } from "../../app/classes/base/constants";

describe("Tap", () => {
  it("should exists", () => {
    const tap = htmlPage.querySelector(TAP_CHIP_SELECTOR);
    expect(tap).toBeTruthy();
  });

  it("is a BUTTON element", () => {
    const tap = htmlPage.querySelector(TAP_CHIP_SELECTOR);
    expect(tap.tagName).toBe("BUTTON");
  });

  it("should have the correct label", () => {
    const tap = htmlPage.querySelector(TAP_CHIP_SELECTOR);
    expect(tap.textContent.trim()).toBe("Tap");
  });
});


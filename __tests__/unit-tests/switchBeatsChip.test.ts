import { htmlPage } from "./setup";

import {
  SWITCH_BEATS_CHIP_SELECTOR
} from "../../app/classes/base/constants";

describe("SwitchBeats chip", () => {
  it("should exists", () => {
    const switchBeats = htmlPage.querySelector(SWITCH_BEATS_CHIP_SELECTOR);
    expect(switchBeats).toBeTruthy();
  });
  it("is a BUTTON element", () => {
    const switchBeats = htmlPage.querySelector(SWITCH_BEATS_CHIP_SELECTOR);
    expect(switchBeats.tagName).toBe("BUTTON");
  });
  it("should have the correct label", () => {
    const switchBeats = htmlPage.querySelector(SWITCH_BEATS_CHIP_SELECTOR);
    expect(switchBeats.textContent.trim()).toBe("SWITCH BEATS");
  });
});


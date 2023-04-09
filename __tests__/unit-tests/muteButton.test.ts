import { htmlPage } from "./setup";

import { MUTE_BUTTON_SELECTOR } from "../../app/classes/base/constants";

describe("MuteButton", () => {
  it("should exists", () => {
    const muteButton = htmlPage.querySelector(MUTE_BUTTON_SELECTOR);
    expect(muteButton).toBeTruthy();
  });

  it("is a BUTTON element", () => {
    const muteButton = htmlPage.querySelector(MUTE_BUTTON_SELECTOR);
    expect(muteButton.tagName).toBe("BUTTON");
  });

  it("should contain a text", () => {
    const muteButton = htmlPage.querySelector(MUTE_BUTTON_SELECTOR);
    expect(muteButton.textContent.trim()).toBe("Sound:");
  });
});

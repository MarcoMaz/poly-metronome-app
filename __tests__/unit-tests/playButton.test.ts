import { htmlPage } from "./setup";

import {
  PLAY_BUTTON_SELECTOR,
  PLAY_ICON_PLAY_SELECTOR,
  PLAY_ICON_STOP_SELECTOR,
} from "../../app/classes/base/constants";

describe("PlayButton", () => {
  it("should exists", () => {
    const playButton = htmlPage.querySelector(PLAY_BUTTON_SELECTOR);
    expect(playButton).toBeTruthy();
  });

  it("is a BUTTON element", () => {
    const playButton = htmlPage.querySelector(PLAY_BUTTON_SELECTOR);
    expect(playButton.tagName).toBe("BUTTON");
  });

  it("contains 2 children", () => {
    const playButton = htmlPage.querySelector(PLAY_BUTTON_SELECTOR);
    expect(playButton.children.length).toBe(2);
  });

  describe("Icon Play", () => {
    it("should exists", () => {
      const playIcon = htmlPage.querySelector(PLAY_ICON_PLAY_SELECTOR);
      expect(playIcon).toBeTruthy();
    });

    it("is a IMG element", () => {
      const playIcon = htmlPage.querySelector(PLAY_ICON_PLAY_SELECTOR);
      expect(playIcon.tagName).toBe("IMG");
    });
  });

  describe("Icon Stop", () => {
    it("should exists", () => {
      const stopIcon = htmlPage.querySelector(PLAY_ICON_STOP_SELECTOR);
      expect(stopIcon).toBeTruthy();
    });

    it("is a IMG element", () => {
      const stopIcon = htmlPage.querySelector(PLAY_ICON_STOP_SELECTOR);
      expect(stopIcon.tagName).toBe("IMG");
    });
  });
});

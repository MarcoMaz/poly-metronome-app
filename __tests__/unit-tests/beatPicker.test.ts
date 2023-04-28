import { htmlPage } from "./setup";

import {
  BEAT_PICKERS_CONTAINER_SELECTOR,
  AGAINST_BEAT_PICKER_SELECTOR,
  BASE_BEAT_PICKER_SELECTOR,
  AGAINST_BEAT_PICKER_BEATS_SELECTOR,
  BASE_BEAT_PICKER_BEATS_SELECTOR,
  BEAT_PICKER_DOTS_SELECTOR,
} from "../../app/classes/base/constants";

describe("BeatPickers", () => {
  it("should exists", () => {
    const beatPickers = htmlPage.querySelector(BEAT_PICKERS_CONTAINER_SELECTOR);
    expect(beatPickers).toBeTruthy();
  });

  it("contains 3 children", () => {
    const beatPickers = htmlPage.querySelector(BEAT_PICKERS_CONTAINER_SELECTOR);
    expect(beatPickers.children.length).toBe(3);
  });

  describe("AgainstBeatPicker", () => {
    it("should exists", () => {
      const againstBeatPicker = htmlPage.querySelector(
        AGAINST_BEAT_PICKER_SELECTOR
      );
      expect(againstBeatPicker).toBeTruthy();
    });

    it("contains 1 child", () => {
      const againstBeatPicker = htmlPage.querySelector(
        AGAINST_BEAT_PICKER_SELECTOR
      );
      expect(againstBeatPicker.children.length).toBe(1);
    });

    describe("BeatPickerBeats", () => {
      const beatPickerBeats = htmlPage.querySelector(
        AGAINST_BEAT_PICKER_BEATS_SELECTOR
      );

      expect(beatPickerBeats).toBeTruthy();
    });
  });

  describe("BeatsPickerDots", () => {
    it("should exists", () => {
      const beatsPickerDots = htmlPage.querySelector(BEAT_PICKER_DOTS_SELECTOR);
      expect(beatsPickerDots).toBeTruthy();
    });
  });

  describe("BaseBeatPicker", () => {
    it("should exists", () => {
      const baseBeatPicker = htmlPage.querySelector(BASE_BEAT_PICKER_SELECTOR);
      expect(baseBeatPicker).toBeTruthy();
    });

    it("contains 1 child", () => {
      const baseBeatPicker = htmlPage.querySelector(BASE_BEAT_PICKER_SELECTOR);
      expect(baseBeatPicker.children.length).toBe(1);
    });

    describe("BeatPickerBeats", () => {
      const beatPickerBeats = htmlPage.querySelector(
        BASE_BEAT_PICKER_BEATS_SELECTOR
      );

      expect(beatPickerBeats).toBeTruthy();
    });
  });
});

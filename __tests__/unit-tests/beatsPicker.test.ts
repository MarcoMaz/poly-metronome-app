import { htmlPage } from "./setup";

const BEATS_PICKER_CONTAINER_SELECTOR = ".beatsPickers-container";
const BEATS_PICKER_AGAINST_BEAT_SELECTOR =
  ".beatPicker.beatPicker--againstBeat";
const BEATS_PICKER_BASE_BEAT_SELECTOR = ".beatPicker.beatPicker--baseBeat";
const BEAT_PICKER_BEATS_SELECTOR = ".beatPicker__beats";
const BEATS_PICKER_AGAINST_BEAT_BEATS_SELECTOR = `${BEATS_PICKER_AGAINST_BEAT_SELECTOR} ${BEAT_PICKER_BEATS_SELECTOR}`;
const BEATS_PICKER_BASE_BEAT_BEATS_SELECTOR = `${BEATS_PICKER_BASE_BEAT_SELECTOR} ${BEAT_PICKER_BEATS_SELECTOR}`;
const BEATS_PICKER_DOTS_SELECTOR = ".beatPicker__dots";

describe("BeatsPicker", () => {
  it("should exists", () => {
    const beatsPicker = htmlPage.querySelector(BEATS_PICKER_CONTAINER_SELECTOR);
    expect(beatsPicker).toBeTruthy();
  });

  it("contains 3 children", () => {
    const beatsPicker = htmlPage.querySelector(BEATS_PICKER_CONTAINER_SELECTOR);
    expect(beatsPicker.children.length).toBe(3);
  });

  describe("BeatsPickerAgainstBeat", () => {
    it("should exists", () => {
      const beatsPickerAgainstBeat = htmlPage.querySelector(
        BEATS_PICKER_AGAINST_BEAT_SELECTOR
      );
      expect(beatsPickerAgainstBeat).toBeTruthy();
    });

    it("contains 1 child", () => {
      const beatsPickerAgainstBeat = htmlPage.querySelector(
        BEATS_PICKER_AGAINST_BEAT_SELECTOR
      );
      expect(beatsPickerAgainstBeat.children.length).toBe(1);
    });

    describe("BeatPickerBeats", () => {
      const beatPickerBeats = htmlPage.querySelector(
        BEATS_PICKER_AGAINST_BEAT_BEATS_SELECTOR
      );

      expect(beatPickerBeats).toBeTruthy();
    });
  });

  describe("BeatsPickerDots", () => {
    it("should exists", () => {
      const beatsPickerDots = htmlPage.querySelector(
        BEATS_PICKER_DOTS_SELECTOR
      );
      expect(beatsPickerDots).toBeTruthy();
    });
  });

  describe("BeatsPickerAgainstBeat", () => {
    it("should exists", () => {
      const beatsPickerBaseBeat = htmlPage.querySelector(
        BEATS_PICKER_BASE_BEAT_SELECTOR
      );
      expect(beatsPickerBaseBeat).toBeTruthy();
    });

    it("contains 1 child", () => {
      const beatsPickerBaseBeat = htmlPage.querySelector(
        BEATS_PICKER_BASE_BEAT_SELECTOR
      );
      expect(beatsPickerBaseBeat.children.length).toBe(1);
    });

    describe("BeatPickerBeats", () => {
      const beatPickerBeats = htmlPage.querySelector(
        BEATS_PICKER_BASE_BEAT_BEATS_SELECTOR
      );

      expect(beatPickerBeats).toBeTruthy();
    });
  });
});

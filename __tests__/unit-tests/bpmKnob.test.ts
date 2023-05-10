import { htmlPage } from "./setup";

import {
  BPM_KNOB_CONTAINER_SELECTOR,
  BPM_KNOB_SELECTOR,
  BPM_KNOB_INNER_TRACK_SELECTOR,
  BPM_KNOB_BALL_SELECTOR,
  BPM_KNOB_RANGE_SELECTOR,
  BPM_KNOB_LABEL_SELECTOR,
  BPM_KNOB_TEXT_SELECTOR,
} from "../../app/classes/base/constants";

describe("BpmKnob container", () => {
  it("should exists", () => {
    const bpmKnobContainer = htmlPage.querySelector(
      BPM_KNOB_CONTAINER_SELECTOR
    );
    expect(bpmKnobContainer).toBeTruthy();
  });
  it("is a DIV element", () => {
    const bpmKnobContainer = htmlPage.querySelector(
      BPM_KNOB_CONTAINER_SELECTOR
    );
    expect(bpmKnobContainer.tagName).toBe("DIV");
  });
  describe("BpmKnob", () => {
    it("should exists", () => {
      const bpmKnob = htmlPage.querySelector(BPM_KNOB_SELECTOR);
      expect(bpmKnob).toBeTruthy();
    });
    it("is a DIV element", () => {
      const bpmKnob = htmlPage.querySelector(BPM_KNOB_SELECTOR);
      expect(bpmKnob.tagName).toBe("DIV");
    });
    it("contains 5 children", () => {
      const bpmKnob = htmlPage.querySelector(BPM_KNOB_SELECTOR);
      expect(bpmKnob.children.length).toBe(5);
    });
    describe("BpmKnobTrack", () => {
      it("should exists", () => {
        const bpmKnobTrack = htmlPage.querySelector(
          BPM_KNOB_INNER_TRACK_SELECTOR
        );
        expect(bpmKnobTrack).toBeTruthy();
      });
      it("is a DIV element", () => {
        const bpmKnobTrack = htmlPage.querySelector(
          BPM_KNOB_INNER_TRACK_SELECTOR
        );
        expect(bpmKnobTrack.tagName).toBe("DIV");
      });
    });
    describe("BpmKnobBall", () => {
      it("should exists", () => {
        const bpmKnobBall = htmlPage.querySelector(BPM_KNOB_BALL_SELECTOR);
        expect(bpmKnobBall).toBeTruthy();
      });
      it("is a DIV element", () => {
        const bpmKnobBall = htmlPage.querySelector(BPM_KNOB_BALL_SELECTOR);
        expect(bpmKnobBall.tagName).toBe("DIV");
      });
    });
    describe("BpmKnobRange", () => {
      it("should exists", () => {
        const bpmKnobRange = htmlPage.querySelector(BPM_KNOB_RANGE_SELECTOR);
        expect(bpmKnobRange).toBeTruthy();
      });
      it("is a INPUT element", () => {
        const bpmKnobRange = htmlPage.querySelector(BPM_KNOB_RANGE_SELECTOR);
        expect(bpmKnobRange.tagName).toBe("INPUT");
      });
    });
    describe("BpmKnobLabel", () => {
      it("should exists", () => {
        const bpmKnobLabel = htmlPage.querySelector(BPM_KNOB_LABEL_SELECTOR);
        expect(bpmKnobLabel).toBeTruthy();
      });
      it("is a LABEL element", () => {
        const bpmKnobLabel = htmlPage.querySelector(BPM_KNOB_LABEL_SELECTOR);
        expect(bpmKnobLabel.tagName).toBe("LABEL");
      });
    });
    describe("BpmKnobText", () => {
      it("should exists", () => {
        const bpmKnobText = htmlPage.querySelector(BPM_KNOB_TEXT_SELECTOR);
        expect(bpmKnobText).toBeTruthy();
      });
      it("is a DIV element", () => {
        const bpmKnobText = htmlPage.querySelector(BPM_KNOB_TEXT_SELECTOR);
        expect(bpmKnobText.tagName).toBe("DIV");
      });
    });
  });
});

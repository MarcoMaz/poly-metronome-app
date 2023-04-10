import { htmlPage } from "../../../setup";

import {
  AGAINST_BEAT,
  AGAINST_BEAT_MINUS_SELECTOR,
  AGAINST_BEAT_PLUS_SELECTOR,
  AGAINST_BEAT_VALUE_SELECTOR,
  BASE_BEAT,
  BASE_BEAT_MINUS_SELECTOR,
  BASE_BEAT_PLUS_SELECTOR,
  BASE_BEAT_VALUE_SELECTOR,
  BEATS,
  BEATS_CONTAINER,
  DOTS,
  SWITCH_BEATS_CHIP_SELECTOR,
} from "../../../../../app/classes/base/constants";

describe("Gui Controllers", () => {
  describe("Beats Container", () => {
    it("should exists", () => {
      const beatsContainer = htmlPage.querySelector(BEATS_CONTAINER);
      expect(beatsContainer).toBeTruthy();
    });

    it("is a DIV element", () => {
      const beatsContainer = htmlPage.querySelector(BEATS_CONTAINER);
      expect(beatsContainer.tagName).toBe("DIV");
    });

    describe("Beats", () => {
      it("should exists", () => {
        const beats = htmlPage.querySelector(BEATS);
        expect(beats).toBeTruthy();
      });
      it("is a DIV element", () => {
        const beats = htmlPage.querySelector(BEATS);
        expect(beats.tagName).toBe("DIV");
      });

      it("contains 3 children", () => {
        const beats = htmlPage.querySelector(BEATS);
        expect(beats.children.length).toBe(3);
      });

      describe("Against Beat", () => {
        it("should exists", () => {
          const againstBeat = htmlPage.querySelector(AGAINST_BEAT);
          expect(againstBeat).toBeTruthy();
        });
        it("is a DIV element", () => {
          const againstBeat = htmlPage.querySelector(AGAINST_BEAT);
          expect(againstBeat.tagName).toBe("DIV");
        });

        it("contains 3 children", () => {
          const againstBeat = htmlPage.querySelector(AGAINST_BEAT);
          expect(againstBeat.children.length).toBe(3);
        });

        describe("Button +", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(AGAINST_BEAT_PLUS_SELECTOR);
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(AGAINST_BEAT_PLUS_SELECTOR);
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(AGAINST_BEAT_PLUS_SELECTOR);
            expect(button.textContent.trim()).toBe("+");
          });
        });
        describe("Input", () => {
          it("should exists", () => {
            const input = htmlPage.querySelector(AGAINST_BEAT_VALUE_SELECTOR);
            expect(input).toBeTruthy();
          });
          it("is a INPUT element", () => {
            const input = htmlPage.querySelector(AGAINST_BEAT_VALUE_SELECTOR);
            expect(input.tagName).toBe("INPUT");
          });
          it("should have the correct value", () => {
            const input = htmlPage.querySelector(AGAINST_BEAT_VALUE_SELECTOR);
            expect((input as HTMLInputElement).value).toBe("3");
          });
          it("should have the correct min number", () => {
            const input = htmlPage.querySelector(AGAINST_BEAT_VALUE_SELECTOR);
            expect(input.getAttribute("min")).toBe("2");
          });
          it("should have the correct max number", () => {
            const input = htmlPage.querySelector(AGAINST_BEAT_VALUE_SELECTOR);
            expect(input.getAttribute("max")).toBe("9");
          });
          it("should have the correct type", () => {
            const input = htmlPage.querySelector(AGAINST_BEAT_VALUE_SELECTOR);
            expect(input.getAttribute("type")).toBe("number");
          });
          it("should have the correct step", () => {
            const input = htmlPage.querySelector(AGAINST_BEAT_VALUE_SELECTOR);
            expect(input.getAttribute("step")).toBe("1");
          });
        });

        describe("Button -", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(AGAINST_BEAT_MINUS_SELECTOR);
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(AGAINST_BEAT_MINUS_SELECTOR);
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(AGAINST_BEAT_MINUS_SELECTOR);
            expect(button.textContent.trim()).toBe("-");
          });
        });
      });

      describe("Dots", () => {
        it("should exists", () => {
          const dots = htmlPage.querySelector(DOTS);
          expect(dots).toBeTruthy();
        });
        it("is a DIV element", () => {
          const dots = htmlPage.querySelector(DOTS);
          expect(dots.tagName).toBe("DIV");
        });
        it("should have the correct label", () => {
          const dots = htmlPage.querySelector(DOTS);
          expect(dots.textContent.trim()).toBe(":");
        });
      });

      describe("Base Beat", () => {
        it("should exists", () => {
          const baseBeat = htmlPage.querySelector(BASE_BEAT);
          expect(baseBeat).toBeTruthy();
        });
        it("is a DIV element", () => {
          const baseBeat = htmlPage.querySelector(BASE_BEAT);
          expect(baseBeat.tagName).toBe("DIV");
        });

        it("contains 3 children", () => {
          const baseBeat = htmlPage.querySelector(BASE_BEAT);
          expect(baseBeat.children.length).toBe(3);
        });

        describe("Button +", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(BASE_BEAT_PLUS_SELECTOR);
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(BASE_BEAT_PLUS_SELECTOR);
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(BASE_BEAT_PLUS_SELECTOR);
            expect(button.textContent.trim()).toBe("+");
          });
        });
        describe("Input", () => {
          it("should exists", () => {
            const input = htmlPage.querySelector(BASE_BEAT_VALUE_SELECTOR);
            expect(input).toBeTruthy();
          });
          it("is a INPUT element", () => {
            const input = htmlPage.querySelector(BASE_BEAT_VALUE_SELECTOR);
            expect(input.tagName).toBe("INPUT");
          });
          it("should have the correct value", () => {
            const input = htmlPage.querySelector(BASE_BEAT_VALUE_SELECTOR);
            expect((input as HTMLInputElement).value).toBe("4");
          });
          it("should have the correct min number", () => {
            const input = htmlPage.querySelector(BASE_BEAT_VALUE_SELECTOR);
            expect(input.getAttribute("min")).toBe("2");
          });
          it("should have the correct max number", () => {
            const input = htmlPage.querySelector(BASE_BEAT_VALUE_SELECTOR);
            expect(input.getAttribute("max")).toBe("9");
          });
          it("should have the correct type", () => {
            const input = htmlPage.querySelector(BASE_BEAT_VALUE_SELECTOR);
            expect(input.getAttribute("type")).toBe("number");
          });
          it("should have the correct step", () => {
            const input = htmlPage.querySelector(BASE_BEAT_VALUE_SELECTOR);
            expect(input.getAttribute("step")).toBe("1");
          });
        });

        describe("Button -", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(BASE_BEAT_MINUS_SELECTOR);
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(BASE_BEAT_MINUS_SELECTOR);
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(BASE_BEAT_MINUS_SELECTOR);
            expect(button.textContent.trim()).toBe("-");
          });
        });
      });
    });

    describe("Switch Beats", () => {
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
        expect(switchBeats.textContent.trim()).toBe("Switch Beats");
      });
    });
  });
});

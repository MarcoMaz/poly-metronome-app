import { htmlPage } from "../../../setup";

const GUI_CONTROLLERS_BEATS_CONTAINER = ".gui-controllers__beats-container";
const GUI_CONTROLLERS_BEATS = ".gui-controllers__beats";

const GUI_CONTROLLERS_AGAINST_BEAT = ".gui-controllers__against-beat";
const GUI_CONTROLLERS_AGAINST_BEAT_BUTTON_PLUS =
  ".gui-controllers__against-beat.gui-controllers__beat-plus";
const GUI_CONTROLLERS_AGAINST_BEAT_INPUT =
  ".gui-controllers__against-beat.gui-controllers__beat-value";
const GUI_CONTROLLERS_AGAINST_BEAT_BUTTON_MINUS =
  ".gui-controllers__against-beat.gui-controllers__beat-minus";
const GUI_CONTROLLERS_DOTS = ".gui-controllers__dots";

const GUI_CONTROLLERS_BASE_BEAT = ".gui-controllers__base-beat";
const GUI_CONTROLLERS_BASE_BEAT_BUTTON_PLUS =
  ".gui-controllers__base-beat.gui-controllers__beat-plus";
const GUI_CONTROLLERS_BASE_BEAT_INPUT =
  ".gui-controllers__base-beat.gui-controllers__beat-value";
const GUI_CONTROLLERS_BASE_BEAT_BUTTON_MINUS =
  ".gui-controllers__base-beat.gui-controllers__beat-minus";

const GUI_CONTROLLERS_SWITCH_BEATS = ".gui-controllers__switch-beats";

const GUI_CONTROLLERS_SWITCH_BEATS_LABEL = "Switch Beats";

describe("Gui Controllers", () => {
  describe("Beats Container", () => {
    it("should exists", () => {
      const beatsContainer = htmlPage.querySelector(
        GUI_CONTROLLERS_BEATS_CONTAINER
      );
      expect(beatsContainer).toBeTruthy();
    });

    it("is a DIV element", () => {
      const beatsContainer = htmlPage.querySelector(
        GUI_CONTROLLERS_BEATS_CONTAINER
      );
      expect(beatsContainer.tagName).toBe("DIV");
    });

    describe("Beats", () => {
      it("should exists", () => {
        const beats = htmlPage.querySelector(GUI_CONTROLLERS_BEATS);
        expect(beats).toBeTruthy();
      });
      it("is a DIV element", () => {
        const beats = htmlPage.querySelector(GUI_CONTROLLERS_BEATS);
        expect(beats.tagName).toBe("DIV");
      });

      it("contains 3 children", () => {
        const beats = htmlPage.querySelector(GUI_CONTROLLERS_BEATS);
        expect(beats.children.length).toBe(3);
      });

      describe("Against Beat", () => {
        it("should exists", () => {
          const againstBeat = htmlPage.querySelector(
            GUI_CONTROLLERS_AGAINST_BEAT
          );
          expect(againstBeat).toBeTruthy();
        });
        it("is a DIV element", () => {
          const againstBeat = htmlPage.querySelector(
            GUI_CONTROLLERS_AGAINST_BEAT
          );
          expect(againstBeat.tagName).toBe("DIV");
        });

        it("contains 3 children", () => {
          const againstBeat = htmlPage.querySelector(
            GUI_CONTROLLERS_AGAINST_BEAT
          );
          expect(againstBeat.children.length).toBe(3);
        });

        describe("Button +", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_BUTTON_PLUS
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_BUTTON_PLUS
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_BUTTON_PLUS
            );
            expect(button.textContent.trim()).toBe("+");
          });
        });
        describe("Input", () => {
          it("should exists", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_INPUT
            );
            expect(input).toBeTruthy();
          });
          it("is a INPUT element", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_INPUT
            );
            expect(input.tagName).toBe("INPUT");
          });
          it("should have the correct value", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_INPUT
            );
            expect((input as HTMLInputElement).value).toBe("3");
          });
          it("should have the correct min number", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_INPUT
            );
            expect(input.getAttribute("min")).toBe("2");
          });
          it("should have the correct max number", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_INPUT
            );
            expect(input.getAttribute("max")).toBe("9");
          });
          it("should have the correct type", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_INPUT
            );
            expect(input.getAttribute("type")).toBe("number");
          });
          it("should have the correct step", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_INPUT
            );
            expect(input.getAttribute("step")).toBe("1");
          });
        });

        describe("Button -", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_BUTTON_MINUS
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_BUTTON_MINUS
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_AGAINST_BEAT_BUTTON_MINUS
            );
            expect(button.textContent.trim()).toBe("-");
          });
        });
      });

      describe("Dots", () => {
        it("should exists", () => {
          const dots = htmlPage.querySelector(GUI_CONTROLLERS_DOTS);
          expect(dots).toBeTruthy();
        });
        it("is a DIV element", () => {
          const dots = htmlPage.querySelector(GUI_CONTROLLERS_DOTS);
          expect(dots.tagName).toBe("DIV");
        });
        it("should have the correct label", () => {
          const dots = htmlPage.querySelector(GUI_CONTROLLERS_DOTS);
          expect(dots.textContent.trim()).toBe(":");
        });
      });

      describe("Base Beat", () => {
        it("should exists", () => {
          const baseBeat = htmlPage.querySelector(GUI_CONTROLLERS_BASE_BEAT);
          expect(baseBeat).toBeTruthy();
        });
        it("is a DIV element", () => {
          const baseBeat = htmlPage.querySelector(GUI_CONTROLLERS_BASE_BEAT);
          expect(baseBeat.tagName).toBe("DIV");
        });

        it("contains 3 children", () => {
          const baseBeat = htmlPage.querySelector(GUI_CONTROLLERS_BASE_BEAT);
          expect(baseBeat.children.length).toBe(3);
        });

        describe("Button +", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_BUTTON_PLUS
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_BUTTON_PLUS
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_BUTTON_PLUS
            );
            expect(button.textContent.trim()).toBe("+");
          });
        });
        describe("Input", () => {
          it("should exists", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_INPUT
            );
            expect(input).toBeTruthy();
          });
          it("is a INPUT element", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_INPUT
            );
            expect(input.tagName).toBe("INPUT");
          });
          it("should have the correct value", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_INPUT
            );
            expect((input as HTMLInputElement).value).toBe("4");
          });
          it("should have the correct min number", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_INPUT
            );
            expect(input.getAttribute("min")).toBe("2");
          });
          it("should have the correct max number", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_INPUT
            );
            expect(input.getAttribute("max")).toBe("9");
          });
          it("should have the correct type", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_INPUT
            );
            expect(input.getAttribute("type")).toBe("number");
          });
          it("should have the correct step", () => {
            const input = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_INPUT
            );
            expect(input.getAttribute("step")).toBe("1");
          });
        });

        describe("Button -", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_BUTTON_MINUS
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_BUTTON_MINUS
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(
              GUI_CONTROLLERS_BASE_BEAT_BUTTON_MINUS
            );
            expect(button.textContent.trim()).toBe("-");
          });
        });
      });
    });

    describe("Switch Beats", () => {
      it("should exists", () => {
        const switchBeats = htmlPage.querySelector(
          GUI_CONTROLLERS_SWITCH_BEATS
        );
        expect(switchBeats).toBeTruthy();
      });
      it("is a BUTTON element", () => {
        const switchBeats = htmlPage.querySelector(
          GUI_CONTROLLERS_SWITCH_BEATS
        );
        expect(switchBeats.tagName).toBe("BUTTON");
      });
      it("should have the correct label", () => {
        const switchBeats = htmlPage.querySelector(
          GUI_CONTROLLERS_SWITCH_BEATS
        );
        expect(switchBeats.textContent.trim()).toBe(
          GUI_CONTROLLERS_SWITCH_BEATS_LABEL
        );
      });
    });
  });
});

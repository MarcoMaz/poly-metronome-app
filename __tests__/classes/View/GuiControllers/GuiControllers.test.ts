import { htmlPage } from "../../../setup"; 

describe("Gui Controllers", () => {
  it("should exists", () => {
    const guiController = htmlPage.querySelector(".gui-controllers");
    expect(guiController).toBeTruthy();
  });

  it("is a DIV element", () => {
    const guiController = htmlPage.querySelector(".gui-controllers");
    expect(guiController.tagName).toBe("DIV");
  });

  it("contains 3 children", () => {
    const guiController = htmlPage.querySelector(".gui-controllers");
    expect(guiController.children.length).toBe(3);
  });

  describe("Warning", () => {
    it("should exists", () => {
      const warning = htmlPage.querySelector(
        ".gui-controllers__warning"
      );
      expect(warning).toBeTruthy();
    });

    it("is a DIV element", () => {
      const warning = htmlPage.querySelector(
        ".gui-controllers__warning"
      );
      expect(warning.tagName).toBe("DIV");
    });

    it("should have the correct label", () => {
      const warning = htmlPage.querySelector(
        ".gui-controllers__warning"
      );
      expect(warning.textContent.trim()).toBe("This is NOT a polyrhythm!");
    });
  });
  describe("Beats Container", () => {
    it("should exists", () => {
      const beatsContainer = htmlPage.querySelector(
        ".gui-controllers__beats-container"
      );
      expect(beatsContainer).toBeTruthy();
    });

    it("is a DIV element", () => {
      const beatsContainer = htmlPage.querySelector(
        ".gui-controllers__beats-container"
      );
      expect(beatsContainer.tagName).toBe("DIV");
    });

    describe("Beats", () => {
      it("should exists", () => {
        const beats = htmlPage.querySelector(".gui-controllers__beats");
        expect(beats).toBeTruthy();
      });
      it("is a DIV element", () => {
        const beats = htmlPage.querySelector(".gui-controllers__beats");
        expect(beats.tagName).toBe("DIV");
      });

      it("contains 3 children", () => {
        const beats = htmlPage.querySelector(".gui-controllers__beats");
        expect(beats.children.length).toBe(3);
      });

      describe("Against Beat", () => {
        it("should exists", () => {
          const againstBeat = htmlPage.querySelector(
            ".gui-controllers__against-beat"
          );
          expect(againstBeat).toBeTruthy();
        });
        it("is a DIV element", () => {
          const againstBeat = htmlPage.querySelector(
            ".gui-controllers__against-beat"
          );
          expect(againstBeat.tagName).toBe("DIV");
        });

        it("contains 3 children", () => {
          const againstBeat = htmlPage.querySelector(
            ".gui-controllers__against-beat"
          );
          expect(againstBeat.children.length).toBe(3);
        });

        describe("Button +", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-plus"
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-plus"
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-plus"
            );
            expect(button.textContent.trim()).toBe("+");
          });
        });
        describe("Input", () => {
          it("should exists", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input).toBeTruthy();
          });
          it("is a INPUT element", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.tagName).toBe("INPUT");
          });
          it("should have the correct value", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect((input as HTMLInputElement).value).toBe("3");
          });
          it("should have the correct min number", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("min")).toBe("2");
          });
          it("should have the correct max number", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("max")).toBe("9");
          });
          it("should have the correct type", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("type")).toBe("number");
          });
          it("should have the correct step", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("step")).toBe("1");
          });
        });

        describe("Button -", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-minus"
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-minus"
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-minus"
            );
            expect(button.textContent.trim()).toBe("-");
          });
        });
      });

      describe("Dots", () => {
        it("should exists", () => {
          const dots = htmlPage.querySelector(".gui-controllers__dots");
          expect(dots).toBeTruthy();
        });
        it("is a DIV element", () => {
          const dots = htmlPage.querySelector(".gui-controllers__dots");
          expect(dots.tagName).toBe("DIV");
        });
        it("should have the correct label", () => {
          const dots = htmlPage.querySelector(".gui-controllers__dots");
          expect(dots.textContent.trim()).toBe(":");
        });
      });

      describe("Base Beat", () => {
        it("should exists", () => {
          const baseBeat = htmlPage.querySelector(
            ".gui-controllers__base-beat"
          );
          expect(baseBeat).toBeTruthy();
        });
        it("is a DIV element", () => {
          const baseBeat = htmlPage.querySelector(
            ".gui-controllers__base-beat"
          );
          expect(baseBeat.tagName).toBe("DIV");
        });

        it("contains 3 children", () => {
          const baseBeat = htmlPage.querySelector(
            ".gui-controllers__base-beat"
          );
          expect(baseBeat.children.length).toBe(3);
        });

        describe("Button +", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-plus"
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-plus"
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-plus"
            );
            expect(button.textContent.trim()).toBe("+");
          });
        });
        describe("Input", () => {
          it("should exists", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input).toBeTruthy();
          });
          it("is a INPUT element", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.tagName).toBe("INPUT");
          });
          it("should have the correct value", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect((input as HTMLInputElement).value).toBe("4");
          });
          it("should have the correct min number", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("min")).toBe("2");
          });
          it("should have the correct max number", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("max")).toBe("9");
          });
          it("should have the correct type", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("type")).toBe("number");
          });
          it("should have the correct step", () => {
            const input = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("step")).toBe("1");
          });
        });

        describe("Button -", () => {
          it("should exists", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-minus"
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-minus"
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = htmlPage.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-minus"
            );
            expect(button.textContent.trim()).toBe("-");
          });
        });
      });
    });

    describe("Switch Beats", () => {
      it("should exists", () => {
        const switchBeats = htmlPage.querySelector(
          ".gui-controllers__switch-beats"
        );
        expect(switchBeats).toBeTruthy();
      });
      it("is a BUTTON element", () => {
        const switchBeats = htmlPage.querySelector(
          ".gui-controllers__switch-beats"
        );
        expect(switchBeats.tagName).toBe("BUTTON");
      });
      it("should have the correct label", () => {
        const switchBeats = htmlPage.querySelector(
          ".gui-controllers__switch-beats"
        );
        expect(switchBeats.textContent.trim()).toBe("Switch Beats");
      });
    });
  });
  describe("BPM", () => {
    it("should exists", () => {
      const bpm = htmlPage.querySelector(".gui-controllers__bpm");
      expect(bpm).toBeTruthy();
    });

    it("is a DIV element", () => {
      const bpm = htmlPage.querySelector(".gui-controllers__bpm");
      expect(bpm.tagName).toBe("DIV");
    });
    describe("Buttons -", () => {
      it("should exists", () => {
        const buttons = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-minus"
        );
        expect(buttons).toBeTruthy();
      });

      it("is a DIV element", () => {
        const buttons = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-minus"
        );
        expect(buttons.tagName).toBe("DIV");
      });

      it("contains 2 children", () => {
        const buttons = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-minus"
        );
        expect(buttons.children.length).toBe(2);
      });

      describe("Button -1", () => {
        it("should exists", () => {
          const buttonMinusOne = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--1"
          );
          expect(buttonMinusOne).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonMinusOne = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--1"
          );
          expect(buttonMinusOne.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonMinusOne = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--1"
          );
          expect(buttonMinusOne.textContent.trim()).toBe("-1");
        });
      });

      describe("Button -5", () => {
        it("should exists", () => {
          const buttonMinusFive = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--5"
          );
          expect(buttonMinusFive).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonMinusFive = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--5"
          );
          expect(buttonMinusFive.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonMinusFive = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--5"
          );
          expect(buttonMinusFive.textContent.trim()).toBe("-5");
        });
      });
    });

    it("should exists", () => {
      const input = htmlPage.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input).toBeTruthy();
    });
    it("is a INPUT element", () => {
      const input = htmlPage.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.tagName).toBe("INPUT");
    });
    it("should have the correct value", () => {
      const input = htmlPage.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect((input as HTMLInputElement).value).toBe("3");
    });
    it("should have the correct min number", () => {
      const input = htmlPage.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.getAttribute("min")).toBe("2");
    });
    it("should have the correct max number", () => {
      const input = htmlPage.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.getAttribute("max")).toBe("9");
    });
    it("should have the correct type", () => {
      const input = htmlPage.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.getAttribute("type")).toBe("number");
    });
    it("should have the correct step", () => {
      const input = htmlPage.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.getAttribute("step")).toBe("1");
    });

    describe("Input", () => {
      it("should exists", () => {
        const input = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input).toBeTruthy();
      });
      it("is a INPUT element", () => {
        const input = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.tagName).toBe("INPUT");
      });
      it("should have the correct value", () => {
        const input = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect((input as HTMLInputElement).value).toBe("120");
      });
      it("should have the correct min number", () => {
        const input = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.getAttribute("min")).toBe("30");
      });
      it("should have the correct max number", () => {
        const input = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.getAttribute("max")).toBe("300");
      });
      it("should have the correct type", () => {
        const input = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.getAttribute("type")).toBe("number");
      });
      it("should have the correct step", () => {
        const input = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.getAttribute("step")).toBe("1");
      });
      it("should have the correct label", () => {
        const input = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value"
        );
        expect(input.textContent.trim()).toBe("BPM");
      });
    });

    describe("Buttons +", () => {
      it("should exists", () => {
        const buttons = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-plus"
        );
        expect(buttons).toBeTruthy();
      });

      it("is a DIV element", () => {
        const buttons = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-plus"
        );
        expect(buttons.tagName).toBe("DIV");
      });

      it("contains 2 children", () => {
        const buttons = htmlPage.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-plus"
        );
        expect(buttons.children.length).toBe(2);
      });

      describe("Button +1", () => {
        it("should exists", () => {
          const buttonPlusOne = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--1"
          );
          expect(buttonPlusOne).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonPlusOne = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--1"
          );
          expect(buttonPlusOne.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonPlusOne = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--1"
          );
          expect(buttonPlusOne.textContent.trim()).toBe("+1");
        });
      });

      describe("Button +5", () => {
        it("should exists", () => {
          const buttonPlusFive = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--5"
          );
          expect(buttonPlusFive).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonPlusFive = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--5"
          );
          expect(buttonPlusFive.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonPlusFive = htmlPage.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--5"
          );
          expect(buttonPlusFive.textContent.trim()).toBe("+5");
        });
      });
    });

    describe("Tap", () => {
      it("should exists", () => {
        const tap = htmlPage.querySelector(".gui-controllers__tap");
        expect(tap).toBeTruthy();
      });

      it("is a BUTTON element", () => {
        const tap = htmlPage.querySelector(".gui-controllers__tap");
        expect(tap.tagName).toBe("BUTTON");
      });

      it("should have the correct label", () => {
        const tap = htmlPage.querySelector(".gui-controllers__tap");
        expect(tap.textContent.trim()).toBe("Tap");
      });
    });
  });
});
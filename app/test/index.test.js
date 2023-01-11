const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../index.html");
const indexHtml = fs.readFileSync(filePath, "utf8");

const dom = new JSDOM(indexHtml);
const { window } = dom;

describe("App", () => {
  it("should exists", () => {
    const app = window.document.querySelector(".app");
    expect(app).toBeTruthy();
  });

  it("should have a title", () => {
    const title = window.document.querySelector("title");
    expect(title.textContent).toBe("Polyrhythmic Metronome PWA");
  });
});

describe("Gui Container", () => {
  it("should exists", () => {
    const guiContainer = window.document.querySelector(".gui-container");
    expect(guiContainer).toBeTruthy();
  });

  it("is a DIV element", () => {
    const guiContainer = window.document.querySelector(".gui-container");
    expect(guiContainer.tagName).toBe("DIV");
  });

  it("contains 2 children", () => {
    const guiContainer = window.document.querySelector(".gui-container");
    expect(guiContainer.children.length).toBe(2);
  });

  describe("Tab Selection", () => {
    it("should exists", () => {
      const tabSelection = window.document.querySelector(
        ".gui-container__tab-selection"
      );
      expect(tabSelection).toBeTruthy();
    });

    it("is a OL element", () => {
      const tabSelection = window.document.querySelector(
        ".gui-container__tab-selection"
      );
      expect(tabSelection.tagName).toBe("OL");
    });

    it("contains 4 children", () => {
      const tabSelection = window.document.querySelector(
        ".gui-container__tab-selection"
      );
      expect(tabSelection.children.length).toBe(4);
    });

    describe("Tab", () => {
      it("is a LI element with a BUTTON inside", () => {
        const tab = Array.prototype.slice.call(
          window.document.querySelector(".gui-container__tab-selection")
        );
        tab.forEach((element) => {
          const buttons = element.querySelectorAll("li > button");
          expect(buttons).toHaveLength(1);
        });
      });

      test("has the correct label", () => {
        const button1 = window.document.querySelector(
          '[data-gui-container-tab="square"]'
        );
        const button2 = window.document.querySelector(
          '[data-gui-container-tab="pipelines"]'
        );
        const button3 = window.document.querySelector(
          '[data-gui-container-tab="grid"]'
        );
        const button4 = window.document.querySelector(
          '[data-gui-container-tab="dots"]'
        );

        expect(button1.textContent.trim()).toBe("Squares");
        expect(button2.textContent.trim()).toBe("Pipelines");
        expect(button3.textContent.trim()).toBe("Grid");
        expect(button4.textContent.trim()).toBe("Dots");
      });

      test("is selected, if first", () => {
        const button = window.document.querySelector(
          '[data-gui-container-tab="square"]'
        );
        const hasActiveClass = button.classList.contains("-selected");
        expect(hasActiveClass).toBe(true);
      });
    });
  });

  describe("Canvas", () => {
    it("should exists", () => {
      const canvas = window.document.querySelector(".gui-container__canvas");
      expect(canvas).toBeTruthy();
    });

    it("is a CANVAS element", () => {
      const canvas = window.document.querySelector("canvas");
      expect(canvas.tagName).toBe("CANVAS");
    });
  });
});

describe("Gui Controllers", () => {
  it("should exists", () => {
    const guiController = window.document.querySelector(".gui-controllers");
    expect(guiController).toBeTruthy();
  });

  it("is a DIV element", () => {
    const guiController = window.document.querySelector(".gui-controllers");
    expect(guiController.tagName).toBe("DIV");
  });

  it("contains 3 children", () => {
    const guiController = window.document.querySelector(".gui-controllers");
    expect(guiController.children.length).toBe(3);
  });

  describe("Warning", () => {
    it("should exists", () => {
      const warning = window.document.querySelector(
        ".gui-controllers__warning"
      );
      expect(warning).toBeTruthy();
    });

    it("is a DIV element", () => {
      const warning = window.document.querySelector(
        ".gui-controllers__warning"
      );
      expect(warning.tagName).toBe("DIV");
    });

    it("should have the correct label", () => {
      const warning = window.document.querySelector(
        ".gui-controllers__warning"
      );
      expect(warning.textContent.trim()).toBe("This is NOT a polyrhythm!");
    });
  });
  describe("Beats Container", () => {
    it("should exists", () => {
      const beatsContainer = window.document.querySelector(
        ".gui-controllers__beats-container"
      );
      expect(beatsContainer).toBeTruthy();
    });

    it("is a DIV element", () => {
      const beatsContainer = window.document.querySelector(
        ".gui-controllers__beats-container"
      );
      expect(beatsContainer.tagName).toBe("DIV");
    });

    describe("Beats", () => {
      it("should exists", () => {
        const beats = window.document.querySelector(".gui-controllers__beats");
        expect(beats).toBeTruthy();
      });
      it("is a DIV element", () => {
        const beats = window.document.querySelector(".gui-controllers__beats");
        expect(beats.tagName).toBe("DIV");
      });

      it("contains 3 children", () => {
        const beats = window.document.querySelector(".gui-controllers__beats");
        expect(beats.children.length).toBe(3);
      });

      describe("Against Beat", () => {
        it("should exists", () => {
          const againstBeat = window.document.querySelector(
            ".gui-controllers__against-beat"
          );
          expect(againstBeat).toBeTruthy();
        });
        it("is a DIV element", () => {
          const againstBeat = window.document.querySelector(
            ".gui-controllers__against-beat"
          );
          expect(againstBeat.tagName).toBe("DIV");
        });

        it("contains 3 children", () => {
          const againstBeat = window.document.querySelector(
            ".gui-controllers__against-beat"
          );
          expect(againstBeat.children.length).toBe(3);
        });

        describe("Button +", () => {
          it("should exists", () => {
            const button = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-plus"
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-plus"
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-plus"
            );
            expect(button.textContent.trim()).toBe("+");
          });
        });
        describe("Input", () => {
          it("should exists", () => {
            const input = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input).toBeTruthy();
          });
          it("is a INPUT element", () => {
            const input = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.tagName).toBe("INPUT");
          });
          it("should have the correct value", () => {
            const input = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.value).toBe("3");
          });
          it("should have the correct min number", () => {
            const input = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("min")).toBe("2");
          });
          it("should have the correct max number", () => {
            const input = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("max")).toBe("9");
          });
          it("should have the correct type", () => {
            const input = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("type")).toBe("number");
          });
          it("should have the correct step", () => {
            const input = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("step")).toBe("1");
          });
        });

        describe("Button -", () => {
          it("should exists", () => {
            const button = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-minus"
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-minus"
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = window.document.querySelector(
              ".gui-controllers__against-beat.gui-controllers__beat-minus"
            );
            expect(button.textContent.trim()).toBe("-");
          });
        });
      });

      describe("Dots", () => {
        it("should exists", () => {
          const dots = window.document.querySelector(".gui-controllers__dots");
          expect(dots).toBeTruthy();
        });
        it("is a DIV element", () => {
          const dots = window.document.querySelector(".gui-controllers__dots");
          expect(dots.tagName).toBe("DIV");
        });
        it("should have the correct label", () => {
          const dots = window.document.querySelector(".gui-controllers__dots");
          expect(dots.textContent.trim()).toBe(":");
        });
      });

      describe("Base Beat", () => {
        it("should exists", () => {
          const baseBeat = window.document.querySelector(
            ".gui-controllers__base-beat"
          );
          expect(baseBeat).toBeTruthy();
        });
        it("is a DIV element", () => {
          const baseBeat = window.document.querySelector(
            ".gui-controllers__base-beat"
          );
          expect(baseBeat.tagName).toBe("DIV");
        });

        it("contains 3 children", () => {
          const baseBeat = window.document.querySelector(
            ".gui-controllers__base-beat"
          );
          expect(baseBeat.children.length).toBe(3);
        });

        describe("Button +", () => {
          it("should exists", () => {
            const button = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-plus"
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-plus"
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-plus"
            );
            expect(button.textContent.trim()).toBe("+");
          });
        });
        describe("Input", () => {
          it("should exists", () => {
            const input = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input).toBeTruthy();
          });
          it("is a INPUT element", () => {
            const input = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.tagName).toBe("INPUT");
          });
          it("should have the correct value", () => {
            const input = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.value).toBe("4");
          });
          it("should have the correct min number", () => {
            const input = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("min")).toBe("2");
          });
          it("should have the correct max number", () => {
            const input = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("max")).toBe("9");
          });
          it("should have the correct type", () => {
            const input = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("type")).toBe("number");
          });
          it("should have the correct step", () => {
            const input = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-value"
            );
            expect(input.getAttribute("step")).toBe("1");
          });
        });

        describe("Button -", () => {
          it("should exists", () => {
            const button = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-minus"
            );
            expect(button).toBeTruthy();
          });
          it("is a BUTTON element", () => {
            const button = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-minus"
            );
            expect(button.tagName).toBe("BUTTON");
          });
          it("should have the correct label", () => {
            const button = window.document.querySelector(
              ".gui-controllers__base-beat.gui-controllers__beat-minus"
            );
            expect(button.textContent.trim()).toBe("-");
          });
        });
      });
    });

    describe("Switch Beats", () => {
      it("should exists", () => {
        const switchBeats = window.document.querySelector(
          ".gui-controllers__switch-beats"
        );
        expect(switchBeats).toBeTruthy();
      });
      it("is a BUTTON element", () => {
        const switchBeats = window.document.querySelector(
          ".gui-controllers__switch-beats"
        );
        expect(switchBeats.tagName).toBe("BUTTON");
      });
      it("should have the correct label", () => {
        const switchBeats = window.document.querySelector(
          ".gui-controllers__switch-beats"
        );
        expect(switchBeats.textContent.trim()).toBe("Switch Beats");
      });
    });
  });
  describe("BPM", () => {
    it("should exists", () => {
      const bpm = window.document.querySelector(".gui-controllers__bpm");
      expect(bpm).toBeTruthy();
    });

    it("is a DIV element", () => {
      const bpm = window.document.querySelector(".gui-controllers__bpm");
      expect(bpm.tagName).toBe("DIV");
    });
    describe("Buttons -", () => {
      it("should exists", () => {
        const buttons = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-minus"
        );
        expect(buttons).toBeTruthy();
      });

      it("is a DIV element", () => {
        const buttons = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-minus"
        );
        expect(buttons.tagName).toBe("DIV");
      });

      it("contains 2 children", () => {
        const buttons = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-minus"
        );
        expect(buttons.children.length).toBe(2);
      });

      describe("Button -1", () => {
        it("should exists", () => {
          const buttonMinusOne = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--1"
          );
          expect(buttonMinusOne).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonMinusOne = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--1"
          );
          expect(buttonMinusOne.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonMinusOne = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--1"
          );
          expect(buttonMinusOne.textContent.trim()).toBe("-1");
        });
      });

      describe("Button -5", () => {
        it("should exists", () => {
          const buttonMinusFive = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--5"
          );
          expect(buttonMinusFive).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonMinusFive = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--5"
          );
          expect(buttonMinusFive.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonMinusFive = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-minus--5"
          );
          expect(buttonMinusFive.textContent.trim()).toBe("-5");
        });
      });
    });

    it("should exists", () => {
      const input = window.document.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input).toBeTruthy();
    });
    it("is a INPUT element", () => {
      const input = window.document.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.tagName).toBe("INPUT");
    });
    it("should have the correct value", () => {
      const input = window.document.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.value).toBe("3");
    });
    it("should have the correct min number", () => {
      const input = window.document.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.getAttribute("min")).toBe("2");
    });
    it("should have the correct max number", () => {
      const input = window.document.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.getAttribute("max")).toBe("9");
    });
    it("should have the correct type", () => {
      const input = window.document.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.getAttribute("type")).toBe("number");
    });
    it("should have the correct step", () => {
      const input = window.document.querySelector(
        ".gui-controllers__against-beat.gui-controllers__beat-value"
      );
      expect(input.getAttribute("step")).toBe("1");
    });

    describe("Input", () => {
      it("should exists", () => {
        const input = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input).toBeTruthy();
      });
      it("is a INPUT element", () => {
        const input = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.tagName).toBe("INPUT");
      });
      it("should have the correct value", () => {
        const input = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.value).toBe("120");
      });
      it("should have the correct min number", () => {
        const input = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.getAttribute("min")).toBe("30");
      });
      it("should have the correct max number", () => {
        const input = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.getAttribute("max")).toBe("300");
      });
      it("should have the correct type", () => {
        const input = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.getAttribute("type")).toBe("number");
      });
      it("should have the correct step", () => {
        const input = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value--number"
        );
        expect(input.getAttribute("step")).toBe("1");
      });
      it("should have the correct label", () => {
        const input = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-value"
        );
        expect(input.textContent.trim()).toBe("BPM");
      });
    });

    describe("Buttons +", () => {
      it("should exists", () => {
        const buttons = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-plus"
        );
        expect(buttons).toBeTruthy();
      });

      it("is a DIV element", () => {
        const buttons = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-plus"
        );
        expect(buttons.tagName).toBe("DIV");
      });

      it("contains 2 children", () => {
        const buttons = window.document.querySelector(
          ".gui-controllers__bpm.gui-controllers__bpm-plus"
        );
        expect(buttons.children.length).toBe(2);
      });

      describe("Button +1", () => {
        it("should exists", () => {
          const buttonPlusOne = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--1"
          );
          expect(buttonPlusOne).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonPlusOne = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--1"
          );
          expect(buttonPlusOne.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonPlusOne = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--1"
          );
          expect(buttonPlusOne.textContent.trim()).toBe("+1");
        });
      });

      describe("Button +5", () => {
        it("should exists", () => {
          const buttonPlusFive = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--5"
          );
          expect(buttonPlusFive).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonPlusFive = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--5"
          );
          expect(buttonPlusFive.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonPlusFive = window.document.querySelector(
            ".gui-controllers__bpm.gui-controllers__bpm-plus--5"
          );
          expect(buttonPlusFive.textContent.trim()).toBe("+5");
        });
      });
    });

    describe("Tap", () => {
      it("should exists", () => {
        const tap = window.document.querySelector(".gui-controllers__tap");
        expect(tap).toBeTruthy();
      });

      it("is a BUTTON element", () => {
        const tap = window.document.querySelector(".gui-controllers__tap");
        expect(tap.tagName).toBe("BUTTON");
      });

      it("should have the correct label", () => {
        const tap = window.document.querySelector(".gui-controllers__tap");
        expect(tap.textContent.trim()).toBe("Tap");
      });
    });
  });
});

describe("Controllers Container", () => {
  it("should exists", () => {
    const controllersContainer = window.document.querySelector(
      ".controllers-container"
    );
    expect(controllersContainer).toBeTruthy();
  });

  it("is a DIV element", () => {
    const controllersContainer = window.document.querySelector(
      ".controllers-container"
    );
    expect(controllersContainer.tagName).toBe("DIV");
  });

  it("contains 2 children", () => {
    const controllersContainer = window.document.querySelector(
      ".controllers-container"
    );
    expect(controllersContainer.children.length).toBe(2);
  });

  describe("Sound Button", () => {
    it("should exists", () => {
      const soundButton = window.document.querySelector(".controllers__sound");
      expect(soundButton).toBeTruthy();
    });

    it("is a BUTTON element", () => {
      const soundButton = window.document.querySelector(".controllers__sound");
      expect(soundButton.tagName).toBe("BUTTON");
    });

    it("should have the correct label", () => {
      const soundButton = window.document.querySelector(".controllers__sound");
      expect(soundButton.textContent.trim()).toBe("Sound:");
    });
  });
  describe("Play Button", () => {
    it("should exists", () => {
      const playButton = window.document.querySelector(".controllers__play");
      expect(playButton).toBeTruthy();
    });

    it("is a BUTTON element", () => {
      const playButton = window.document.querySelector(".controllers__play");
      expect(playButton.tagName).toBe("BUTTON");
    });

    it("should have the correct label", () => {
      const playButton = window.document.querySelector(".controllers__play");
      expect(playButton.textContent.trim()).toBe("Play");
    });
  });
});

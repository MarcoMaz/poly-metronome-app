import { htmlPage } from "../../../setup";

const BPM_SELECTOR = ".gui-controllers__bpm";
const BPM_MINUS_1_SELECTOR = ".gui-controllers__bpm.gui-controllers__bpm-minus--1";
const BPM_MINUS_5_SELECTOR = ".gui-controllers__bpm.gui-controllers__bpm-minus--5";
const BPM_PLUS_1_SELECTOR = ".gui-controllers__bpm.gui-controllers__bpm-plus--1";
const BPM_PLUS_5_SELECTOR = ".gui-controllers__bpm.gui-controllers__bpm-plus--5";
const BPM_VALUE_SELECTOR = ".gui-controllers__bpm.gui-controllers__bpm-value--number";
const BPM_VALUE_SELECTOR_LABEL = ".gui-controllers__bpm.gui-controllers__bpm-value > label";

describe("Gui Controllers", () => {
  describe("BPM", () => {
    it("should exists", () => {
      const bpm = htmlPage.querySelector(BPM_SELECTOR);
      expect(bpm).toBeTruthy();
    });

    it("is a DIV element", () => {
      const bpm = htmlPage.querySelector(BPM_SELECTOR);
      expect(bpm.tagName).toBe("DIV");
    });
    describe("Buttons -", () => {
      describe("Button -1", () => {
        it("should exists", () => {
          const buttonMinusOne = htmlPage.querySelector(BPM_MINUS_1_SELECTOR);
          expect(buttonMinusOne).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonMinusOne = htmlPage.querySelector(BPM_MINUS_1_SELECTOR);
          expect(buttonMinusOne.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonMinusOne = htmlPage.querySelector(BPM_MINUS_1_SELECTOR);
          expect(buttonMinusOne.textContent.trim()).toBe("-1");
        });
      });

      describe("Button -5", () => {
        it("should exists", () => {
          const buttonMinusFive = htmlPage.querySelector(BPM_MINUS_5_SELECTOR);
          expect(buttonMinusFive).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonMinusFive = htmlPage.querySelector(BPM_MINUS_5_SELECTOR);
          expect(buttonMinusFive.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonMinusFive = htmlPage.querySelector(BPM_MINUS_5_SELECTOR);
          expect(buttonMinusFive.textContent.trim()).toBe("-5");
        });
      });
    });

    describe("Input", () => {
      it("should exists", () => {
        const input = htmlPage.querySelector(BPM_VALUE_SELECTOR);
        expect(input).toBeTruthy();
      });
      it("is a INPUT element", () => {
        const input = htmlPage.querySelector(BPM_VALUE_SELECTOR);
        expect(input.tagName).toBe("INPUT");
      });
      it("should have the correct value", () => {
        const input = htmlPage.querySelector(BPM_VALUE_SELECTOR);
        expect((input as HTMLInputElement).value).toBe("120");
      });
      it("should have the correct min number", () => {
        const input = htmlPage.querySelector(BPM_VALUE_SELECTOR);
        expect(input.getAttribute("min")).toBe("30");
      });
      it("should have the correct max number", () => {
        const input = htmlPage.querySelector(BPM_VALUE_SELECTOR);
        expect(input.getAttribute("max")).toBe("300");
      });
      it("should have the correct type", () => {
        const input = htmlPage.querySelector(BPM_VALUE_SELECTOR);
        expect(input.getAttribute("type")).toBe("number");
      });
      it("should have the correct step", () => {
        const input = htmlPage.querySelector(BPM_VALUE_SELECTOR);
        expect(input.getAttribute("step")).toBe("1");
      });
      it("should have the correct label", () => {
        const input = htmlPage.querySelector(BPM_VALUE_SELECTOR_LABEL);        
        expect(input.textContent.trim()).toBe("BPM");
      });
    });

    describe("Buttons +", () => {
      describe("Button +1", () => {
        it("should exists", () => {
          const buttonPlusOne = htmlPage.querySelector(BPM_PLUS_1_SELECTOR);
          expect(buttonPlusOne).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonPlusOne = htmlPage.querySelector(BPM_PLUS_1_SELECTOR);
          expect(buttonPlusOne.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonPlusOne = htmlPage.querySelector(BPM_PLUS_1_SELECTOR);
          expect(buttonPlusOne.textContent.trim()).toBe("+1");
        });
      });

      describe("Button +5", () => {
        it("should exists", () => {
          const buttonPlusFive = htmlPage.querySelector(BPM_PLUS_5_SELECTOR);
          expect(buttonPlusFive).toBeTruthy();
        });

        it("is a BUTTON element", () => {
          const buttonPlusFive = htmlPage.querySelector(BPM_PLUS_5_SELECTOR);
          expect(buttonPlusFive.tagName).toBe("BUTTON");
        });

        it("should have the correct label", () => {
          const buttonPlusFive = htmlPage.querySelector(BPM_PLUS_5_SELECTOR);
          expect(buttonPlusFive.textContent.trim()).toBe("+5");
        });
      });
    });
  });
});

import { htmlPage } from "../../../setup";

const TAP_BUTTON_SELECTOR = ".gui-controllers__tap";

describe("Gui Controllers", () => {
  describe("Tap", () => {
    it("should exists", () => {
      const tap = htmlPage.querySelector(TAP_BUTTON_SELECTOR);
      expect(tap).toBeTruthy();
    });

    it("is a BUTTON element", () => {
      const tap = htmlPage.querySelector(TAP_BUTTON_SELECTOR);
      expect(tap.tagName).toBe("BUTTON");
    });

    it("should have the correct label", () => {
      const tap = htmlPage.querySelector(TAP_BUTTON_SELECTOR);
      expect(tap.textContent.trim()).toBe("Tap");
    });
  });
});

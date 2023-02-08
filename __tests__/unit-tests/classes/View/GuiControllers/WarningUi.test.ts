import { htmlPage } from "../../../setup";

const WARNING_SELECTOR = ".gui-controllers__warning";

describe("Gui Controllers", () => {
  describe("Warning", () => {
    it("should exists", () => {
      const warning = htmlPage.querySelector(WARNING_SELECTOR);
      expect(warning).toBeTruthy();
    });

    it("is a DIV element", () => {
      const warning = htmlPage.querySelector(WARNING_SELECTOR);
      expect(warning.tagName).toBe("DIV");
    });

    it("should have the correct label", () => {
      const warning = htmlPage.querySelector(WARNING_SELECTOR);
      expect(warning.textContent.trim()).toBe("This is NOT a polyrhythm!");
    });
  });
});

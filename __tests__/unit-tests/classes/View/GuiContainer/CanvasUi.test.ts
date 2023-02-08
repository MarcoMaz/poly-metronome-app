import { htmlPage } from "../../../setup";

const CANVAS_SELECTOR = ".gui-container__canvas";

describe("Gui Container", () => {
  describe("Canvas", () => {
    it("should exists", () => {
      const canvas = htmlPage.querySelector(CANVAS_SELECTOR);
      expect(canvas).toBeTruthy();
    });

    it("is a CANVAS element", () => {
      const canvas = htmlPage.querySelector(CANVAS_SELECTOR);
      expect(canvas.tagName).toBe("CANVAS");
    });
  });
});

import { htmlPage } from "./setup";

import {
  CANVAS_PICKER_SELECTOR,
  CANVAS_PICKER_SELECTED_CLASS,
  CANVAS_SELECTION_SQUARE,
  CANVAS_SELECTION_PIPELINES,
  CANVAS_SELECTION_GRID,
  CANVAS_SELECTION_DOTS,
} from "../../app/classes/base/constants";

describe("Canvas Picker", () => {
  it("should exists", () => {
    const canvasPicker = htmlPage.querySelector(CANVAS_PICKER_SELECTOR);
    expect(canvasPicker).toBeTruthy();
  });

  it("is a OL element", () => {
    const canvasPicker = htmlPage.querySelector(CANVAS_PICKER_SELECTOR);
    expect(canvasPicker.tagName).toBe("OL");
  });

  it("contains 4 children", () => {
    const canvasPicker = htmlPage.querySelector(CANVAS_PICKER_SELECTOR);
    expect(canvasPicker.children.length).toBe(4);
  });

  describe("Child", () => {
    it("is a LI element with a BUTTON inside", () => {
      const button = Array.prototype.slice.call(
        htmlPage.querySelector(CANVAS_PICKER_SELECTOR)
      );
      button.forEach(
        (element: { querySelectorAll: (arg0: string) => string }) => {
          const buttons = element.querySelectorAll("li > button");
          expect(buttons).toHaveLength(1);
        }
      );
    });

    it("has the correct label", () => {
      const button1 = htmlPage.querySelector(CANVAS_SELECTION_SQUARE);
      const button2 = htmlPage.querySelector(CANVAS_SELECTION_PIPELINES);
      const button3 = htmlPage.querySelector(CANVAS_SELECTION_GRID);
      const button4 = htmlPage.querySelector(CANVAS_SELECTION_DOTS);

      expect(button1.textContent.trim()).toBe("Square");
      expect(button2.textContent.trim()).toBe("Line");
      expect(button3.textContent.trim()).toBe("Grid");
      expect(button4.textContent.trim()).toBe("Dot");
    });

    it("is selected, if first", () => {
      const button = htmlPage.querySelector(CANVAS_SELECTION_SQUARE);
      const hasActiveClass = button.classList.contains(
        CANVAS_PICKER_SELECTED_CLASS
      );
      expect(hasActiveClass).toBe(true);
    });
  });
});

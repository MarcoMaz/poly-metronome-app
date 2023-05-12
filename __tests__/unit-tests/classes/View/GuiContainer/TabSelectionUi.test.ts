import { htmlPage } from "../../../setup";

import {
  TAB_SELECTION_SELECTOR,
  TAB_SELECTED_CLASS
} from '../../../../../app/classes/base/constants'

describe("Gui Container", () => {
  describe("Tab Selection", () => {
    it("should exists", () => {
      const tabSelection = htmlPage.querySelector(TAB_SELECTION_SELECTOR);
      expect(tabSelection).toBeTruthy();
    });

    it("is a OL element", () => {
      const tabSelection = htmlPage.querySelector(TAB_SELECTION_SELECTOR);
      expect(tabSelection.tagName).toBe("OL");
    });

    it("contains 4 children", () => {
      const tabSelection = htmlPage.querySelector(TAB_SELECTION_SELECTOR);
      expect(tabSelection.children.length).toBe(4);
    });

    describe("Tab", () => {
      it("is a LI element with a BUTTON inside", () => {
        const tab = Array.prototype.slice.call(
          htmlPage.querySelector(TAB_SELECTION_SELECTOR)
        );
        tab.forEach(
          (element: { querySelectorAll: (arg0: string) => string }) => {
            const buttons = element.querySelectorAll("li > button");
            expect(buttons).toHaveLength(1);
          }
        );
      });

      test("has the correct label", () => {
        const button1 = htmlPage.querySelector(
          '[data-gui-container-tab="square"]'
        );
        const button2 = htmlPage.querySelector(
          '[data-gui-container-tab="line"]'
        );
        const button3 = htmlPage.querySelector(
          '[data-gui-container-tab="grid"]'
        );
        const button4 = htmlPage.querySelector(
          '[data-gui-container-tab="dot"]'
        );

        expect(button1.textContent.trim()).toBe("Square");
        expect(button2.textContent.trim()).toBe("Line");
        expect(button3.textContent.trim()).toBe("Grid");
        expect(button4.textContent.trim()).toBe("Dot");
      });

      test("is selected, if first", () => {
        const button = htmlPage.querySelector(
          '[data-gui-container-tab="square"]'
        );
        const hasActiveClass = button.classList.contains(TAB_SELECTED_CLASS);
        expect(hasActiveClass).toBe(true);
      });
    });
  });
});

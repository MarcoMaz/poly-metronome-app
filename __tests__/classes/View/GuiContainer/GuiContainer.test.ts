import { htmlPage } from "../../../setup"; 

describe("Gui Container", () => {
  it("should exists", () => {
    const guiContainer = htmlPage.querySelector(".gui-container");
    expect(guiContainer).toBeTruthy();
  });

  it("is a DIV element", () => {
    const guiContainer = htmlPage.querySelector(".gui-container");
    expect(guiContainer.tagName).toBe("DIV");
  });

  it("contains 2 children", () => {
    const guiContainer = htmlPage.querySelector(".gui-container");
    expect(guiContainer.children.length).toBe(2);
  });

  describe("Tab Selection", () => {
    it("should exists", () => {
      const tabSelection = htmlPage.querySelector(
        ".gui-container__tab-selection"
      );
      expect(tabSelection).toBeTruthy();
    });

    it("is a OL element", () => {
      const tabSelection = htmlPage.querySelector(
        ".gui-container__tab-selection"
      );
      expect(tabSelection.tagName).toBe("OL");
    });

    it("contains 4 children", () => {
      const tabSelection = htmlPage.querySelector(
        ".gui-container__tab-selection"
      );
      expect(tabSelection.children.length).toBe(4);
    });

    describe("Tab", () => {
      it("is a LI element with a BUTTON inside", () => {
        const tab = Array.prototype.slice.call(
          htmlPage.querySelector(".gui-container__tab-selection")
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
          '[data-gui-container-tab="pipelines"]'
        );
        const button3 = htmlPage.querySelector(
          '[data-gui-container-tab="grid"]'
        );
        const button4 = htmlPage.querySelector(
          '[data-gui-container-tab="dots"]'
        );

        expect(button1.textContent.trim()).toBe("Squares");
        expect(button2.textContent.trim()).toBe("Pipelines");
        expect(button3.textContent.trim()).toBe("Grid");
        expect(button4.textContent.trim()).toBe("Dots");
      });

      test("is selected, if first", () => {
        const button = htmlPage.querySelector(
          '[data-gui-container-tab="square"]'
        );
        const hasActiveClass = button.classList.contains("-selected");
        expect(hasActiveClass).toBe(true);
      });
    });
  });

  describe("Canvas", () => {
    it("should exists", () => {
      const canvas = htmlPage.querySelector(".gui-container__canvas");
      expect(canvas).toBeTruthy();
    });

    it("is a CANVAS element", () => {
      const canvas = htmlPage.querySelector("canvas");
      expect(canvas.tagName).toBe("CANVAS");
    });
  });
});

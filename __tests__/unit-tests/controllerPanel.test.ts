import { htmlPage } from "./setup";

import {
  CONTROLLER_PANEL_SELECTOR,
  CONTROLLER_PANEL_BUTTONS_SELECTOR,
  CONTROLLER_PANEL_BUTTON_SELECTOR,
  CONTROLLER_PANEL_PANEL_SELECTOR,
  CONTROLLER_PANEL_ACTIVE_CLASS,
  SHOW_CLASS,
} from "../../app/classes/base/constants";

describe("Controller panel", () => {
  it("should exists", () => {
    const controllerPanel = htmlPage.querySelector(CONTROLLER_PANEL_SELECTOR);
    expect(controllerPanel).toBeTruthy();
  });
  it("should be a DIV element", () => {
    const controllerPanel = htmlPage.querySelector(CONTROLLER_PANEL_SELECTOR);
    expect(controllerPanel.tagName).toBe("SECTION");
  });
  it("should have three children", () => {
    const controllerPanel = htmlPage.querySelector(CONTROLLER_PANEL_SELECTOR);
    expect(controllerPanel.children.length).toBe(3);
  });

  describe("Buttons", () => {
    it("should exists", () => {
      const controllerPanelButtons = htmlPage.querySelector(
        CONTROLLER_PANEL_BUTTONS_SELECTOR
      );
      expect(controllerPanelButtons).toBeTruthy();
    });
    it("should be a DIV element", () => {
      const controllerPanelButtons = htmlPage.querySelector(
        CONTROLLER_PANEL_BUTTONS_SELECTOR
      );
      expect(controllerPanelButtons.tagName).toBe("DIV");
    });
    it("should have three children", () => {
      const controllerPanelButtons = htmlPage.querySelector(
        CONTROLLER_PANEL_BUTTONS_SELECTOR
      );
      expect(controllerPanelButtons.children.length).toBe(2);
    });

    describe("Button", () => {
      it("is a BUTTON element", () => {
        const buttons = htmlPage.querySelectorAll(
          CONTROLLER_PANEL_BUTTON_SELECTOR
        );
        buttons.forEach((element: HTMLButtonElement) => {
          expect(element.tagName).toBe("BUTTON");
        });
      });
      it("is selected, if first", () => {
        const buttons = htmlPage.querySelectorAll(
          CONTROLLER_PANEL_BUTTON_SELECTOR
        );
        const hasActiveClass = buttons[0].classList.contains(
          CONTROLLER_PANEL_ACTIVE_CLASS
        );
        expect(hasActiveClass).toBe(true);
      });
    });
  });

  describe("Panel", () => {
    it("is a DIV element", () => {
      const panes = htmlPage.querySelectorAll(CONTROLLER_PANEL_PANEL_SELECTOR);
      panes.forEach((element: HTMLElement) => {
        expect(element.tagName).toBe("DIV");
      });
    });
    it("is shown, if first", () => {
      const panes = htmlPage.querySelectorAll(CONTROLLER_PANEL_PANEL_SELECTOR);
      const hasShowClass = panes[0].classList.contains(SHOW_CLASS);
      expect(hasShowClass).toBe(true);
    });
  });
});

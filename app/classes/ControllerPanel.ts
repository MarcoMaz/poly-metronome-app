import {
  CONTROLLER_PANEL_SELECTOR,
  CONTROLLER_PANEL_BUTTON_SELECTOR,
  CONTROLLER_PANEL_PANE_SELECTOR,
  CONTROLLER_PANEL_ACTIVE_SELECTOR,
  CONTROLLER_PANEL_ACTIVE_CLASS,
  SHOW_CLASS,
} from "../classes/base/constants";

/**
 * This class represents the UI controlling the controller panels.
 *
 * @name ControllerPanel
 *
 * @param {HTMLElement} el                  - The component itself.
 * @param {NodeListOf<HTMLElement>} panels  - The panels showing the controllers.
 *
 */
class ControllerPanel {
  private el: HTMLElement;
  private panels: NodeListOf<HTMLElement>;

  /**
   * Define DOM Elements and Variables.
   */
  constructor() {
    this.el = document.querySelector(CONTROLLER_PANEL_SELECTOR);
    this.panels = this.el.querySelectorAll(CONTROLLER_PANEL_PANE_SELECTOR);

    // Register events
    this.el.addEventListener("click", this.togglePanel.bind(this));
  }

  /**
   * @name togglePanel
   * @description
   * Toggle the panel on click.
   *
   */
  private togglePanel(event: Event): void {
    const eventTarget = event.target as HTMLElement;
    const button = eventTarget.closest(CONTROLLER_PANEL_BUTTON_SELECTOR);

    if (button) {
      const activeButton = this.el.querySelector(
        CONTROLLER_PANEL_ACTIVE_SELECTOR
      );
      if (activeButton) {
        activeButton.classList.remove(CONTROLLER_PANEL_ACTIVE_CLASS);
      }
      button.classList.add(CONTROLLER_PANEL_ACTIVE_CLASS);

      const buttonIndex = Array.from(button.parentNode.children).indexOf(
        button
      );
      this.panels.forEach((panel: HTMLElement, i: number) => {
        if (i === buttonIndex) {
          panel.classList.add(SHOW_CLASS);
        } else {
          panel.classList.remove(SHOW_CLASS);
        }
      });
    }
  }
}

export default ControllerPanel;

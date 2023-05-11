const CONTROLLER_PANEL_SELECTOR = ".ControllerPanel";
const CONTROLLER_PANEL_BUTTON_SELECTOR = ".ControllerPanel__button";
const CONTROLLER_PANEL_PANE_SELECTOR = ".ControllerPanel__pane";
const CONTROLLER_PANEL_ACTIVE_SELECTOR = ".-active";
const CONTROLLER_PANEL_ACTIVE_CLASS = "-active";
const CONTROLLER_PANEL_SHOW_CLASS = "-show";

class ControllerPanel {
  private el: HTMLElement;
  private panels: NodeListOf<HTMLElement>;

  constructor() {
    this.el = document.querySelector(CONTROLLER_PANEL_SELECTOR);
    this.panels = this.el.querySelectorAll(CONTROLLER_PANEL_PANE_SELECTOR);

    this.el.addEventListener("click", this.handleClick.bind(this));
  }

  private handleClick(event: Event): void {
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

      this.panels.forEach((panel: HTMLElement) => {
        panel.classList.toggle(CONTROLLER_PANEL_SHOW_CLASS);
      });
    }
  }
}

export default ControllerPanel;

import {
  CANVAS_PICKER_SELECTOR,
  CANVAS_PICKER_BUTTON_SELECTOR,
  CANVAS_PICKER_SELECTED_CLASS,
  CANVAS_PICKER_SELECTED_DEFAULT,
} from "../base/constants";

/**
 * This class represents the UI controlling the Canvas picker
 *
 * @name CanvasPicker
 *
 * @param {HTMLOListElement} el                   - The parent element container.
 * @param {NodeListOf<HTMLButtonElement>} options - The collections of selectable buttons.
 * @param {string} selected                       - The current selection.
 */

class CanvasPicker {
  private el: HTMLOListElement;
  private options: NodeListOf<HTMLButtonElement>;
  public selected: string;

  /**
   * Define DOM Elements and Variables.
   */
  constructor() {
    this.el = document.querySelector(CANVAS_PICKER_SELECTOR);
    this.options = this.el.querySelectorAll(CANVAS_PICKER_BUTTON_SELECTOR);
    this.selected = CANVAS_PICKER_SELECTED_DEFAULT;

    // Register events
    Array.from(this.options).forEach((option) => {
      option.addEventListener(
        "click",
        this.handleOptionClick.bind(this, option)
      );
    });
  }

  /**
   * @name handleOptionClick
   * @description
   * Updates the state when a canvas picker option is clicked.
   *
   */
  private handleOptionClick(option: HTMLButtonElement) {
    if (!option.classList.contains(CANVAS_PICKER_SELECTED_CLASS)) {
      this.deselectAllTabs();
      option.classList.add(CANVAS_PICKER_SELECTED_CLASS);
      this.selected = option.dataset.canvasPickerButton;
    }
  }

  /**
   * @name deselectAllTabs
   * @description
   * Deselect all the tabs not containing the active class.
   *
   */
  private deselectAllTabs(): void {
    Array.from(this.options).forEach((option) => {
      option.classList.remove(CANVAS_PICKER_SELECTED_CLASS);
    });
  }
}

export default CanvasPicker;

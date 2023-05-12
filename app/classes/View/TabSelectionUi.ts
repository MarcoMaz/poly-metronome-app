import {
  TAB_SELECTION_SELECTOR,
  TAB_SELECTOR,
  TAB_SELECTED_CLASS,
  TAB_SELECTED_DEFAULT,
} from "../base/constants";
/**
 * This class represents the UI controlling the Tab Selection
 *
 * @name TabSelectionUi
 *
 * @param {HTMLOListElement} element              - The parent element container.
 * @param {NodeListOf<HTMLButtonElement>} options - The collections of selectable options.
 * @param {string} selected                       - The current selection.
 */

class TabSelectionUi {
  private element: HTMLOListElement;
  private options: NodeListOf<HTMLButtonElement>;
  public selected: string;

  /**
   * Define DOM Elements and Variables.
   */
  constructor() {
    this.element = document.querySelector(TAB_SELECTION_SELECTOR);
    this.options = this.element.querySelectorAll(TAB_SELECTOR);
    this.selected = TAB_SELECTED_DEFAULT;

    // Register events
    Array.from(this.options).forEach((option) => {
      option.addEventListener("click", () => {
        if (!option.classList.contains(TAB_SELECTED_CLASS)) {
          this.deselectAllTabs();
          option.classList.add(TAB_SELECTED_CLASS);
          this.selected = option.dataset.canvasPickerButton;
        }
      });
    });
  }

  /**
   * @name deselectAllTabs
   * @description
   * Deselect all the tabs not containing the active class.
   *
   */
  private deselectAllTabs(): void {
    Array.from(this.options).forEach((option) => {
      option.classList.remove(TAB_SELECTED_CLASS);
    });
  }
}

export default TabSelectionUi;

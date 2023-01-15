export const tabSelectionUi = {
  selectors: {
    TAB_SELECTION_SELECTOR: ".gui-container__tab-selection",
    TAB_SELECTOR: ".gui-container__tab"
  },
  classes: {
    TAB_SELECTED_CLASS: "-selected"
  },
  variables: {
    TAB_SELECTED_DEFAULT: "square"
  }
}

/**
 * This class represents the UI controlling the Tab Selection
 *
 * @name TabSelectionUi
 *
 * @param {NodeListOf<HTMLButtonElement>} options - the collections of selectable options.
 * @param {string} selected                       - the current selection.
 */

class TabSelectionUi {
  private element: HTMLOListElement;
  private options: NodeListOf<HTMLButtonElement>;
  public selected: string;

  /**
   * Define DOM Elements and Variables.
   */
  constructor() {
    const {
      TAB_SELECTION_SELECTOR,
      TAB_SELECTOR
    } = tabSelectionUi.selectors;

    const {
      TAB_SELECTED_CLASS
    } = tabSelectionUi.classes

    const {
      TAB_SELECTED_DEFAULT
    } = tabSelectionUi.variables

    this.element = document.querySelector(TAB_SELECTION_SELECTOR);
    this.options = this.element.querySelectorAll(TAB_SELECTOR);
    this.selected = TAB_SELECTED_DEFAULT;

    // Register events
    Array.from(this.options).forEach((option) => {
      option.addEventListener("click", () => {
        if (!option.classList.contains(TAB_SELECTED_CLASS)) {
          this.deselectAllTabs();
          option.classList.add(TAB_SELECTED_CLASS);
          this.selected = option.dataset.guiContainerTab;
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
      option.classList.remove(tabSelectionUi.classes.TAB_SELECTED_CLASS);
    });
  }
}

export default TabSelectionUi;

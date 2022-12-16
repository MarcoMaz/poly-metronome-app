const SELECTION_OPTIONS_SELECTOR = ".gui-container__tab";
const SELECTED_CLASS = "-selected";
const SELECTION_DEFAULT = "square";

/**
 * This class represents the UI controlling the Tab Selection
 * 
 * @name TabSelectionUi
 * 
 * @param {NodeListOf<HTMLButtonElement>} options - the collections of selectable options.
 * @param {string} selected                       - the current selection.
 */

class TabSelectionUi {
  private options: NodeListOf<HTMLButtonElement>;
  public selected: string;

  /**
   * Define DOM Elements and Variables.
   */
  constructor() {
    this.options = document.querySelectorAll(SELECTION_OPTIONS_SELECTOR);
    this.selected = SELECTION_DEFAULT;

    // Register events
    Array.from(this.options).forEach((option) => {
      option.addEventListener("click", () => {
        if (!option.classList.contains(SELECTED_CLASS)) {
          this.deselectAllTabs();
          option.classList.add(SELECTED_CLASS);
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
      option.classList.remove(SELECTED_CLASS);
    });
  }
}

export default TabSelectionUi;

const SELECTION_OPTIONS = ".gui-container__tab";
const SELECTED_CLASS = "-selected";

class TabSelectionUi {
  private options: NodeListOf<HTMLButtonElement>;
  public selected: string;

  constructor() {
    this.options = document.querySelectorAll(SELECTION_OPTIONS);
    this.selected = "square";

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

  private deselectAllTabs(): void {
    Array.from(this.options).forEach((option) => {
      option.classList.remove(SELECTED_CLASS);
    });
  }
}

export default TabSelectionUi;

const SELECTION_OPTIONS = 'input[name="view-radio-btn"]';

class SelectionOptionsUi {
  private options: NodeListOf<HTMLInputElement>;
  public selected: string;

  constructor() {
    this.options = document.querySelectorAll(SELECTION_OPTIONS);
    this.selected = "view-square";

    this.options.forEach((option: HTMLInputElement) => {
      option.addEventListener("change", () => {
        if (option.checked) this.selected = option.value;
      });
    });
  }
}

export default SelectionOptionsUi;

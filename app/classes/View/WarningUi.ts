const WARNING = '.gui-controllers__warning';
const SHOW = "-show";

class WarningUi {
  private warning: HTMLElement;

  constructor() {
    this.warning = document.querySelector(WARNING);
  }

  public isPoly(
    firstElement: number | string,
    secondElement: number | string
  ): void {
    let firstNumber: number = Number(firstElement);
    let secondNumber: number = Number(secondElement);

    const maxNumber: number = Math.max(firstNumber, secondNumber);
    const minNumber: number = Math.min(firstNumber, secondNumber);

    maxNumber % minNumber === 0 ? this.show() : this.hide();
  }

  private show(): void {
    this.warning.classList.add(SHOW);
  }

  private hide(): void {
    this.warning.classList.remove(SHOW);
  }
}

export default WarningUi;

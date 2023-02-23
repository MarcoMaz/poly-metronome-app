import { WARNING_SELECTOR, WARNING_SHOW_CLASS } from "../../base/constants";
/**
 * This class represents the UI controlling the warning.
 *
 * @name WarningUi
 *
 * @param {HTMLElement} warning  - The warning element.
 *
 */

class WarningUi {
  private warning: HTMLElement;

  /**
   * Define DOM Elements and Variables.
   */
  constructor() {
    this.warning = document.querySelector(WARNING_SELECTOR);
  }

  /**
   * @name isPoly
   * @description
   * Check if the relationship between the two beats is a polyrhythm.
   *
   */
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

  /**
   * @name show
   * @description
   * Show the warning.
   *
   */
  private show(): void {
    this.warning.classList.add(WARNING_SHOW_CLASS);
  }

  /**
   * @name hide
   * @description
   * Hide the warning.
   *
   */
  private hide(): void {
    this.warning.classList.remove(WARNING_SHOW_CLASS);
  }
}

export default WarningUi;

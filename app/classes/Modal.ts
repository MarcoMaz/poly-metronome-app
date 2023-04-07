import {
  MODAL_SELECTOR,
  MODAL_SHOW_CLASS,
  MODAL_OVERLAY_SELECTOR,
  MODAL_BUTTON_SELECTOR,
  ESC_KEY_CODE,
} from "./base/constants";

/**
 * This class represents the UI controlling the modal.
 *
 * @name Modal
 *
 * @param {HTMLElement} modal  - The modal element.
 *
 */

class Modal {
  private modal: HTMLElement;
  private modalOverlay: HTMLElement;
  private modalButton: HTMLButtonElement;
  private documentClickListener: () => void;

  /**
   * Define DOM Elements and Variables.
   */
  constructor() {
    this.modal = document.querySelector(MODAL_SELECTOR);
    this.modalOverlay = this.modal.querySelector(MODAL_OVERLAY_SELECTOR);
    this.modalButton = this.modal.querySelector(MODAL_BUTTON_SELECTOR);
    this.modalButton.addEventListener("click", this.hide.bind(this));
    this.documentClickListener = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
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
   * Show the modal.
   *
   */
  private show(): void {
    this.modal.classList.add(MODAL_SHOW_CLASS);
    document.addEventListener("click", this.documentClickListener);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }

  /**
   * @name hide
   * @description
   * Hide the modal.
   *
   */
  private hide(): void {
    this.modal.classList.remove(MODAL_SHOW_CLASS);
    document.removeEventListener("click", this.documentClickListener);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }

  /**
   * @name handleDocumentClick
   * @description
   * Handle when clicking outside of the modal.
   *
   */
  private handleDocumentClick(event: Event): void {
    if (event.target === this.modalOverlay) this.hide();
  }

  /**
   * @name handleDocumentKeyDown
   * @description
   * Handle when Esc key is pressed.
   *
   */
  private handleDocumentKeyDown(event: { keyCode: number }): void {
    if (event.keyCode === ESC_KEY_CODE) this.hide();
  }
}

export default Modal;

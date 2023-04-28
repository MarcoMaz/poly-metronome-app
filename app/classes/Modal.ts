import {
  MODAL_SELECTOR,
  MODAL_OVERLAY_SELECTOR,
  MODAL_BUTTON_SELECTOR,
  ESC_KEY_CODE,
  SHOW_CLASS
} from "./base/constants";

/**
 * This class represents the UI controlling the modal.
 *
 * @name Modal
 *
 * @param {HTMLElement} modal             - The modal element.
 * @param {HTMLElement} modalOverlay      - The modal overlay inside the modal.
 * @param {HTMLButtonElement} modalButton - The modal button inside the modal.
 *
 */

class Modal {
  private modal: HTMLElement;
  private modalOverlay: HTMLElement;
  private modalButton: HTMLButtonElement;

  /**
   * Define DOM Elements and Variables.
   */
  constructor() {
    this.modal = document.querySelector(MODAL_SELECTOR);
    this.modalOverlay = this.modal.querySelector(MODAL_OVERLAY_SELECTOR);
    this.modalButton = this.modal.querySelector(MODAL_BUTTON_SELECTOR);

    // Register events
    this.modalButton.addEventListener("click", this.hideModal.bind(this));
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
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

    maxNumber % minNumber === 0 ? this.showModal() : this.hideModal();
  }

  /**
   * @name showModal
   * @description
   * Show the modal.
   *
   */
  private showModal(): void {
    this.modal.classList.add(SHOW_CLASS);
    document.addEventListener("click", this.handleDocumentClick);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }

  /**
   * @name hideModal
   * @description
   * Hide the modal.
   *
   */
  private hideModal(): void {
    this.modal.classList.remove(SHOW_CLASS);
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }

  /**
   * @name handleDocumentClick
   * @description
   * Handle when clicking outside of the modal.
   *
   */
  private handleDocumentClick(event: Event): void {
    if (event.target === this.modalOverlay) this.hideModal();
  }

  /**
   * @name handleDocumentKeyDown
   * @description
   * Handle when Esc key is pressed.
   *
   */
  private handleDocumentKeyDown(event: { keyCode: number }): void {
    if (event.keyCode === ESC_KEY_CODE) this.hideModal();
  }
}

export default Modal;

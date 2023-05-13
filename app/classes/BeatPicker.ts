import Metronome from "./Metronome";
import Modal from "./Modal";

import {
  AGAINST_BEAT_PICKER_SELECTOR,
  BASE_BEAT_PICKER_SELECTOR,
  AGAINST_BEAT_PICKER_BEATS_SELECTOR,
  BASE_BEAT_PICKER_BEATS_SELECTOR,
  BEAT_PICKER_ITEM_SELECTOR,
  BEATS_PICKER_CENTER_CLASS,
  BEAT_PICKER_AIM_CLASS,
  BEAT_PICKER_ITEM_CLASS,
} from "./base/constants";

/**
 * This class represents the base class for creating BeatPicker.
 *
 * @name BeatPicker
 *
 * @param {HTMLElement} picker      - The picker element.
 * @param {HTMLElement} pickerBeats - The picker beats element.
 * @param {string} pickerType       - The picker type. Either "base" or "against".
 * @param {number} beatMin          - The minum beat of the picker.
 * @param {number} beatMax          - The maximum beat of the picker.
 * @param {number} aimNumber        - The number with aim.
 *
 */

class BeatPicker {
  public picker: HTMLElement;
  public pickerBeats: HTMLElement;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(
    public pickerType: "against" | "base",
    public beatMin: number,
    public beatMax: number,
    public aimNumber: number,
    public metronome: Metronome,
    public modal: Modal
  ) {
    const PICKER_BEATS_SELECTOR =
      pickerType === "against"
        ? AGAINST_BEAT_PICKER_BEATS_SELECTOR
        : BASE_BEAT_PICKER_BEATS_SELECTOR;

    if (pickerType === "against") {
      this.picker = document.querySelector(AGAINST_BEAT_PICKER_SELECTOR);
      this.pickerBeats = document.querySelector(PICKER_BEATS_SELECTOR);
    } else {
      this.picker = document.querySelector(BASE_BEAT_PICKER_SELECTOR);
      this.pickerBeats = document.querySelector(PICKER_BEATS_SELECTOR);
    }

    this.createElements();
    this.centerBeatOnLoad();

    // Register events
    this.pickerBeats.addEventListener("scroll", this.handleScroll.bind(this));
  }

  /**
   * @name createElements
   * @description
   * Creates and populates the beat picker with SPAN elements.
   *
   */
  private createElements(): void {
    const missingNumbers: Array<number | null> = [
      ...Array.from(
        { length: this.beatMax - this.beatMin + 1 },
        (_, i) => i + this.beatMin
      ),
    ];

    const spans = missingNumbers
      .map((beat) => `<span class="${BEAT_PICKER_ITEM_CLASS}">${beat}</span>`)
      .join("");

    this.pickerBeats.innerHTML = spans;

    const beatPickerAimElement = document.createElement("span");
    beatPickerAimElement.classList.add(BEAT_PICKER_AIM_CLASS);
    this.pickerBeats.appendChild(beatPickerAimElement);
  }

  /**
   * @name handleScroll
   * @description
   * Handles the scroll event, updates the metronome beat based on the center item of the picker,
   * and checks if the metronome is in polyrhythm mode after a delay.
   *
   */
  public handleScroll(): void {
    let timeoutId: NodeJS.Timeout;
    const DELAY_IN_MS = 200;

    clearTimeout(timeoutId);
    this.updateBeatBasedOnCenter();
    timeoutId = setTimeout(() => {
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
    }, DELAY_IN_MS);
  }

  /**
   * @name centerBeatOnLoad
   * @description
   * Centers a specific beat item on the picker and highlights it.
   *
   */
  public centerBeatOnLoad(): number {
    const grandParentElement = this.picker.parentElement.parentElement;
    const isPickerVisible = window.getComputedStyle(grandParentElement).display !== 'none';

    if (!isPickerVisible) {
      requestAnimationFrame(() => {
        this.centerBeatOnLoad();
      });
      return 0;
    }
  
    const verticalCenterItem = this.pickerBeats.querySelector(
      `${BEAT_PICKER_ITEM_SELECTOR}:nth-of-type(${this.aimNumber - 1})`
    ) as HTMLElement;

    if (!verticalCenterItem) return 0;

    const centerItemPositionY =
      verticalCenterItem.offsetTop -
      this.pickerBeats.offsetHeight / 2 +
      verticalCenterItem.offsetHeight / 2;

    requestAnimationFrame(() => {
      this.pickerBeats.scrollTop = centerItemPositionY;
      this.highlightCenterItem(this.pickerBeats);
    });

    return centerItemPositionY;
  }

  /**
   * @name highlightCenterItem
   * @description
   * Highlight the item in the center of a picker and remove the highlighting from other items.
   *
   */
  public highlightCenterItem(element: HTMLElement): HTMLElement | null {
    const pickerBounds = element.getBoundingClientRect();
    const centerLineY =
      window.pageYOffset + pickerBounds.top + pickerBounds.height / 2;

    const centerItem = Array.from(
      element.querySelectorAll(BEAT_PICKER_ITEM_SELECTOR)
    ).find((item) => {
      const itemBounds = item.getBoundingClientRect();
      const itemTopY = window.pageYOffset + itemBounds.top;
      const itemBottomY = window.pageYOffset + itemBounds.bottom;
      return itemTopY <= centerLineY && itemBottomY >= centerLineY;
    }) as HTMLElement | undefined;

    element
      .querySelectorAll(BEAT_PICKER_ITEM_SELECTOR)
      .forEach((item) => item.classList.remove(BEATS_PICKER_CENTER_CLASS));

    if (centerItem) centerItem.classList.add(BEATS_PICKER_CENTER_CLASS);

    return centerItem || null;
  }

  /**
   * @name updateBeatBasedOnCenter
   * @description
   * Update the metronome beat based on the aimed item of the picker.
   *
   */
  public updateBeatBasedOnCenter(): void {
    const centerItem = this.highlightCenterItem(this.picker);
    if (this.picker === document.querySelector(AGAINST_BEAT_PICKER_SELECTOR)) {
      this.metronome.againstBeat = Number(centerItem?.textContent) ?? 0;
    } else {
      this.metronome.baseBeat = Number(centerItem?.textContent) ?? 0;
    }
  }
}

export default BeatPicker;

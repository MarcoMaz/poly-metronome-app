import BeatPickers from "./BeatPickers";
import Metronome from "./Metronome";
import Modal from "./Modal";

import {
  BASE_BEAT_PICKER_BEATS_SELECTOR,
  BEATS_PICKER_OPEN_CLASS,
} from "./base/constants";

/**
 * This sub class of BeatPickers represents the UI controlling the AgainstBeatPicker.
 *
 * @name AgainstBeatPicker
 *
 * @param {HTMLElement} otherPickerBeats - The pickerBeats of baseBeatPicker.
 *
 */

class AgainstBeatPicker extends BeatPickers {
  public otherPickerBeats: HTMLElement;

  constructor(
    el: string,
    min: number,
    max: number,
    centerNumber: number,
    metronome: Metronome,
    modal: Modal
  ) {
    super(el, min, max, centerNumber, metronome, modal);

    this.otherPickerBeats = document.querySelector(
      BASE_BEAT_PICKER_BEATS_SELECTOR
    );

    // Register events
    this.picker.addEventListener("wheel", this.handleWheel.bind(this));
    this.picker.addEventListener("click", this.handleClick.bind(this));
  }

  /**
   * @name handleWheel
   * @description
   * Set the center number to the againstBeat and updates classes.
   *
   */
  handleWheel(): void {
    this.centerNumber = this.metronome.againstBeat;
    this.handleClasses();
  }

  /**
   * @name handleClick
   * @description
   * Toggle the picker class if it's not already focused.
   *
   */
  handleClick(): void {
    if (!this.pickerBeats.classList.contains(BEATS_PICKER_OPEN_CLASS))
      this.handleClasses();
  }

  /**
   * @name handleClasses
   * @description
   * Add the "-open" class to the current picker and removes it from the other one.
   *
   */
  handleClasses(): void {
    this.pickerBeats.classList.add(BEATS_PICKER_OPEN_CLASS);
    this.otherPickerBeats.classList.remove(BEATS_PICKER_OPEN_CLASS);
  }
}

export default AgainstBeatPicker;

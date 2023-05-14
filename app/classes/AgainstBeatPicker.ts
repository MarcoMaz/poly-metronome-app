import BeatPicker from "./BeatPicker";
import Metronome from "./Metronome";
import Modal from "./Modal";

import {
  BASE_BEAT_PICKER_BEATS_SELECTOR,
  BEAT_PICKER_FOCUS_CLASS,
} from "./base/constants";

/**
 * This sub class of BeatPicker represents the UI controlling the AgainstBeatPicker.
 *
 * @name AgainstBeatPicker
 *
 * @param {HTMLElement} otherPickerBeats - The pickerBeats of baseBeatPicker.
 *
 */

class AgainstBeatPicker extends BeatPicker {
  public otherPickerBeats: HTMLElement;

  constructor(
    pickerType: "against",
    beatMin: number,
    beatMax: number,
    centerNumber: number,
    metronome: Metronome,
    modal: Modal
  ) {
    super(pickerType, beatMin, beatMax, centerNumber, metronome, modal);

    this.otherPickerBeats = document.querySelector(
      BASE_BEAT_PICKER_BEATS_SELECTOR
    );

    // Register events
    this.picker.addEventListener("wheel", this.handleWheel.bind(this), {passive: true});
    this.picker.addEventListener("click", this.handleClick.bind(this));
  }

  /**
   * @name handleWheel
   * @description
   * Set the center number to the againstBeat and updates classes.
   *
   */
  handleWheel(): void {
    this.aimNumber = this.metronome.againstBeat;
    this.handleClasses();
  }

  /**
   * @name handleClick
   * @description
   * Toggle the picker class if it's not already focused.
   *
   */
  handleClick(): void {
    if (!this.pickerBeats.classList.contains(BEAT_PICKER_FOCUS_CLASS))
      this.handleClasses();
  }

  /**
   * @name handleClasses
   * @description
   * Add the "-focus" class to the current picker and removes it from the other one.
   *
   */
  handleClasses(): void {
    this.pickerBeats.classList.add(BEAT_PICKER_FOCUS_CLASS);
    this.otherPickerBeats.classList.remove(BEAT_PICKER_FOCUS_CLASS);
  }
}

export default AgainstBeatPicker;

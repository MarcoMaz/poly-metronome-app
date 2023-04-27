import BeatsPicker from "./BeatsPicker";
import Metronome from "./Metronome";
import Modal from "./Modal";

import {
  BASE_BEAT_PICKER_BEATS_SELECTOR,
  BEATS_PICKER_OPEN_CLASS,
} from "./base/constants";

class AgainstBeatPicker extends BeatsPicker {
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

    this.picker.addEventListener("wheel", this.handleWheel.bind(this));
    this.picker.addEventListener("click", this.handleClick.bind(this));
  }

  handleWheel(): void {
    this.centerNumber = this.metronome.againstBeat;
    this.handleClasses();
  }

  handleClick(): void {
    if (!this.pickerBeats.classList.contains(BEATS_PICKER_OPEN_CLASS))
      this.handleClasses();
  }

  handleClasses(): void {
    this.pickerBeats.classList.add(BEATS_PICKER_OPEN_CLASS);
    this.otherPickerBeats.classList.remove(BEATS_PICKER_OPEN_CLASS);
  }
}

export default AgainstBeatPicker;

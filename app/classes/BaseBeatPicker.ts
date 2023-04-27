import BeatsPicker from "./BeatsPicker";
import Metronome from "./Metronome";
import Modal from "./Modal";

const BEATS_PICKER_OPEN_CLASS = "-open";

const AGAINST_BEAT_PICKER_BEATS = document.querySelector(
  ".beatPicker--againstBeat > .beatPicker__beats"
);

class BaseBeatPicker extends BeatsPicker {
  constructor(
    el: string,
    min: number,
    max: number,
    centerNumber: number,
    metronome: Metronome,
    modal: Modal
  ) {
    super(el, min, max, centerNumber, metronome, modal);

    this.picker.addEventListener("wheel", this.handleWheel.bind(this));
    this.picker.addEventListener("click", this.handleClick.bind(this));
  }

  handleWheel(): void {
    this.centerNumber = this.metronome.baseBeat;
    this.pickerBeats.classList.add(BEATS_PICKER_OPEN_CLASS);
    AGAINST_BEAT_PICKER_BEATS.classList.remove(BEATS_PICKER_OPEN_CLASS);
  }

  handleClick(): void {
    if (!this.pickerBeats.classList.contains(BEATS_PICKER_OPEN_CLASS)) {
      this.pickerBeats.classList.add(BEATS_PICKER_OPEN_CLASS);
      AGAINST_BEAT_PICKER_BEATS.classList.remove(BEATS_PICKER_OPEN_CLASS);
    }
  }
}

export default BaseBeatPicker;

/* handleWheel and handlClick has things in common */

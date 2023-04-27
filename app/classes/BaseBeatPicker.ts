import BeatsPicker from "./BeatsPicker";
import Metronome from "./Metronome";
import Modal from "./Modal";

class BaseBeatPicker extends BeatsPicker {
  constructor(
    el: string,
    min: number,
    max: number,
    centerNumber: number,
    metronome: Metronome,
  ) {
    super(el, min, max, centerNumber, metronome);

    this.picker.addEventListener("wheel", this.handleWheel.bind(this));
    this.picker.addEventListener("click", this.handleClick.bind(this));
  }

  handleWheel(): void {
    this.pickerBeats.classList.add("-open");
    document
      .querySelector(".beatPicker.beatPicker--againstBeat > .beatPicker__beats")
      .classList.remove("-open");
    this.centerNumber = this.metronome.baseBeat;
  }

  handleClick(): void {
    if (!this.pickerBeats.classList.contains("-open")) {
      this.pickerBeats.classList.add("-open");
      document
        .querySelector(
          ".beatPicker.beatPicker--againstBeat > .beatPicker__beats"
        )
        .classList.remove("-open");
    }
  }
}

export default BaseBeatPicker;

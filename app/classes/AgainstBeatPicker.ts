import BeatsPicker from "./BeatsPicker";
import Metronome from "./Metronome";
import Modal from "./Modal";

class AgainstBeatPicker extends BeatsPicker {
  constructor(
    el: string,
    min: number,
    max: number,
    centerNumber: number,
    metronome: Metronome,
    modal: Modal,
  ) {
    super(el, min, max, centerNumber, metronome, modal);

    this.picker.addEventListener("wheel", this.handleWheel.bind(this));
    this.picker.addEventListener("click", this.handleClick.bind(this));
  }

  handleWheel(): void {
    this.pickerBeats.classList.add("-open");
    this.centerNumber = this.metronome.againstBeat;

    document
      .querySelector(".beatPicker.beatPicker--baseBeat > .beatPicker__beats")
      .classList.remove("-open");

  }

  handleClick(): void {
    if (!this.pickerBeats.classList.contains("-open")) {
      this.pickerBeats.classList.add("-open");
      document
        .querySelector(".beatPicker.beatPicker--baseBeat > .beatPicker__beats")
        .classList.remove("-open");
    }
  }

}

export default AgainstBeatPicker;

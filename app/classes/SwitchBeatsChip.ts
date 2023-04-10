import Metronome from "./Metronome";
import BeatsUi from "./View/GuiControllers/BeatsUi";

import { SWITCH_BEATS_CHIP_SELECTOR } from "./base/constants";

/**
 * This class represents the UI controlling the switchBeats' chip.
 *
 * @name SwitchBeatsChip
 *
 * @param {HTMLButtonElement} switchBeatsChip - The chip switching the beats.
 */

class SwitchBeatsChip {
  private switchBeatsChip: HTMLButtonElement;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(public metronome: Metronome, public beats: BeatsUi) {
    this.switchBeatsChip = document.querySelector(SWITCH_BEATS_CHIP_SELECTOR);

    // Register events
    this.switchBeatsChip.addEventListener(
      "click",
      this.handleSwitchBeatsClick.bind(this)
    );
  }

  /**
   * @name handleSwitchBeatsClick
   * @description
   * Switch the beats on click.
   *
   */
  private handleSwitchBeatsClick(): void {
    [this.metronome.againstBeat, this.metronome.baseBeat] = [
      this.metronome.baseBeat,
      this.metronome.againstBeat,
    ];
    [this.beats.againstBeatValue.value, this.beats.baseBeatValue.value] = [
      this.beats.baseBeatValue.value,
      this.beats.againstBeatValue.value,
    ];
    this.beats.againstBeatValue.setAttribute(
      "value",
      this.metronome.againstBeat.toString()
    );
    this.beats.baseBeatValue.setAttribute(
      "value",
      this.metronome.baseBeat.toString()
    );
  }
}

export default SwitchBeatsChip;

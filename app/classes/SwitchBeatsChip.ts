import BeatsPicker from "./BeatsPicker";
import Metronome from "./Metronome";

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
  constructor(public metronome: Metronome, public beatsPicker: BeatsPicker) {
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
    // Swap the picker properties
    [this.beatsPicker.againstBeatPicker, this.beatsPicker.baseBeatPicker] = [
      this.beatsPicker.baseBeatPicker,
      this.beatsPicker.againstBeatPicker,
    ];
    [this.beatsPicker.againstBeatPickerContainer, this.beatsPicker.baseBeatPickerContainer] = [
      this.beatsPicker.baseBeatPickerContainer,
      this.beatsPicker.againstBeatPickerContainer,
    ];

    // Swap the open classes
    this.beatsPicker.againstBeatPickerContainer.classList.toggle("-open");
    this.beatsPicker.baseBeatPickerContainer.classList.toggle("-open");

    // Center the previously centered items
    const againstBeat = this.metronome.againstBeat;
    const baseBeat = this.metronome.baseBeat;
    this.beatsPicker.centerBeatOnLoad(againstBeat, this.beatsPicker.againstBeatPickerContainer);
    this.beatsPicker.centerBeatOnLoad(baseBeat, this.beatsPicker.baseBeatPickerContainer);

    // Update the metronome with the new centered items
    this.metronome.againstBeat = baseBeat;
    this.metronome.baseBeat = againstBeat;
  }
}

export default SwitchBeatsChip;

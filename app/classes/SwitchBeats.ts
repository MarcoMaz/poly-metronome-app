import Metronome from './Metronome';
import BeatsUi from './View/GuiControllers/BeatsUi';
import {
  SWITCH_BEATS_SELECTOR,
} from './base/constants';

/**
 * This class represents the UI controlling the SwitchBeats' chip.
 *
 * @name SwitchBeats
 *
 * @param {HTMLButtonElement} switchBeats - The chip switching the beats.
 */

class SwitchBeats {
  private switchBeats: HTMLButtonElement;

  constructor(public metronome: Metronome, public beats: BeatsUi) {
    this.switchBeats = document.querySelector(SWITCH_BEATS_SELECTOR);
    this.switchBeats.addEventListener('click', this.handleSwitchBeatsClick.bind(this));
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
    this.beats.againstBeatValue.setAttribute('value', this.metronome.againstBeat.toString());
    this.beats.baseBeatValue.setAttribute('value', this.metronome.baseBeat.toString());
  }
}

export default SwitchBeats
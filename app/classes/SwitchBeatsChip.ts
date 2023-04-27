import AgainstBeatPicker from "./AgainstBeatPicker";
import BaseBeatPicker from "./BaseBeatPicker";
import BeatsPicker from "./BeatsPicker";
import Metronome from "./Metronome";

import { SWITCH_BEATS_CHIP_SELECTOR } from "./base/constants";


const AGAINST_BEATS = document.querySelector(
  ".beatPicker--againstBeat > .beatPicker__beats"
);

const BASE_BEATS = document.querySelector(
  ".beatPicker--baseBeat > .beatPicker__beats"
);



const BEATS_PICKER_OPEN_CLASS = "-open";
const BEATS_PICKER_CENTER_CLASS = "-center";
const BEAT_PICKER_ITEM_SELECTOR = ".beatPicker__item";

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
  constructor(
    public metronome: Metronome,
    public againstBeatPicker: AgainstBeatPicker,
    public baseBeatPicker: BaseBeatPicker
  ) {
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
  public handleSwitchBeatsClick(): void {

    [this.metronome.againstBeat, this.metronome.baseBeat] = [this.metronome.baseBeat, this.metronome.againstBeat];

    const centerXnum = this.againstBeatPicker.centerNumber;
    const centerYnum = this.baseBeatPicker.centerNumber;

    const nodes = document.querySelectorAll(".-center");
    nodes.forEach((node) => {
      node.classList.remove("-center");
    });

    this.againstBeatPicker.centerNumber = centerYnum;
    this.baseBeatPicker.centerNumber = centerXnum;

    document
      .querySelector(
        `.beatPicker--againstBeat > .beatPick
        er__beats > .beatPicker__item:nth-of-type(${
          this.againstBeatPicker.centerNumber - 1
        })`
      )
      ?.classList.add(BEATS_PICKER_CENTER_CLASS);
    document
      .querySelector(
        `.beatPicker--baseBeat > .beatPicker__beats > .beatPicker__item:nth-of-type(${
          this.baseBeatPicker.centerNumber - 1
        })`
      )
      ?.classList.add(BEATS_PICKER_CENTER_CLASS);

      this.againstBeatPicker.centerBeatOnLoad();
      this.baseBeatPicker.centerBeatOnLoad();

    if (AGAINST_BEATS.classList.contains("-open")) {
      AGAINST_BEATS.classList.remove("-open");
      BASE_BEATS.classList.add("-open");
    } else {
      AGAINST_BEATS.classList.add("-open");
      BASE_BEATS.classList.remove("-open");
    }

  }
}

export default SwitchBeatsChip;

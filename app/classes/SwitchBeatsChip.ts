import AgainstBeatPicker from "./AgainstBeatPicker";
import BaseBeatPicker from "./BaseBeatPicker";
import Metronome from "./Metronome";

import { SWITCH_BEATS_CHIP_SELECTOR } from "./base/constants";

const BEATS_PICKER_OPEN_CLASS = "-open";
const BEATS_PICKER_CENTER_CLASS = "-center";
const BEATS_PICKER_CENTER_SELECTOR = ".-center";
const BEATS_PICKER_ITEM_SELECTOR = ".beatPicker__item";

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
    [this.metronome.againstBeat, this.metronome.baseBeat] = [
      this.metronome.baseBeat,
      this.metronome.againstBeat,
    ];

    const centerXnum = this.againstBeatPicker.centerNumber;
    const centerYnum = this.baseBeatPicker.centerNumber;

    const nodes = document.querySelectorAll(BEATS_PICKER_CENTER_SELECTOR);
    nodes.forEach((node) => {
      node.classList.remove(BEATS_PICKER_CENTER_CLASS);
    });

    this.againstBeatPicker.centerNumber = centerYnum;
    this.baseBeatPicker.centerNumber = centerXnum;

    this.setPickerCenterClass(
      this.againstBeatPicker.pickerBeats,
      this.againstBeatPicker.centerNumber
    );
    this.setPickerCenterClass(
      this.baseBeatPicker.pickerBeats,
      this.baseBeatPicker.centerNumber
    );

    this.againstBeatPicker.centerBeatOnLoad();
    this.baseBeatPicker.centerBeatOnLoad();

    if (
      this.againstBeatPicker.pickerBeats.classList.contains(
        BEATS_PICKER_OPEN_CLASS
      )
    ) {
      this.againstBeatPicker.pickerBeats.classList.remove(
        BEATS_PICKER_OPEN_CLASS
      );
      this.baseBeatPicker.pickerBeats.classList.add(BEATS_PICKER_OPEN_CLASS);
    } else {
      this.againstBeatPicker.pickerBeats.classList.add(BEATS_PICKER_OPEN_CLASS);
      this.baseBeatPicker.pickerBeats.classList.remove(BEATS_PICKER_OPEN_CLASS);
    }
  }

  private setPickerCenterClass(
    picker: HTMLElement,
    centerNumber: number
  ): void {
    const selector = `${BEATS_PICKER_ITEM_SELECTOR}:nth-of-type(${
      centerNumber - 1
    })`;
    const centerNode = picker.querySelector(selector);
    centerNode?.classList.add(BEATS_PICKER_CENTER_CLASS);
  }
}

export default SwitchBeatsChip;

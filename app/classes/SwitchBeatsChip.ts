import AgainstBeatPicker from "./AgainstBeatPicker";
import BaseBeatPicker from "./BaseBeatPicker";
import Metronome from "./Metronome";

import {
  SWITCH_BEATS_CHIP_SELECTOR,
  BEAT_PICKER_ITEM_SELECTOR,
  BEAT_PICKER_FOCUS_CLASS,
  BEATS_PICKER_CENTER_CLASS,
} from "./base/constants";

/**
 * This class represents the UI controlling the switchBeats' chip.
 *
 * @name SwitchBeatsChip
 *
 * @param {HTMLButtonElement} switchBeatsChip - The chip switching the beats.
 * 
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
  private handleSwitchBeatsClick(): void {
    [this.metronome.againstBeat, this.metronome.baseBeat] = [
      this.metronome.baseBeat,
      this.metronome.againstBeat,
    ];

    this.toggleBeatPickers();

    this.updateBeatPickerCenterNumbers();

    this.setPickerBeatCenterClass(
      this.againstBeatPicker.pickerBeats,
      this.againstBeatPicker.aimNumber
    );
    this.setPickerBeatCenterClass(
      this.baseBeatPicker.pickerBeats,
      this.baseBeatPicker.aimNumber
    );

    this.centerBeatsOnLoad();
  }

  /**
   * @name toggleBeatPickers
   * @description
   * Toggle the focus of the beat pickers.
   *
   */
  private toggleBeatPickers(): void {
    if (
      this.againstBeatPicker.pickerBeats.classList.contains(
        BEAT_PICKER_FOCUS_CLASS
      )
    ) {
      this.againstBeatPicker.pickerBeats.classList.remove(
        BEAT_PICKER_FOCUS_CLASS
      );
      this.baseBeatPicker.pickerBeats.classList.add(BEAT_PICKER_FOCUS_CLASS);
    } else {
      this.againstBeatPicker.pickerBeats.classList.add(BEAT_PICKER_FOCUS_CLASS);
      this.baseBeatPicker.pickerBeats.classList.remove(BEAT_PICKER_FOCUS_CLASS);
    }
  }

  /**
   * @name updateBeatPickerCenterNumbers
   * @description
   * Update the center numbers of the beat pickers based on the current beat settings.
   *
   */
  private updateBeatPickerCenterNumbers(): void {
    const againstBeatPickerCenterNumber = this.againstBeatPicker.aimNumber;
    const baseBeatPickerCenterNumber = this.baseBeatPicker.aimNumber;

    [this.againstBeatPicker.aimNumber, this.baseBeatPicker.aimNumber] = [
      baseBeatPickerCenterNumber,
      againstBeatPickerCenterNumber,
    ];
  }

  /**
   * @name setPickerBeatCenterClass
   * @description
   * Set the center class for the current beat picker.
   *
   */
  private setPickerBeatCenterClass(
    picker: HTMLElement,
    centerNumber: number
  ): void {
    const centerSelector = `${BEAT_PICKER_ITEM_SELECTOR}:nth-of-type(${
      centerNumber - 1
    })`;
    const centerNode = picker.querySelector(centerSelector);
    centerNode?.classList.add(BEATS_PICKER_CENTER_CLASS);
  }

  /**
   * @name centerBeatsOnLoad
   * @description
   * Center the selected beats when the page loads.
   *
   */
  private centerBeatsOnLoad(): void {
    this.againstBeatPicker.centerBeatOnLoad();
    this.baseBeatPicker.centerBeatOnLoad();
  }
}

export default SwitchBeatsChip;

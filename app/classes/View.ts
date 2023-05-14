import Engine from "./Engine";
import Metronome from "./Metronome";
import CanvasPicker from "./CanvasPicker";

// Refactor styling
import Modal from "./Modal";
import SwitchBeatsChip from "./SwitchBeatsChip";
import TapChip from "./TapChip";
import PlayButton from "./PlayButton";
import MuteButton from "./MuteButton";
import AgainstBeatPicker from "./AgainstBeatPicker";
import BaseBeatPicker from "./BaseBeatPicker";
import BpmKnob from "./BpmKnob";
import ControllerPanel from "./ControllerPanel";

import { BEAT_MAX, BEAT_MIN } from "./base/constants";

/**
 * This class controls the DOM elements with user interactions.
 *
 * @name View
 *
 * @param {CanvasPicker} canvasPicker           - The UI controlling the buttons selection of the different type of metronome representation.
 * @param {BpmUi} bpm                           - The UI controlling the bpm of the metronome.
 * @param {BpmKnob} BpmKnob                     - The UI controlling the bpm of the metronome.
 * @param {controllersContainerUi} controllers  - The UI controlling the app functionality.
 * @param {Modal} modal                         - The UI controlling the modal appearing when the user selects a combination which is not a polyrhythm.
 * @param {SwitchBeatsChip} switchBeatsChip     - The UI controlling the switchBeats chip.
 * @param {TapChip} tapChip                     - The UI controlling the tap chip.
 * @param {PlayButton} playButton               - The UI controlling the play chip.
 * @param {MuteButton} muteButton               - The UI controlling the mute chip.
 * @param {AgainstBeatPicker} againstBeatPicker - The UI controlling the againstBeatPicker.
 * @param {BaseBeatPicker} baseBeatPicker       - The UI controlling the baseBeatPicker.
 * @param {ControllerPanel} controllerPanel     - The UI controlling the controllerPanels.
 *
 */

class View {
  public canvasPicker: CanvasPicker;
  private modal: Modal;
  private switchBeatsChip: SwitchBeatsChip;
  private tapChip: TapChip;
  private playButton: PlayButton;
  private muteButton: MuteButton;
  private againstBeatPicker: AgainstBeatPicker;
  private baseBeatPicker: AgainstBeatPicker;
  private bpmKnob: BpmKnob;
  private controllerPanel: ControllerPanel;

  /**
   * Define DOM Elements
   */
  constructor(public metronome: Metronome, public engine: Engine) {
    this.canvasPicker = new CanvasPicker();
    this.modal = new Modal();
    this.againstBeatPicker = new AgainstBeatPicker(
      "against",
      BEAT_MIN,
      BEAT_MAX,
      this.metronome.againstBeat,
      this.metronome,
      this.modal
    );
    this.baseBeatPicker = new BaseBeatPicker(
      "base",
      BEAT_MIN,
      BEAT_MAX,
      this.metronome.baseBeat,
      this.metronome,
      this.modal
    );
    this.switchBeatsChip = new SwitchBeatsChip(
      this.metronome,
      this.againstBeatPicker,
      this.baseBeatPicker
    );
    this.bpmKnob = new BpmKnob(this.metronome);
    this.tapChip = new TapChip(this.metronome, this.bpmKnob);
    this.controllerPanel = new ControllerPanel();
    this.muteButton = new MuteButton(this.engine);
    this.playButton = new PlayButton(this.muteButton, this.engine);
  }
}

export default View;
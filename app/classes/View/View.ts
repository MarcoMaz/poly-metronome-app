import Engine from "../Engine";
import Metronome from "../Metronome";
import BpmUi from "./GuiControllers/BpmUi";
import TabSelectionUi from "./GuiContainer/TabSelectionUi";

// Refactor styling
import Modal from "../Modal";
import SwitchBeatsChip from "../SwitchBeatsChip";
import TapChip from "../TapChip";
import PlayButton from "../PlayButton";
import MuteButton from "../MuteButton";
import AgainstBeatPicker from "../AgainstBeatPicker";
import BaseBeatPicker from "../BaseBeatPicker";

/**
 * This class controls the DOM elements with user interactions.
 *
 * @name View
 *
 * @param {TabSelectionUi} tabSelection         - The UI controlling the tabs selection of the different type of metronome representation.
 * @param {BpmUi} bpm                           - The UI controlling the bpm of the metronome.
 * @param {controllersContainerUi} controllers  - The UI controlling the app functionality.
 * @param {Modal} modal                         - The UI controlling the modal appearing when the user selects a combination which is not a polyrhythm.
 * @param {SwitchBeatsChip} switchBeatsChip     - The UI controlling the switchBeats chip.
 * @param {TapChip} tapChip                     - The UI controlling the tap chip.
 * @param {PlayButton} playButton               - The UI controlling the play chip.
 * @param {MuteButton} muteButton               - The UI controlling the mute chip.
 * @param {AgainstBeatPicker} againstBeatPicker - The UI controlling the againstBeatPicker.
 * @param {BaseBeatPicker} baseBeatPicker       - The UI controlling the baseBeatPicker.
 *
 */

class View {
  public tabSelection: TabSelectionUi;
  private bpm: BpmUi;
  private modal: Modal;
  private switchBeatsChip: SwitchBeatsChip;
  private tapChip: TapChip;
  private playButton: PlayButton;
  private muteButton: MuteButton;
  private againstBeatPicker: AgainstBeatPicker;
  private baseBeatPicker: AgainstBeatPicker;

  /**
   * Define DOM Elements
   */
  constructor(public metronome: Metronome, public engine: Engine) {
    this.tabSelection = new TabSelectionUi();
    this.modal = new Modal();
    this.bpm = new BpmUi(this.metronome);
    this.againstBeatPicker = new AgainstBeatPicker(
      "against",
      2,
      9,
      this.metronome.againstBeat,
      this.metronome,
      this.modal
    );
    this.baseBeatPicker = new BaseBeatPicker(
      "base",
      2,
      9,
      this.metronome.baseBeat,
      this.metronome,
      this.modal
    );
    this.switchBeatsChip = new SwitchBeatsChip(
      this.metronome,
      this.againstBeatPicker,
      this.baseBeatPicker
    );
    this.tapChip = new TapChip(this.metronome, this.bpm);
    this.muteButton = new MuteButton(this.engine);
    this.playButton = new PlayButton(this.muteButton, this.engine);
  }
}

export default View;

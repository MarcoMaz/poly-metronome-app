import Engine from "../Engine";
import Metronome from "../Metronome";
import BeatsUi from "./GuiControllers/BeatsUi";
import BpmUi from "./GuiControllers/BpmUi";
import TabSelectionUi from "./GuiContainer/TabSelectionUi";

// Refactor styling
import Modal from "../Modal";
import SwitchBeatsChip from "../SwitchBeatsChip";
import TapChip from "../TapChip";
import PlayButton from "../PlayButton";
import MuteButton from "../MuteButton";

import BeatsPicker from "../BeatsPicker";

/** 
 * This class controls the DOM elements with user interactions.
 * 
 * @name View
 * 
 * @param {TabSelectionUi} tabSelection         - The UI controlling the tabs selection of the different type of metronome representation.
 * @param {BpmUi} bpm                           - The UI controlling the bpm of the metronome.
 * @param {BeatsUi} beats                       - The UI controlling the representation of beats in the canvas.
 * @param {controllersContainerUi} controllers  - The UI controlling the app functionality.
 * @param {Modal} modal                         - The UI controlling the modal appearing when the user selects a combination which is not a polyrhythm.
 * @param {SwitchBeatsChip} switchBeatsChip     - The UI controlling the switchBeats chip.
 * @param {TapChip} tapChip                     - The UI controlling the tap chip.
 * @param {PlayButton} playButton               - The UI controlling the play chip.
 * @param {MuteButton} muteButton               - The UI controlling the mute chip.
 *  
*/

class View {
  public tabSelection: TabSelectionUi;
  private bpm: BpmUi;
  private beats: BeatsUi;
  private modal: Modal;
  private switchBeatsChip: SwitchBeatsChip;
  private tapChip: TapChip;  
  private playButton: PlayButton;
  private muteButton: MuteButton;
  private beatsPicker: BeatsPicker;

  /**
  * Define DOM Elements
  */
  constructor(public metronome: Metronome, public engine: Engine) {
    // guiContainer (tabSelection + canvas)
    this.tabSelection = new TabSelectionUi();

    this.modal = new Modal();
    // guiControllers (beats + bpm + tap)
    this.beats = new BeatsUi(this.modal, this.metronome);
    this.bpm = new BpmUi(this.metronome);

    this.beatsPicker = new BeatsPicker(this.modal, this.metronome);
    this.switchBeatsChip = new SwitchBeatsChip(this.metronome, this.beatsPicker);
    this.tapChip = new TapChip(this.metronome, this.bpm)
    this.muteButton = new MuteButton(this.engine);
    this.playButton = new PlayButton(this.muteButton, this.engine);

  }
}

export default View;

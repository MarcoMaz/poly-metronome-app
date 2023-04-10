import Engine from "../Engine";
import Metronome from "../Metronome";
import BeatsUi from "./GuiControllers/BeatsUi";
import BpmUi from "./GuiControllers/BpmUi";
import TabSelectionUi from "./GuiContainer/TabSelectionUi";
import Tap from "../TapChip";

// Refactor styling
import Modal from "../Modal";
import SwitchBeatsChip from "../SwitchBeatsChip";
import PlayButton from "../PlayButton";
import MuteButton from "../MuteButton";

/** 
 * This class controls the DOM elements with user interactions.
 * 
 * @name View
 * 
 * @param {TabSelectionUi} tabSelection         - The UI controlling the tabs selection of the different type of metronome representation.
 * @param {Modal} modal                         - The UI controlling the modal which appears when the user selects a combination which is not a polyrhythm.
 * @param {BeatsUi} beats                       - The UI controlling the representation of beats in the canvas.
 * @param {BpmUi} bpm                           - The UI controlling the bpm of the metronome.
 * @param {Tap} tap                             - The UI controlling the "tap" chip.
 * @param {SwitchBeatsChip} switchBeats             - The UI controlling the "switchBeats" chip.
 * @param {controllersContainerUi} controllers  - The UI controlling the app functionality.
 *  
*/

class View {
  public tabSelection: TabSelectionUi;

  private beats: BeatsUi;

  private bpm: BpmUi;

  private tap: Tap;

  private modal: Modal;
  
  private switchBeatsChip: SwitchBeatsChip;
  
  private muteButton: MuteButton;

  private playButton: PlayButton;

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
    this.tap = new Tap(this.metronome, this.bpm)
    this.switchBeatsChip = new SwitchBeatsChip(this.metronome, this.beats);
    this.muteButton = new MuteButton(this.engine);
    this.playButton = new PlayButton(this.muteButton, this.engine);
  }
}

export default View;

import Engine from "../Engine";
import Metronome from "../Metronome";
import controllersContainerUi from "./ControllersContainer/ControllersContainerUi";
import BeatsUi from "./GuiControllers/BeatsUi";
import BpmUi from "./GuiControllers/BpmUi";
import TabSelectionUi from "./GuiContainer/TabSelectionUi";
import Tap from "./Tap";

// Refactor styling
import Modal from "../Modal";

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
 * @param {controllersContainerUi} controllers  - The UI controlling the app functionality.
 *  
*/

class View {
  public tabSelection: TabSelectionUi;

  private beats: BeatsUi;

  private bpm: BpmUi;

  private tap: Tap;

  public controllers: controllersContainerUi;

  private modal: Modal;

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


    // controllersContainer (sound + play)
    this.controllers = new controllersContainerUi(
      this.engine
    );
  }
}

export default View;

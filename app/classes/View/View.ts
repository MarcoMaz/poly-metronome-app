import Engine from "../Engine";
import Metronome from "../Metronome";
import controllersContainerUi from "./ControllersContainer/ControllersContainerUi";
import BeatsUi from "./GuiControllers/BeatsUi";
import BpmUi from "./GuiControllers/BpmUi";
import TabSelectionUi from "./GuiContainer/TabSelectionUi";
import WarningUi from "./GuiControllers/WarningUi";
import TapUi from "./GuiControllers/TapUi";

/** 
 * This class controls the DOM elements with user interactions.
 * 
 * @name View
 * 
 * @param {TabSelectionUi} tabSelection         - The UI controlling the tabs selection of the different type of metronome representation.
 * @param {WarningUi} warning                   - The UI controlling the warning which appears when the user selects a combination which is not a polyrhythm.
 * @param {BeatsUi} beats                       - The UI controlling the representation of beats in the canvas.
 * @param {BpmUi} bpm                           - The UI controlling the bpm of the metronome.
 * @param {TapUi} tap                           - The UI controlling the "tap" button.
 * @param {controllersContainerUi} controllers  - The UI controlling the app functionality.
 *  
*/

class View {
  public tabSelection: TabSelectionUi;

  private warning: WarningUi;

  private beats: BeatsUi;

  private bpm: BpmUi;

  private tap: TapUi;

  public controllers: controllersContainerUi;

  /**
  * Define DOM Elements
  */
  constructor(public metronome: Metronome, public engine: Engine) {
    // guiContainer (tabSelection + canvas)
    this.tabSelection = new TabSelectionUi();

    // guiControllers (warning + beats + bpm + tap)
    this.warning = new WarningUi();
    this.beats = new BeatsUi(this.warning, this.metronome);
    this.bpm = new BpmUi(this.metronome);
    this.tap = new TapUi(this.metronome, this.bpm)

    // controllersContainer (sound + play)
    this.controllers = new controllersContainerUi(
      this.engine
    );
  }
}

export default View;

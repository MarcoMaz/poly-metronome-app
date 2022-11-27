import Engine from "../Engine";
import Metronome from "../Metronome";
import controllersContainerUi from "./ControllersContainer/controllersContainerUi";
import BeatsUi from "./GuiControllers/BeatsUi";
import BpmUi from "./GuiControllers/BpmUi";
import TabSelectionUi from "./GuiContainer/TabSelectionUi";
import WarningUi from "./GuiControllers/WarningUi";

class View {
  public tabSelection: TabSelectionUi;

  private warning: WarningUi;

  private beats: BeatsUi;

  private bpm: BpmUi;

  public controllers: controllersContainerUi;

  constructor(public metronome: Metronome, public engine: Engine) {
    // guiContainer (tabSelection + canvas)
    this.tabSelection = new TabSelectionUi();

    // guiControllers (warning + beats + bpm)
    this.warning = new WarningUi();
    this.beats = new BeatsUi(this.warning, this.metronome);
    this.bpm = new BpmUi(this.metronome);

    // controllersContainer (sound + play + tap)
    this.controllers = new controllersContainerUi(
      this.engine,
      this.metronome,
      this.bpm
    );
  }
}

export default View;

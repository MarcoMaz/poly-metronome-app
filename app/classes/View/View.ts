import Engine from "../Engine";
import Metronome from "../Metronome";
import AppControllerUi from "./AppControllerUi";
import BeatsUi from "./BeatsUi";
import BpmUi from "./BpmUi";
import SelectionOptionsUi from "./SelectionOptionsUi";
import TapUi from "./TapUi";
import VolumeUi from "./VolumeUi";
import WarningUi from "./WarningUi";

class View {
  public selectionOptions: SelectionOptionsUi;

  private warning: WarningUi;

  private volume: VolumeUi;

  private bpm: BpmUi;

  private beats: BeatsUi;

  private tap: TapUi;

  public appController: AppControllerUi;

  constructor(public metronome: Metronome, public engine: Engine) {
    this.bpm = new BpmUi(this.metronome);

    this.tap = new TapUi(this.metronome, this.bpm);

    this.selectionOptions = new SelectionOptionsUi();

    this.warning = new WarningUi();

    this.beats = new BeatsUi(this.warning, this.metronome);

    this.volume = new VolumeUi(this.engine);

    this.appController = new AppControllerUi();
  }
}

export default View;

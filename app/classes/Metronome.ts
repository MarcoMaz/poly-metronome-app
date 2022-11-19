/**
 *  This class represents the metronome itself.
 * @constructor
 * @param {number} againstBeat  - The beat playing against the default beat.
 * @param {number} baseBeat     - The default beat.
 * @param {number} LCMbeats     - The LCM between against and base beat.
 * @param {number} tempo        - The tempo (in BPM = Beats Per Minute).
 */

class Metronome {
  public againstBeat: number;

  public baseBeat: number;

  public tempo: number;

  constructor(againstBeat: number, baseBeat: number, tempo: number) {
    this.againstBeat = againstBeat;
    this.baseBeat = baseBeat;
    this.tempo = tempo;
  }
}

export default Metronome;

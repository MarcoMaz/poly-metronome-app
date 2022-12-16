/**
 *  This class represents the metronome itself.
 * 
 * @name Metronome
 * 
 * @param {number} againstBeat  - The beat playing against the default beat.
 * @param {number} baseBeat     - The default beat.
 * @param {number} tempo        - The tempo (in BPM = Beats Per Minute).
 * 
 */

class Metronome {
  public againstBeat: number;

  public baseBeat: number;

  public tempo: number;

  /**
  * Define the Variables
  */
  constructor(againstBeat: number, baseBeat: number, tempo: number) {
    this.againstBeat = againstBeat;
    this.baseBeat = baseBeat;
    this.tempo = tempo;
  }
}

export default Metronome;

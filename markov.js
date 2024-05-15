/** Textual markov chain generator. */

import lodash from 'lodash';
const { sample } = lodash;


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *  //TODO: modify example here to show a branch possibility
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {

    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
      const currWord = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (currWord in chains) {
        chains[currWord].push(nextWord);
      } else {
        chains[currWord] = [nextWord];
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    let markovedText = "";

    const firstWord = this.words[0] //todo find an actually capitalized random word
    markovedText += firstWord;

    let randomWord = sample(this.chains[firstWord]);
    while (randomWord){

      // Add as space between words
      markovedText = markovedText + " " + randomWord;
      randomWord = sample(this.chains[randomWord]);
    }

    return markovedText;
  }
}

export { MarkovMachine };
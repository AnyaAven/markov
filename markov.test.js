import {
  describe,
  test,
  expect,
  beforeEach
} from "vitest";

import { MarkovMachine } from "./markov";

describe("markov machine", function () {

  let simpleMachine;

  beforeEach(function () {
    simpleMachine = new MarkovMachine("the cat in the hat.");
  });


  test("get chains", function () {

    expect(simpleMachine.chains).toEqual(
      {
        the: ['cat', 'hat.'],
        cat: ['in'],
        in: ['the'],
        'hat.': [null]
      }
    );
  });

  test("empty chains", function () {
    const emptyMachine = new MarkovMachine("");

    expect(emptyMachine.chains).toEqual(
      { '': [null] }
    );
  });

  test("should be case sensitive", function () {
    const longerTextMachine = new MarkovMachine(
      "The cat is in the hat. The cat is the cat. The hat is a cat.");

    expect(longerTextMachine.chains).toEqual(
      {
        "The": ["cat", "cat", "hat"],
        "cat": ["is", "is"],
        "is": ["in", "the", "a"],
        "in": ["the"],
        "the": ["hat.", "cat."],
        "hat.": ["The"],
        "cat.": ["The", null],
        "hat": ["is"],
        "a": ["cat."],
      }
    );
  });

  test("get text from 1 word text input", function (){
    const oneWordMachine = new MarkovMachine("oneWord");

    expect(oneWordMachine.getText()).toContain("oneWord")
  })

  test("get text from a unique text input, no duplicate words", function (){
    simpleMachine = new MarkovMachine("this is a unique sentence.");

    expect(simpleMachine.getText()).toEqual("this is a unique sentence.")
  })

});
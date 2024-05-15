import {
  describe,
  test,
  expect,
  beforeEach
} from "vitest";

import { MarkovMachine } from "./markov";

describe("markov machine", function () {

  let machine;

  beforeEach(function () {
    machine = new MarkovMachine("the cat in the hat.");
  });


  test("get chains", function () {

    expect(machine.chains).toEqual(
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


});
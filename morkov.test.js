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
        the: [ 'cat', 'hat.' ],
        cat: [ 'in' ],
        in: [ 'the' ],
        'hat.': [ null ]
      }
    );
  });

  test("empty chains", function () {
    const emptyMachine = new MarkovMachine("");

    expect(emptyMachine.chains).toEqual(
      { '': [null] }
    );
  });
});
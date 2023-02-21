import {
  URL,
  GUI_CONTROLLERS_AGAINST_BEAT_INPUT,
  GUI_CONTROLLERS_BASE_BEAT_INPUT,
  MIN_RATIO,
  MAX_RATIO,
  WARNING_SELECTOR,
  SHOW_CLASS,
} from "../../constants";

const isPoly = (firstElement: number, secondElement: number): boolean => {
  if (firstElement === secondElement) {
    return false;
  }
  const maxNumber: number = Math.max(firstElement, secondElement);
  const minNumber: number = Math.min(firstElement, secondElement);

  return maxNumber % minNumber !== 0;
};

const getInvalidCombinations = (): Array<[number, number]> => {
  const combinations: Array<[number, number]> = [];

  for (let i = MIN_RATIO; i <= MAX_RATIO; i++) {
    for (let j = MIN_RATIO; j <= MAX_RATIO; j++) {
      if (!isPoly(i, j)) {
        combinations.push([i, j]);
      }
    }
  }

  return combinations;
};

describe("Warning", () => {
  const invalidCombinations = getInvalidCombinations();

  beforeEach(() => {
    cy.visit(URL);
  });

  it("shows up for invalid combinations", () => {
    invalidCombinations.forEach((combination) => {
      const [againstBeat, baseBeat] = combination;

      cy.get(GUI_CONTROLLERS_AGAINST_BEAT_INPUT)
        .clear()
        .type(againstBeat.toString())
        .type("{enter}");

      cy.get(GUI_CONTROLLERS_BASE_BEAT_INPUT)
        .clear()
        .type(baseBeat.toString())
        .type("{enter}");

      if (isPoly(againstBeat, baseBeat)) {
        cy.get(WARNING_SELECTOR).should("not.have.class", SHOW_CLASS);
      } else {
        cy.get(WARNING_SELECTOR).should("have.class", SHOW_CLASS);
      }
    });
  });
});

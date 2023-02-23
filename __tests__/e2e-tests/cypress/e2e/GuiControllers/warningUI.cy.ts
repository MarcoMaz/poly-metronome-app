import {
  AGAINST_BEAT_VALUE_SELECTOR,
  BASE_BEAT_VALUE_SELECTOR,
  BEAT_MAX,
  BEAT_MIN,
  URL,
  WARNING_SELECTOR,
  WARNING_SHOW_CLASS,
} from "../../../../../app/classes/base/constants";

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

  for (let i = BEAT_MIN; i <= BEAT_MAX; i++) {
    for (let j = BEAT_MIN; j <= BEAT_MAX; j++) {
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

      cy.get(AGAINST_BEAT_VALUE_SELECTOR)
        .clear()
        .type(againstBeat.toString())
        .type("{enter}");

      cy.get(BASE_BEAT_VALUE_SELECTOR)
        .clear()
        .type(baseBeat.toString())
        .type("{enter}");

      if (isPoly(againstBeat, baseBeat)) {
        cy.get(WARNING_SELECTOR).should("not.have.class", WARNING_SHOW_CLASS);
      } else {
        cy.get(WARNING_SELECTOR).should("have.class", WARNING_SHOW_CLASS);
      }
    });
  });
});

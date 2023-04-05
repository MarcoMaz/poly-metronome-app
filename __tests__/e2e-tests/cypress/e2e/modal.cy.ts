import {
  AGAINST_BEAT_VALUE_SELECTOR,
  BASE_BEAT_VALUE_SELECTOR,
  BEAT_MAX,
  BEAT_MIN,
  ESC_KEY_CODE,
  MODAL_BUTTON_SELECTOR,
  MODAL_OVERLAY_SELECTOR,
  MODAL_SELECTOR,
  URL,
} from "../../../../app/classes/base/constants";

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

describe("Modal", () => {
  const invalidCombinations = getInvalidCombinations();

  beforeEach(() => {
    cy.visit(URL);
  });

  it("shows up for invalid combinations and closes on button click", () => {
    invalidCombinations.forEach((combination) => {
      const [againstBeat, baseBeat] = combination;

      cy.get(AGAINST_BEAT_VALUE_SELECTOR).clear().type(againstBeat.toString());

      cy.get(BASE_BEAT_VALUE_SELECTOR)
        .clear()
        .type(baseBeat.toString())
        .type("{enter}");

      if (isPoly(againstBeat, baseBeat)) {
        cy.get(MODAL_SELECTOR).should("not.have.class", "-show");
      } else {
        cy.get(MODAL_SELECTOR).should("have.class", "-show");
        cy.get(MODAL_BUTTON_SELECTOR).click();
      }
    });
  });

  it("shows up for invalid combinations and closes on click outside of it", () => {
    invalidCombinations.forEach((combination) => {
      const [againstBeat, baseBeat] = combination;

      cy.get(AGAINST_BEAT_VALUE_SELECTOR).clear().type(againstBeat.toString());

      cy.get(BASE_BEAT_VALUE_SELECTOR)
        .clear()
        .type(baseBeat.toString())
        .type("{enter}");

      if (isPoly(againstBeat, baseBeat)) {
        cy.get(MODAL_SELECTOR).should("not.have.class", "-show");
      } else {
        cy.get(MODAL_SELECTOR).should("have.class", "-show");
        cy.get(MODAL_OVERLAY_SELECTOR).click();
      }
    });
  });
  it("shows up for invalid combinations and closes on Esc key press", () => {
    invalidCombinations.forEach((combination) => {
      const [againstBeat, baseBeat] = combination;

      cy.get(AGAINST_BEAT_VALUE_SELECTOR).clear().type(againstBeat.toString());

      cy.get(BASE_BEAT_VALUE_SELECTOR)
        .clear()
        .type(baseBeat.toString())
        .type("{enter}");

      if (isPoly(againstBeat, baseBeat)) {
        cy.get(MODAL_SELECTOR).should("not.have.class", "-show");
      } else {
        cy.get(MODAL_SELECTOR).should("have.class", "-show");
        cy.document().trigger("keydown", { keyCode: ESC_KEY_CODE });
      }
    });
  });
});

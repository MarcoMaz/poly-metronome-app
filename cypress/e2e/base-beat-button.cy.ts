import {
  URL,
  GUI_CONTROLLERS_BASE_BEAT_BUTTON_PLUS,
  GUI_CONTROLLERS_BASE_BEAT_INPUT,
} from "../constants";

describe("Base Beat Button", () => {
  it("Should adds 1 on click", () => {
    cy.visit(URL);
    cy.get(GUI_CONTROLLERS_BASE_BEAT_BUTTON_PLUS).click();
    cy.get(GUI_CONTROLLERS_BASE_BEAT_INPUT).should("have.value", "5");
  });
});

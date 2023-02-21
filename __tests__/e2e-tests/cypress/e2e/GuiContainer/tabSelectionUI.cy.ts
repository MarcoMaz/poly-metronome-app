import {
  URL,
  TAB_SELECTION_SQUARE,
  TAB_SELECTION_PIPELINES,
  TAB_SELECTION_GRID,
  TAB_SELECTION_DOTS,
  TAB_SELECTED_CLASS,
  PLAY_BUTTON_SELECTOR,
} from "../../constants";

describe("Tab Selection", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
    });
    it("should select Squares tab if clicked", () => {
      cy.get(TAB_SELECTION_SQUARE)
        .click()
        .should("have.class", TAB_SELECTED_CLASS);
    });
    it("should select Pipeline tab if clicked", () => {
      cy.get(TAB_SELECTION_PIPELINES)
        .click()
        .should("have.class", TAB_SELECTED_CLASS);
    });
    it("should select Grid tab if clicked", () => {
      cy.get(TAB_SELECTION_GRID)
        .click()
        .should("have.class", TAB_SELECTED_CLASS);
    });
    it("should select Dots tab if clicked", () => {
      cy.get(TAB_SELECTION_DOTS)
        .click()
        .should("have.class", TAB_SELECTED_CLASS);
    });
  });

  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should select Squares tab if clicked", () => {
      cy.get(TAB_SELECTION_SQUARE)
        .click()
        .should("have.class", TAB_SELECTED_CLASS);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should select Pipeline tab if clicked", () => {
      cy.get(TAB_SELECTION_PIPELINES)
        .click()
        .should("have.class", TAB_SELECTED_CLASS);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should select Grid tab if clicked", () => {
      cy.get(TAB_SELECTION_GRID)
        .click()
        .should("have.class", TAB_SELECTED_CLASS);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should select Dots tab if clicked", () => {
      cy.get(TAB_SELECTION_DOTS)
        .click()
        .should("have.class", TAB_SELECTED_CLASS);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
  });

  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should select Squares tab if clicked", () => {
      cy.get(TAB_SELECTION_SQUARE).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(TAB_SELECTION_SQUARE).should("have.class", TAB_SELECTED_CLASS);
    });
    it("should select Pipeline tab if clicked", () => {
      cy.get(TAB_SELECTION_PIPELINES).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(TAB_SELECTION_PIPELINES).should("have.class", TAB_SELECTED_CLASS);
    });
    it("should select Grid tab if clicked", () => {
      cy.get(TAB_SELECTION_GRID).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(TAB_SELECTION_GRID).should("have.class", TAB_SELECTED_CLASS);
    });
    it("should select Dots tab if clicked", () => {
      cy.get(TAB_SELECTION_DOTS).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(TAB_SELECTION_DOTS).should("have.class", TAB_SELECTED_CLASS);
    });
  });
});

import {
    AGAINST_BEAT_VALUE_SELECTOR,
    BASE_BEAT_VALUE_SELECTOR,
    PLAY_BUTTON_SELECTOR,
    SWITCH_BEATS_CHIP_SELECTOR,
    URL,
  } from "../../../../app/classes/base/constants";
  
  describe("SwitchBeats chip", () => {
    describe("On app loading", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(SWITCH_BEATS_CHIP_SELECTOR).click();
      });
      it("should switch the beats on click", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
      });
      it("should switch the beats the switch them again on two clicks", () => {
        cy.get(SWITCH_BEATS_CHIP_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "3");
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "4");
      });
    });
  
    describe("On app playing", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(SWITCH_BEATS_CHIP_SELECTOR).click();
      });
  
      it("should switch the beats on click", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
      });
      it("should switch the beats the switch them again on two clicks", () => {
        cy.get(SWITCH_BEATS_CHIP_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "3");
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "4");
      });
    });
  
    describe("On app playing and stopping", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
      });
  
      it("should switch the beats on click", () => {
        cy.get(SWITCH_BEATS_CHIP_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
      });
      it("should switch the beats the switch them again on two clicks", () => {
        cy.get(SWITCH_BEATS_CHIP_SELECTOR).click().click();
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "3");
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "4");
      });
    });
  });
  
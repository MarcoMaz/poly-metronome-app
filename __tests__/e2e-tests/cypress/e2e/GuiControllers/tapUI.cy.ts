import {
  URL,
  BPM_VALUE_SELECTOR,
  TAP_BUTTON_SELECTOR,
  PLAY_BUTTON_SELECTOR
} from "../../constants";

describe('Tap', () => {
  it("on app loading, it should change the BPM accordingly when the button is tapped", () => {
    cy.visit(URL);
    cy.get(TAP_BUTTON_SELECTOR).click()
    cy.get(BPM_VALUE_SELECTOR).should('have.value', '30')     
  })
  it("on app playing, it should change the BPM accordingly when the button is tapped", () => {
    cy.visit(URL);
    cy.get(PLAY_BUTTON_SELECTOR).click();    
    cy.get(TAP_BUTTON_SELECTOR).click()
    cy.get(BPM_VALUE_SELECTOR).should('have.value', '30')     
  })
  it("on app playing and stopping, it should change the BPM accordingly when the button is tapped", () => {
    cy.visit(URL);
    cy.get(PLAY_BUTTON_SELECTOR).click();    
    cy.get(TAP_BUTTON_SELECTOR).click()
    cy.get(PLAY_BUTTON_SELECTOR).click();    
    cy.get(BPM_VALUE_SELECTOR).should('have.value', '30')     
  })
})
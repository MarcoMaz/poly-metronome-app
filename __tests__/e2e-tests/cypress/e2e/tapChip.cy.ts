import {
  BPM_KNOB_RANGE_SELECTOR,
  CONTROLLER_PANEL_BUTTON_BPM_SELECTOR,
  PLAY_BUTTON_SELECTOR,
  TAP_CHIP_SELECTOR,
  URL,
} from "../../../../app/classes/base/constants";

describe("Tap", () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.get(BPM_KNOB_RANGE_SELECTOR).then(($input) => {
      $input.css("width", "100px");
      $input.css("height", "20px");
      $input.css("opacity", "1");
    });
    cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).click();
  });

  it("on app loading, it should change the BPM accordingly when the button is tapped", () => {
    cy.get(TAP_CHIP_SELECTOR).click();
    cy.get(BPM_KNOB_RANGE_SELECTOR)
      .invoke("val", 30)
      .trigger("change")
      .should("have.value", "30");
  });
  it("on app playing, it should change the BPM accordingly when the button is tapped", () => {
    cy.get(PLAY_BUTTON_SELECTOR).click();
    cy.get(TAP_CHIP_SELECTOR).click();
    cy.get(BPM_KNOB_RANGE_SELECTOR)
      .invoke("val", 30)
      .trigger("change")
      .should("have.value", "30");
  });
  it("on app playing and stopping, it should change the BPM accordingly when the button is tapped", () => {
    cy.get(PLAY_BUTTON_SELECTOR).click();
    cy.get(TAP_CHIP_SELECTOR).click();
    cy.get(PLAY_BUTTON_SELECTOR).click();
    cy.get(BPM_KNOB_RANGE_SELECTOR)
      .invoke("val", 30)
      .trigger("change")
      .should("have.value", "30");
  });
});

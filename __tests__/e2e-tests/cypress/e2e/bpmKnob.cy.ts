import {
  BPM_KNOB_RANGE_SELECTOR,
  CONTROLLER_PANEL_BUTTON_BPM_SELECTOR,
  PLAY_BUTTON_SELECTOR,
  URL,
} from "../../../../app/classes/base/constants";

describe("BpmKnob", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).click();
      cy.get(BPM_KNOB_RANGE_SELECTOR).then(($input) => {
        $input.css("width", "100px");
        $input.css("height", "20px");
        $input.css("opacity", "1");
      });
    });

    it("should set value to 30 after inputting a number < 30", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 29)
        .trigger("change")
        .should("have.value", "30");
    });
    it("should set value to 30 after inputting a number = 30", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 30)
        .trigger("change")
        .should("have.value", "30");
    });
    it("should set value to the number entered after inputting a number > 30 and < 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 180)
        .trigger("change")
        .should("have.value", "180");
    });
    it("should set value to 300 after inputting a number = 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 300)
        .trigger("change")
        .should("have.value", "300");
    });
    it("should set value to 300 after inputting a number > 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 350)
        .trigger("change")
        .should("have.value", "300");
    });
  });
  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).click();
      cy.get(BPM_KNOB_RANGE_SELECTOR).then(($input) => {
        $input.css("width", "100px"); // Set the width to a non-zero value
        $input.css("height", "20px"); // Set the height to a non-zero value
        $input.css("opacity", "1");
      });
    });

    it("should set value to 30 after inputting a number < 30", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 29)
        .trigger("change")
        .should("have.value", "30");
    });
    it("should set value to 30 after inputting a number = 30", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 30)
        .trigger("change")
        .should("have.value", "30");
    });
    it("should set value to the number entered after inputting a number > 30 and < 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 180)
        .trigger("change")
        .should("have.value", "180");
    });
    it("should set value to 300 after inputting a number = 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 300)
        .trigger("change")
        .should("have.value", "300");
    });
    it("should set value to 300 after inputting a number > 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 350)
        .trigger("change")
        .should("have.value", "300");
    });
  });
  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).click();
      cy.get(BPM_KNOB_RANGE_SELECTOR).then(($input) => {
        $input.css("width", "100px"); // Set the width to a non-zero value
        $input.css("height", "20px"); // Set the height to a non-zero value
        $input.css("opacity", "1");
      });
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    
    it("should set value to 30 after inputting a number < 30", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 29)
        .trigger("change")
        .should("have.value", "30");
    });
    it("should set value to 30 after inputting a number = 30", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 30)
        .trigger("change")
        .should("have.value", "30");
    });
    it("should set value to the number entered after inputting a number > 30 and < 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 180)
        .trigger("change")
        .should("have.value", "180");
    });
    it("should set value to 300 after inputting a number = 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 300)
        .trigger("change")
        .should("have.value", "300");
    });
    it("should set value to 300 after inputting a number > 300", () => {
      cy.get(BPM_KNOB_RANGE_SELECTOR)
        .invoke("val", 350)
        .trigger("change")
        .should("have.value", "300");
      cy.get(BPM_KNOB_RANGE_SELECTOR).then(($input) => {
        $input.css("width", "");
        $input.css("height", "");
        $input.css("opacity", "");
      });
    });
  });
});

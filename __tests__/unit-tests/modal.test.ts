import { htmlPage } from "./setup";

import {
  MODAL_SELECTOR,
  MODAL_OVERLAY_SELECTOR,
  MODAL_BUTTON_SELECTOR,
  MODAL_CONTENT_SELECTOR,
  MODAL_TITLE_SELECTOR,
  MODAL_SUPPORTING_TEXT_SELECTOR,
  MODAL_MESSAGES_SELECTOR,
  MODAL_FIRST_MESSAGE_SELECTOR,
  MODAL_SECOND_MESSAGE_SELECTOR,
} from "../../app/classes/base/constants";

describe("Modal", () => {
  it("should exists", () => {
    const modal = htmlPage.querySelector(MODAL_SELECTOR);
    expect(modal).toBeTruthy();
  });

  describe("Modal overlay", () => {
    it("should exists", () => {
      const modalOverlay = htmlPage.querySelector(MODAL_OVERLAY_SELECTOR);
      expect(modalOverlay).toBeTruthy();
    });
  });

  describe("Modal content", () => {
    it("should exists", () => {
      const modalContent = htmlPage.querySelector(MODAL_CONTENT_SELECTOR);
      expect(modalContent).toBeTruthy();
    });

    describe("Title", () => {
      it("should be a H1 element", () => {
        const modalTitle = htmlPage.querySelector(MODAL_TITLE_SELECTOR);
        expect(modalTitle.tagName).toBe("H1");
      });

      it("should contain a text", () => {
        const modalTitle = htmlPage.querySelector(MODAL_TITLE_SELECTOR);
        expect(modalTitle.textContent).toBe("Are you sure?");
      });
    });

    describe("Message", () => {
      it("should be a DIV element", () => {
        const modalSupportingText = htmlPage.querySelector(
          MODAL_SUPPORTING_TEXT_SELECTOR
        );
        expect(modalSupportingText.tagName).toBe("DIV");
      });

      it("should have two children", () => {
        const modalSupportingText = htmlPage.querySelectorAll(
          MODAL_MESSAGES_SELECTOR
        );
        expect(modalSupportingText).toHaveLength(2);
      });

      it("should contain paragraphs", () => {
        const modalSupportingText = htmlPage.querySelectorAll(
          MODAL_MESSAGES_SELECTOR
        );
        const modalSupportingTextParagraphs =
          Array.prototype.slice.call(modalSupportingText);
        modalSupportingTextParagraphs.forEach(
          (element: { tagName: string }) => {
            expect(element.tagName).toBe("P");
          }
        );
      });

      describe("First paragraph", () => {
        it("should contain a text", () => {
          const modalFirstParagraph = htmlPage.querySelector(
            MODAL_FIRST_MESSAGE_SELECTOR
          );
          expect(modalFirstParagraph.textContent.trim()).toBe(
            `This is not a polyrhythm, because there is no overlapping or
              interlocking between the two rhythms.`
          );
        });
      });

      describe("Second paragraph", () => {
        it("should contain a text", () => {
          const modalFirstParagraph = htmlPage.querySelector(
            MODAL_SECOND_MESSAGE_SELECTOR
          );
          expect(modalFirstParagraph.textContent.trim()).toBe(
            "Please select at least another rhythm."
          );
        });
      });
    });

    describe("Cta", () => {
      it("should be a BUTTON element", () => {
        const modalCta = htmlPage.querySelector(MODAL_BUTTON_SELECTOR);
        expect(modalCta.tagName).toBe("BUTTON");
      });

      it("should contain a text", () => {
        const modalCta = htmlPage.querySelector(MODAL_BUTTON_SELECTOR);
        expect(modalCta.textContent).toBe("OK");
      });
    });
  });
});

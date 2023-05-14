import { htmlPage } from "./setup";

import {
  CANVAS_SELECTOR
} from '../../app/classes/base/constants'

describe("Canvas", () => {
  it("should exists", () => {
    const canvas = htmlPage.querySelector(CANVAS_SELECTOR);
    expect(canvas).toBeTruthy();
  });

  it("is a CANVAS element", () => {
    const canvas = htmlPage.querySelector(CANVAS_SELECTOR);
    expect(canvas.tagName).toBe("CANVAS");
  });
});

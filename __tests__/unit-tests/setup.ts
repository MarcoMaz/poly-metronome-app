const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../../app/index.html");
const indexHtml = fs.readFileSync(filePath, "utf8");

const dom = new JSDOM(indexHtml);
export const htmlPage = dom.window.document;
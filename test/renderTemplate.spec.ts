import { join } from "path";
import { render as ejsRender, compile as ejsCompile } from "ejs";
import { render as hbsRender, compile as hbsCompile } from "ejs";

import {
  testReactClass,
  success,
  cli,
  cleanConfigFile,
  createConfigFile,
  cleanTestOutputPath
} from "./utils";

describe("supports other template engines with `templateRender` function on config", () => {
  beforeEach(() => {
    cleanConfigFile();
    cleanTestOutputPath();
  });

  it("works with handlebars", async () => {
    createConfigFile(`
    const { compile } = require('handlebars');

    module.exports = {
      templatesPath: 'examples-handlebars',
      outputPaths: { reactClass: "test-output" },
      renderTemplate: (templateContent, context) => compile(templateContent)(context)
    };`);

    const result = await cli(["reactClass", "Person", "src"], ".");

    const outputPath = join(__dirname, "../test-output/src");

    expect(result.code).toBe(success);

    testReactClass(outputPath);
  });

  it("works with ejs", async () => {
    createConfigFile(`
    const { compile } = require('ejs');

    module.exports = {
      templatesPath: 'examples-ejs',
      outputPaths: { reactClass: "test-output" },
      renderTemplate: (templateContent, context) => compile(templateContent)(context)
    };`);

    const result = await cli(["reactClass", "Person", "src"], ".");

    const outputPath = join(__dirname, "../test-output/src");

    expect(result.code).toBe(success);

    testReactClass(outputPath);
  });
});

import { join } from "path";

import {
  testReactClass,
  testReactClassWithVariables,
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

  describe("handlebars", () => {
    beforeEach(() => {
      createConfigFile(`
    const { compile } = require('handlebars');

    module.exports = {
      generatorsPath: 'examples-handlebars',
      outputPaths: { reactClass: "test-output", reactClassWithVariables: "test-output"},
      renderTemplate: (templateContent, context) => compile(templateContent)(context)
    };`);

      cleanTestOutputPath();
    });

    it("works with reactClass templates", async () => {
      const result = await cli(["reactClass", "Person", "src"], ".");

      const outputPath = join(__dirname, "../test-output/src");

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("works with reactClassWithVariables templates", async () => {
      const result = await cli(
        [
          "reactClassWithVariables",
          "Person",
          "src",
          "firstName:string",
          "age:number"
        ],
        "."
      );

      const outputPath = join(__dirname, "../test-output/src");

      expect(result.code).toBe(success);

      testReactClassWithVariables(outputPath);
    });
  });

  describe("ejs", () => {
    beforeEach(() => {
      createConfigFile(`
    const { compile } = require('ejs');

    module.exports = {
      generatorsPath: 'examples-ejs',
      outputPaths: { reactClass: "test-output", reactClassWithVariables: "test-output" },
      renderTemplate: (templateContent, context) => compile(templateContent)(context)
    };`);

      cleanTestOutputPath();
    });

    it("works with reactClass templates", async () => {
      const result = await cli(["reactClass", "Person", "src"], ".");

      const outputPath = join(__dirname, "../test-output/src");

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("works with reactClassWithVariables templates", async () => {
      const result = await cli(
        [
          "reactClassWithVariables",
          "Person",
          "src",
          "firstName:string",
          "age:number"
        ],
        "."
      );

      const outputPath = join(__dirname, "../test-output/src");

      expect(result.code).toBe(success);

      testReactClassWithVariables(outputPath);
    });
  });

  it("works with templates engiens", async () => {
    const greeting = "Hello, world";

    const result = "Hello, world works!";

    const { renderString } = require("nunjucks");

    expect(renderString("{{greeting}} works!", { greeting })).toBe(result);

    const hogan = require("hogan.js");

    expect(hogan.compile("{{greeting}} works!").render({ greeting })).toBe(
      result
    );

    const { render } = require("pug");

    expect(render("p #{greeting} works!", { greeting })).toBe(
      `<p>${result}</p>`
    );
  });
});

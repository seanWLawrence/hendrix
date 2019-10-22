import { join } from "path";
import { renameSync } from "fs";
import {
  cleanConfigFile,
  createConfigFile,
  cleanTemplatesDirectory,
  cleanTestOutputPath,
  copyTemplatesDirectory,
  defaultTemplatesDirectoryPath,
  customTemplatesDirectoryPath,
  success,
  cli,
  testReactClass,
  testReactClassWithVariables
} from "./utils";

describe("generator", () => {
  describe("without config file", () => {
    beforeEach(async () => {
      cleanConfigFile();
      cleanTestOutputPath();
      cleanTemplatesDirectory();
      await cli([], ".");
    });

    it("creates files starting from the current working directory", async () => {
      const result = await cli(["reactClass", "Person", "test-output"], ".");

      const outputPath = join(__dirname, "../test-output");

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("creates files at a nested path", async () => {
      const result = await cli(
        ["reactClass", "Person", "test-output/nested-path"],
        "."
      );

      const outputPath = join(__dirname, "../test-output/nested-path");

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("creates files at a deeply nested path", async () => {
      const result = await cli(
        [
          "reactClass",
          "Person",
          "test-output/nested-path/and-another-one/and-another-one"
        ],
        "."
      );

      const outputPath = join(
        __dirname,
        "../test-output/nested-path/and-another-one/and-another-one"
      );

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("passes in the optional variables as {{ variables }} in the template", async () => {
      const result = await cli(
        [
          "reactClassWithVariables",
          "Person",
          "test-output",
          "firstName:string",
          "age:number"
        ],
        "."
      );

      const outputPath = join(__dirname, "../test-output");

      expect(result.code).toBe(success);

      testReactClassWithVariables(outputPath);
    });
  });

  describe("with config file", () => {
    beforeEach(async () => {
      cleanConfigFile();
      cleanTestOutputPath();
      cleanTemplatesDirectory(customTemplatesDirectoryPath);
      await cli([], ".");
      createConfigFile();
      copyTemplatesDirectory(customTemplatesDirectoryPath);
    });

    it("creates files starting from the base path in the config file", async () => {
      const result = await cli(["reactClass", "Person", "src"], ".");

      const outputPath = join(__dirname, "../test-output/src");

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("creates files at a nested path", async () => {
      const result = await cli(
        ["reactClass", "Person", "src/nested-path"],
        "."
      );

      const outputPath = join(__dirname, "../test-output/src/nested-path");

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("creates files at a deeply nested path", async () => {
      const result = await cli(
        [
          "reactClass",
          "Person",
          "src/nested-path/and-another-one/and-another-one"
        ],
        "."
      );

      const outputPath = join(
        __dirname,
        "../test-output/src/nested-path/and-another-one/and-another-one"
      );

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("passes in the optional variables as {{ variables }} in the template", async () => {
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
});

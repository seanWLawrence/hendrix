import { exec } from "child_process";
import { join, resolve as resolvePath } from "path";
import rimraf from "rimraf";
import { readdirSync, readFileSync } from "fs";
import * as mkdirp from "mkdirp";

const success = 0;
const failure = 1;

interface CLIResult {
  code: number;
  error: Error;
  stdout: any;
  stderr: any;
}

const cli = (args, cwd) => {
  return new Promise<CLIResult>(resolve => {
    exec(
      `node ${resolvePath("bin/index.js")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        const result: CLIResult = {
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        };

        resolve(result);
      }
    );
  });
};

describe("CLI", () => {
  describe("help", () => {
    const expectHelpMessage = result => {
      expect(result.code).toBe(success);
      expect(result.stdout).toContain(
        "Usage:  <template> <name> <output-path> [variables...]"
      );
      expect(result.stdout).toContain(
        "Generate files from your templates directory. Default: './hendrix'"
      );
      expect(result.stdout).toContain(
        "You can also use the alias 'h' instead of 'hendrix', for example:"
      );
      expect(result.stdout).toContain(
        "h <template> <name> <output-path> [...variables]"
      );
      expect(result.stdout).toContain(
        "For more documentation and examples, visit: https://github.com/seanWLawrence/hendrix#readme"
      );
    };

    it("displays help message if no commands are entered", async () => {
      const result = await cli([], ".");

      expectHelpMessage(result);
    });

    it("displays help message if \"-h\" or \"--help\" flags are passed", async () => {
      const result = await cli([], ".");

      expectHelpMessage(result);
    });

    describe("has generators", () => {
      it("displays list of available generators", async () => {
        const result = await cli([], ".");

        expectHelpMessage(result);

        expect(result.stdout).toContain("reactClass");
        expect(result.stdout).toContain("reactClassWithVariables");
      });
    });

    describe("does NOT have generators", () => {
      it("creates example generators and displays them", async () => {
        const result = await cli([], "../../");

        expectHelpMessage(result);

        expect(result.stdout).toContain("reactClass");
        expect(result.stdout).toContain("reactClassWithVariables");
      });
    });
  });

  describe("generator", () => {
    beforeEach(() => {
      const testOutputPath = join(__dirname, "../test-output");

      rimraf.sync(testOutputPath);
      mkdirp.sync(testOutputPath);
    });

    const testCss = fileContent => {
      const line1 = ".Person {}";

      expect(fileContent).toContain(line1);
    };

    const testSpec = fileContent => {
      const line1 = "import React from 'react'";
      const line2 = "import Person from './';";
      const line3 = "describe('Person', () => {";
      const line4 = "  it('renders', () => {});";

      expect(fileContent).toContain(line1);
      expect(fileContent).toContain(line2);
      expect(fileContent).toContain(line3);
      expect(fileContent).toContain(line4);
    };

    const testReactClass = outputPath => {
      const testComponent = fileContent => {
        const line1 = "import React, { Component } from 'react'";
        const line2 = "export default class Person extends Component {";
        const line3 = "  render() {";
        const line4 = "   return;";
        const line5 = "  };";
        const line6 = "};";

        expect(fileContent).toContain(line1);
        expect(fileContent).toContain(line2);
        expect(fileContent).toContain(line3);
        expect(fileContent).toContain(line4);
        expect(fileContent).toContain(line5);
      };

      readdirSync(outputPath).forEach(file => {
        const filePath = join(outputPath, file);
        const fileContent = readFileSync(filePath, "utf8");

        switch (file) {
          case "index.js":
            return testComponent(fileContent);

          case "index.css":
            return testCss(fileContent);

          case "index.spec.js":
            return testSpec(fileContent);
        }
      });
    };

    const testReactClasswithVariables = outputPath => {
      const testComponent = fileContent => {
        const line1 = "import React, { Component } from 'react'";
        const line2 = "import Types from 'prop-types';";
        const line3 = "export default class Person extends Component {";
        const line4 = "  render() {";
        const line5 = "   const {";
        const line6 = "     firstName,";
        const line7 = "     age,";
        const line8 = "   } = this.props;";
        const line9 = "   return;";
        const line10 = "  };";
        const line11 = "};";
        const line12 = "Person.propTypes = {";
        const line13 = "  firstName: Types.string,";
        const line14 = "  age: Types.number,";
        const line15 = "};";

        expect(fileContent).toContain(line1);
        expect(fileContent).toContain(line2);
        expect(fileContent).toContain(line3);
        expect(fileContent).toContain(line4);
        expect(fileContent).toContain(line5);
        expect(fileContent).toContain(line6);
        expect(fileContent).toContain(line7);
        expect(fileContent).toContain(line8);
        expect(fileContent).toContain(line9);
        expect(fileContent).toContain(line10);
        expect(fileContent).toContain(line11);
        expect(fileContent).toContain(line12);
        expect(fileContent).toContain(line13);
        expect(fileContent).toContain(line14);
        expect(fileContent).toContain(line15);
      };

      readdirSync(outputPath).forEach(file => {
        const filePath = join(outputPath, file);
        const fileContent = readFileSync(filePath, "utf8");

        switch (file) {
          case "index.js":
            return testComponent(fileContent);

          case "index.css":
            return testCss(fileContent);

          case "index.spec.js":
            return testSpec(fileContent);
        }
      });
    };

    it("creates files at the specified path", async () => {
      const result = await cli(["reactClass", "Person", "test-output"], ".");

      const outputPath = join(__dirname, "../test-output");

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("creates a file at a nested path", async () => {
      const result = await cli(
        ["reactClass", "Person", "test-output/nested-path"],
        "."
      );

      const outputPath = join(__dirname, "../test-output/nested-path");

      expect(result.code).toBe(success);

      testReactClass(outputPath);
    });

    it("creates a file at a deeply nested path", async () => {
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

      testReactClasswithVariables(outputPath);
    });
  });
});

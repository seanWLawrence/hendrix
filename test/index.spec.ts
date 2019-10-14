import { exec } from "child_process";
import path from "path";

const success = 0;
const failure = 1;

interface CLIResult {
  code: number;
  error: Error;
  stdout: any;
  stderr: any;
}

const cli = (args, cwd) => {
  console.log(cwd);
  return new Promise<CLIResult>(resolve => {
    exec(
      `node ${path.resolve("bin/index.js")} ${args.join(" ")}`,
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

    describe("no generators", () => {
      it("creates example generators and displays them", async () => {
        const result = await cli([], "../../");

        expectHelpMessage(result);

        expect(result.stdout).toContain("reactClass");
        expect(result.stdout).toContain("reactClassWithVariables");
      });
    });
  });
});

import {
  cleanConfigFile,
  createConfigFile,
  cli,
  cleanTemplatesDirectory,
  success,
  getTemplateFileExtension
} from "./utils";

describe("help", () => {
  beforeAll(() => {
    cleanConfigFile();
  });

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
    beforeAll(async () => {
      cleanTemplatesDirectory();

      // generate default generators
      await cli([], ".");
    });

    it("displays list of available generators", async () => {
      const result = await cli([], ".");

      expectHelpMessage(result);

      expect(result.stdout).toContain("reactClass");
      expect(result.stdout).toContain("reactClassWithVariables");
    });
  });

  describe("does NOT have generators", () => {
    beforeAll(() => {
      cleanTemplatesDirectory();
    });

    it("creates example generators and displays them (default 'mustache')", async () => {
      const result = await cli([], ".");

      expectHelpMessage(result);

      expect(result.stdout).toContain(
        "Run \"hendrix\" command again to see a list of available generators."
      );

      const result2 = await cli([], ".");

      expect(result2.stdout).toContain("reactClass");
      expect(result2.stdout).toContain("reactClassWithVariables");
      expect(getTemplateFileExtension()).toBe("mustache");
    });

    it("creates example generators and displays them", async () => {
      cleanConfigFile();
      createConfigFile(`module.exports = {
          outputPaths: {
            reactClass: 'test-output', 
            reactClassWithVariables: 'test-output'
          }
        }`);
      cleanTemplatesDirectory();

      const result = await cli(
        ["hendrix", "Person", "src", "firstName:string"],
        "."
      );

      expect(result.stdout).toContain(
        "Run \"hendrix\" command again to see a list of available generators."
      );
      const result2 = await cli([], ".");

      expectHelpMessage(result2);
      expect(result2.stdout).toContain("reactClass");
      expect(result2.stdout).toContain("reactClassWithVariables");
      expect(getTemplateFileExtension()).toBe("mustache");
    });
  });
});

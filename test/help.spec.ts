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
      "1. You can also use the alias 'h' instead of 'hendrix', for example:"
    );
    expect(result.stdout).toContain(
      "h <template> <name> <output-path> [...variables]"
    );
    expect(result.stdout).toContain(
      "2. Hendrix will generate example templates if none exist."
    );
    expect(result.stdout).toContain(
      "You can choose between 'ejs', 'hbs', or 'mustache' (default) with"
    );
    expect(result.stdout).toContain("the '--template' flag. For example:");
    expect(result.stdout).toContain("h reactClass Person src --template ejs");
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

    describe("creates example generators and displays them with (allows custom --template flag)", () => {
      beforeAll(() => {
        cleanConfigFile();
        createConfigFile(`module.exports = {
          outputPaths: {
            reactClass: 'test-output', 
            reactClassWithVariables: 'test-output'
          }
        }`);
      });

      beforeEach(() => {
        cleanTemplatesDirectory();
      });

      it("works with mustache", async () => {
        const result = await cli(
          [
            "hendrix",
            "Person",
            "src",
            "firstName:string",
            "--template",
            "mustache"
          ],
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

      it("works with handlebars", async () => {
        const result = await cli(
          [
            "hendrix",
            "Person",
            "src",
            "firstName:string",
            "--template",
            "handlebars"
          ],
          "."
        );

        expect(result.stdout).toContain(
          "Run \"hendrix\" command again to see a list of available generators."
        );

        const result2 = await cli([], ".");

        expectHelpMessage(result2);
        expect(result2.stdout).toContain("reactClass");
        expect(result2.stdout).toContain("reactClassWithVariables");
        expect(getTemplateFileExtension()).toBe("hbs");
      });

      it("works with ejs", async () => {
        const result = await cli(
          ["hendrix", "Person", "src", "firstName:string", "--template", "ejs"],
          "."
        );

        expect(result.stdout).toContain(
          "Run \"hendrix\" command again to see a list of available generators."
        );

        const result2 = await cli([], ".");

        expectHelpMessage(result2);
        expect(result2.stdout).toContain("reactClass");
        expect(result2.stdout).toContain("reactClassWithVariables");
        expect(getTemplateFileExtension()).toBe("ejs");
      });
    });
  });
});

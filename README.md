# Hendrix

Simple, Rails-like CLI tool for generating files quickly.

## Table of contents

- [Hendrix](#hendrix)
  * [Table of contents](#table-of-contents)
  * [Installation](#installation)
  * [How it works](#how-it-works)
    + [Creating generators](#creating-generators)
    + [Passing custom variables to your templates from the CLI](#passing-custom-variables-to-your-templates-from-the-cli)
    + [Passing Rails-like variables to your templates from the CLI](#passing-rails-like-variables-to-your-templates-from-the-cli)
    + [Customizing the file name](#customizing-the-file-name)
  * [Quick start](#quick-start)
    + [Generate starter templates and see instructions (recommended)](#generate-starter-templates-and-see-instructions--recommended-)
    + [Generating files](#generating-files)
    + [Generating files with `variables`](#generating-files-with--variables-)
      - [Custom variables](#custom-variables)
      - [Rails-like `variables` array](#rails-like--variables--array)
  * [Creating new templates](#creating-new-templates)
    + [Adding custom variables](#adding-custom-variables)
    + [Adding special Rails-like `variables`](#adding-special-rails-like--variables-)
  * [Configuring hendrix](#configuring-hendrix)
    + [Configuration examples](#configuration-examples)
      - [Custom templates directory](#custom-templates-directory)
      - [Custom base directories](#custom-base-directories)
      - [Custom help message add on](#custom-help-message-add-on)
      - [Custom template engines](#custom-template-engines)
  * [Contributing](#contributing)
  * [License](#license)

## Installation

In local project as dev dependency

```bash
yarn add --save-dev hendrix
```

or

```bash
npm install --save-dev hendrix
```

or without installing

> Note: with this method, all commands will need to be prefixed with `npx` to
> run.

```bash
npx hendrix <template> <name> <output-path> [...variables]
```

## Overview

### Creating generators

Hendrix uses the following folder/file structure for generators. 

```ascii
generators-folder/
  template-name-folder/
    ...template-files
```

By default, Hendrix will search for your generators in a folder called `hendrix` in your project's root directory, though this can be changed in the
[configuration](/#configuration).

For example, with the following structure:

```ascii
hendrix/
  reactClass/
    index.js.mustache
    index.spec.js.mustache
    index.scss.mustache
    README.md.mustache

  reactClassWithVariables/
    index.js.mustache
    index.spec.js.mustache
    index.scss.mustache
    README.md.mustache
```

You'll have access to the following generators:

- `reactClass`
- `reactClassWithVariables`

That will generate the following files when called:

- `index.js`
- `index.spec.js`
- `index.scss`
- `README.md`

### Passing custom variables

You can pass in custom variables using flags. You can have as many flags as you
want and the value of them will be inserted directly into your template when you
run the generator.

```bash
hendrix reactClass Person src/ --greeting hello
```

Inserts the following variables into your template:

```tsx
{
  name: 'Person', 
  greeting: 'hello'
}
```

You can also use the flag with a single hyphen, like this:

```bash
hendrix reactClass Person src/ -greeting world
```

And it'll insert the variable into your template the same way:

```tsx
{
  name: 'Person', 
  greeting: 'world'
}
```

__Important: make sure to wrap strings with spaces inside of quotes__:

```bash
hendrix reactClass Person src/ --greeting 'Hello, world!'
```

```tsx
{
  name: 'Person', 
  greeting: 'Hello, world!'
}
```

### Passing Rails-like variables

The special Rails-like `variables` are passed in as an array of objects with the property `variables`,
and use the format `name:value` in the CLI. 

You can pass as many of these variables as you like. 

For example:

```bash
hendrix reactClass Person src/ firstName:string age:number
```

Will pass the following values into your template under the name `variables`:

```tsx
{
  name: 'Person', 
  variables: [
    { name: 'firstName', value: 'string' },
    { name: 'age', value: 'number' }
  ]
}
```

### Customizing the file name

You can pass in a custom file name using the `fileName` flag.

```bash
hendrix reactClass Person src/ --fileName hello
```

Which will output (based on the default `reactClass` generator):

```ascii
src/
  Person/
    hello.js
    hello.spec.js
    hello.scss
    hello.md
```

## Getting started

### Creating generators

Running the `help` command for the first time without any defined generators will
create a new folder called `hendrix` with two generator examples called `reactClass` and `reactClassWithVariables`.

The _example_ generators will have `.mustache` files and require no additional
setup, though other template engines can be used, such as Pug, Haml, etc. by adding a custom `templateRender` function in the
[configuration](/#configuration). See [recipes](/#recipes) on the most popular
template engines for some examples.

```bash
hendrix --help
```

As expected, the `help` command will also print out instructions on how to use
Hendrix.

> To run any Hendrix command, you can use either `h` or `hendrix`. 
> We'll use `hendrix` in all of our examples, but feel free to use whatever version you
> prefer.

After running the `help` command for the first time, you'll see a message saying some example generators were created. 
Let's run the `help` command again to confirm what generators are available now.

```bash
hendrix --help
```

You should see something like:

```ascii
Available generators:
  reactClass
  reactClassWithVariables
```

## Configuration

Hendrix accepts a `.hendrixrc.js` config file in the root directory of your
project with the following properties:

```tsx
interface HendrixConfig {
  // path of your generators directory
  generatorsPath?: string;

  // base directories for your templates to go into
  outputPaths?: { [templateName: string]: string };

  // hook for calling a function after the help message is called
  // useful for adding extra information to the help message
  onPostHelp?: () => void

  // custom template render function
  // so you can use other engines like Handlebars, EJS, etc.
  renderTemplate?: (template, {[variableName: string]: any}) => string
}

// default configuration
import { render } from 'mustache';

const config = {
  generatorsPath: "hendrix",
  outputPaths: {},
  onPostHelp: () => {} /* noop */,
  renderTemplate: (template, variables) => render(template, variables)
};

module.exports = config;
````

### Recipes

#### Custom generators directory

```tsx
// .hendrixrc.js

module.exports = {
  generatorsPath: "my-custom-generators-folder"
};
```

Looks for generators in `./my-custom-generators-folder/` instead of `./hendrix.`

#### Custom output paths

```tsx
// .hendrixrc.js

module.exports = {
  outputPaths: {
    view: "src/views",
    helper: "src/helpers"
  }
};
```

```bash
hendrix view Home /home 
```

Will now create files at `/src/views/home/` (instead of `/home` without any
configuration)

```bash
hendrix helper home /home 
```

Will now create files at `/src/helpers/home/` (instead of `/home` without any
configuration)

#### Adding additional text to help message

```tsx
// .hendrixrc.js

module.exports = {
  onPostHelp: () => console.log('Some extra help message information!')
};
```

Outputs `Some extra help message information` at the bottom of the default help
message when running `hendrix --help`.

#### Custom template engines

Any template engine that takes in a string of the template and an object of
variables can be used, which should be all of them :)

##### Handlebars

```tsx
// .hendrixrc.js
const { compile } = require('handlebars');

module.exports = {
  renderTemplate: (templateFileContent, context) => compile(templateFileContent)(context)
};
```

##### EJS

```tsx
// .hendrixrc.js
const { compile } = require('ejs');

module.exports = {
  renderTemplate: (templateFileContent, context) => compile(templateFileContent)(context)
};
```

##### Pug

```tsx
// .hendrixrc.js
const { compile } = require('ejs');

module.exports = {
  renderTemplate: (templateFileContent, context) => compile(templateFileContent)(context)
};
```

##### Haml

```tsx
// .hendrixrc.js
const { compile } = require('ejs');

module.exports = {
  renderTemplate: (templateFileContent, context) => compile(templateFileContent)(context)
};
```

##### Nunjucks

```tsx
// .hendrixrc.js
const { compile } = require('ejs');

module.exports = {
  renderTemplate: (templateFileContent, context) => compile(templateFileContent)(context)
};
```

## Contributing

Contributions are welcome! Create an issue and let's talk!

## License

MIT

## TODO

- Update Pug, Haml and Nunjucks recipes
- Remove --template flag functionality
- Add spec for onPostHelp
- Change name from `templatesPath` to `generatorsPath`
- Update the table of contents
- Create a guide for creating generators from scratch, in a docs folder
- Create branch for v1 and add v1 docs to README as a reference

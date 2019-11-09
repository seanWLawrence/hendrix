# Hendrix

[![Coverage Status](https://coveralls.io/repos/github/seanWLawrence/hendrix/badge.svg?branch=master)](https://coveralls.io/github/seanWLawrence/hendrix?branch=master) [![Build status](https://travis-ci.org/seanWLawrence/hendrix.svg?branch=master)](https://travis-ci.org/seanWLawrence/hendrix.svg?branch=master)

Simple, Rails-like CLI tool for generating files quickly.

[Version 1 documentation](https://github.com/seanWLawrence/hendrix/blob/master/docs/v1.md)

## Table of contents

* [Table of contents](#table-of-contents)
* [Installation](#installation)
* [Overview](#overview)
  + [Creating generators](#creating-generators)
  + [Passing custom variables](#passing-custom-variables)
  + [Passing Rails-like variables](#passing-rails-like-variables)
  + [Customizing the file name](#customizing-the-file-name)
* [Getting started](#getting-started)
  + [Creating generators](#creating-generators-1)
* [Configuration](#configuration)
  + [Recipes](#recipes)
    - [Custom generators directory](#custom-generators-directory)
    - [Custom output paths](#custom-output-paths)
    - [Adding additional text to help message](#adding-additional-text-to-help-message)
    - [Custom template engines](#custom-template-engines)
      * [Handlebars](#handlebars)
      * [EJS](#ejs)
      * [Pug](#pug)
      * [Hogan](#hogan)
      * [Nunjucks](#nunjucks)
* [Contributing](#contributing)
* [License](#license)

## Installation

### Option 1: Install globally

```bash
yarn global add hendrix
```

or 

```bash
npm install --global hendrix
```

Then you can run `hendrix` (or `h`) anywhere in your terminal. This is
recommended when working on projects _without_ a team.

### Option 2: Local project

In local project as dev dependency

```bash
yarn add --save-dev hendrix
```

or

```bash
npm install --save-dev hendrix
```

Then you can can run `yarn hendrix` or `npm run hendrix` from your project
directory. This is recommended for projects _with_ a team so that the version of hendrix is
always the same for each user.

### Option 3: Without installing

```bash
npx hendrix <template> <name> <output-path> [...variables]
```

This is recommended for trying out Hendrix before installing.

## Overview

### Creating generators

Hendrix uses the following folder/file structure for generators. 

```ascii
generators-folder/
  template-name-folder/
    ...template-files
```

By default, Hendrix will search for your generators in a folder called `hendrix` in your project's root directory. 

> The directory name can be changed in the [configuration](#configuration).

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

> Note: __no__ flag is used!

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
setup.

> Other template engines can be used, such as Pug, Haml, etc. by adding a custom `templateRender` function in the
> [configuration](#configuration). See the [recipes](#recipes) section for examples using the most popular template engines.

```bash
hendrix --help
```

As expected, the `help` command will also print out instructions on how to use
Hendrix.

> To run any Hendrix command, you can use either `h` or `hendrix`. 
> We'll use `hendrix` in all of our examples, but feel free to use whatever version you
> prefer.

After running the `help` command for the first time, you'll see a message saying some example generators were created. 

```bash
hendrix --help
```

Afterwards, you should see something like this in your terminal:

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

  // base paths for your generated files to go into
  outputPaths?: { [templateName: string]: string };

  // hook for calling a function after the help message is called
  // useful for adding extra information to the help message
  onPostHelp?: () => void

  // custom template render function
  // so you can use other engines like Handlebars, EJS, etc.
  renderTemplate?: (template, {[variableName: string]: any}) => string
}

// default configuration
const { render } = require('mustache');

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

Will now create files from the `view` generator starting from `src/views/`, i.e. to generate files in `src/views/home` you can now run:

```bash
hendrix view Home home 
```

> Note: the path in the command is just `home`, and not `src/views/home`.

Or similarly, to generate files in `src/helpers/home` you can now run:

```bash
hendrix helper home home 
```

> Note: as in the previous command, the path is just `home`, and not `src/helpers/home` with this configuration.

#### Adding additional text to help message

```tsx
// .hendrixrc.js

module.exports = {
  onPostHelp: () => console.log('Some extra help message information!')
};
```

Outputs "`Some extra help message information!`" at the bottom of the default help
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
const { render } = require('pug');

module.exports = {
  renderTemplate: (templateFileContent, context) => render(templateFileContent, context)
};
```

##### Hogan

```tsx
// .hendrixrc.js
const hogan = require('hogan.js');

module.exports = {
  renderTemplate: (templateFileContent, context) => hogan.compile(templateFileContent).render(context)
};
```

##### Nunjucks

```tsx
// .hendrixrc.js
const { renderString } = require('nunjucks');

module.exports = {
  renderTemplate: (templateFileContent, context) => renderString(templateFileContent, context)
};
```

## Contributing

Contributions are welcome! [Create an issue](https://github.com/seanWLawrence/hendrix/issues/new) and let's talk!

## License

MIT

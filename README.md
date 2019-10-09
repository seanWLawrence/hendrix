# Hendrix

Simple, Rails-like CLI tool for generating files quickly.

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

## Usage

Getting help

```bash
hendrix --help
```

Generating files

```bash
hendrix <template> <name> <output-path> [...variables]
```

## Getting started

Let's create simple generator that scaffolds a basic React component.

1. Create template(s)

Create a folder called 'hendrix'

```bash
mkdir hendrix
```

Create a folder in the 'hendrix' directory with the name of your first template. We'll use
"reactClass" as an example, but it can be anything.

```bash
mkdir hendrix/reactClass
```

Create at least one file in this folder with a template. Make sure the file name
ends with '.mustache'

```bash
touch hendrix/reactClass/index.js.mustache
```

Add a [mustache](https://github.com/janl/mustache.js/) template to this file. Here's an example:

```mustache
import React, { Component } from 'react';

export default class {{ name }} extends Component {
  render() {
    return
  }
}
```

2. Run the generator

```bash
hendrix reactClass Person /src/components/person
```

3. View your file

You'll have a new file at `src/person/index.js` that looks like this:

```tsx
import React, { Component } from "react";

export default class Person extends Component {
  render() {
    return;
  }
}
```

## Adding variables

Let's make our first example a little better and add prop types.

1. Let's make a new template directory and file called `reactClassWithVariable`

```bash
mkdir hendrix/reactClassWithVariables && touch
hendrix/reactClassWithVariables/index.js.mustache
```

2. Copy the old template and add variables to it

```mustache
import React, { Component } from 'react';
import Types from 'prop-types';

export default class {{ name }} extends Component {
  render() {
    const {
    {{ #variables }}
      {{name}},
    {{ /variables }}
    } = this.props;

    return
  }
}

{{ name }}.propTypes = {
{{ #variables }}
  {{name}}: Types.{{value}},
{{ /variables }}
}
```

3. Call hendrix with variables

```bash
hendrix react-class Person src/components/person firstName:string age:number
```

4. View the file

Your file will look like this, cool!

````tsx
import React, { Component } from 'react';
import Types from 'prop-types';

export default class Person extends Component {
  render() {
    const {
      firstName,
      age
    } = this.props;

    return;
  }
}

Person.propTypes = {
  firstName: Types.string,
  age: Types.number
}
```

## Configuring hendrix

Hendrix accepts a `.hendrixrc.js` config file in the root directory of your
project with the following properties:

```tsx
interface HendrixConfig {
  // path of your templates directory
  templatesPath?: string;

  // base directories for your templates to go into
  outputPaths: { [templateName: string]: string };
}

// default configuration
const config = {
  templatesPath: "hendrix",
  outputPaths: {}
};

module.exports = config;
````

### Configuration examples

#### Custom templates directory

```tsx
// .hendrixrc.js

module.exports = {
  templatesPath: "my-custom-templates"
};
```

Looks for templates in `./my-custom-templates`

#### Custom base directories

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
hendrix view Home /home # creates files at /src/views/home/
```

```bash
hendrix helper home /home # creates files at /src/helpers/home/
```

## TODO

- Add ability to generate named files
- Improve help message on CLI
- Improve error handling
- Create generator command to scaffold basic hendrix template to get started
  quicker

## License

MIT

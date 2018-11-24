# Hendrix

Hendrix allows you to generate new files with boilerplate faster than ever before. Use any of the built-in templates for React, ReasonReact, Node, TypeScript, Flow, Testing, JSON, and more, or write your own! It's just a mustache template and a simple CLI prompt after all.

## Goals

-   To work out of the box
    -   Plenty of built-in templates for all of your favorite libraries and common use cases
    -   Use with `npx` without having to install anything on your computer, or install it locally per project (recommended) or globally on your computer if you prefer
-   To be as extensible as possible
    -   Extremely easy to add your own templates locally
    -   Or even use our helper functions to create your own version of Hendrix with little effort
-   To be as lean as possible
    -   Only install the templates that you need

## Technicalities

-   Get templates from node_modules
-   Get templates from user defined templates directory
-   Load config from `hendrix.config.js`
-   Load config from `package.json`
-   Install packages from CLI
-   Search packages with CLI
-   Display currently installed packages with CLI
-   Run CLI with `npx`
-   Display elegant error messages on any error that occurs with chalk
    -   No templates are installed. Please run hendrix search to find available templates
    -   Node is not installed. Hendrix is built with Node and relies on it to work. Please visit \_\_\_ for instructions on how to install Node.

## Usage

`hendrix`

## Todo

-   Install lerna and turn into a monorepo
-   Pull config from hendrix.config

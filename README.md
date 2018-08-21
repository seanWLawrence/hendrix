# ILOVESTATIC - Work in progress

SEO-optimized, 100% Google Lighthouse Score static website generator.

## The problem

Most websites don't need much, just some beautiful styling, text, images and maybe a contact form. But most developers reach for bulky frameworks and libraries like Angular, React, Ember, jQuery, or even something with a database an more complexity like WordPress, Drupal, etc. by default, because it's cool, fun to work with and everyone else is doing it.

The only problem with this, is these simple websites only need a tiny fraction of the code that's being used, which can cause slower page-loading times, poor SEO performance (since JavaScript may not be rendered by all engines as expected) and a much more complexity than it needs to have.

> More code = more slow.

## This solution

ILOVESTATIC is as simple as it gets: it takes in Markdown via a built-in CMS (no coding necessary), optimizes it for SEO and fast-loading performance, runs it through a mustache.js template and creates squeaky-clean HTML files for you to serve from anywhere, and usually for free.

All of our themes score 100% on the Google Lighthouse tool, which means that they folow all of Google's best practices and standards for websites to load content and interactivity fast, work offline, have non render-blocking JavaScript, optimized images, etc. You get all that for free, without any stress or effort.

ILOVESTATIC is also extremely flexible in its simplicity, and can be tweaked and styled any way that you like.

## Installation

This package uses NPM and Node.js.

Recommended:

As of NPM version 5.2.0, you can run this CLI tool without installing it. Simply run this line in the terminal of your project directory:

```sh
npx ilovestatic new
```

Download as global dependency:

You can also download the CLI as a standard global dependency like you normally would:

```sh
npm i -g ilovestatic
```

Or you can use the Yarn package manager

```sh
yarn global add ilovestatic
```

## Usage

Simply run the new command and you'll see a prompt that will ask you a few questions to get you all set up

```sh
npx ilovestatic new
```
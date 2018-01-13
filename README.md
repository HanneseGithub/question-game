# Base project for React apps

&copy; gotoAndPlay 2016

## Global dependencies
Project dependencies are installed and managed via [npm](https://npmjs.org/), the Node.js package manager. Make sure your [npm](https://npmjs.org/) is up-to-date by running `npm update -g npm` (this might require `sudo` on certain systems).

**Fractal** is a tool to help you build, document and integrate component/pattern libraries into your web projects. Read more on [GitHub](https://github.com/frctl/fractal). Fractal makes use of a number of ES6 features that mean it currently requires Node.js v4.0+ to run.

## Developing front-end styleguide
Run `npm run dev:styleguide`. This will compile all assets, start a local server, and starts watching for changes.

There you go, let's start workin' on the front-end! Make sure you follow [guidelines](https://bitbucket.org/gtap-dev/grunt-base-wordpress/wiki/HTML&CSS&JS%20guidelines%20by%20gotoAndPlay).

## Building styleguide
Run `npm run build:styleguide`. This will build a static styleguide to `app/styleguide/build`.

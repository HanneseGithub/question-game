# Base project for React apps

© gotoAndPlay 2019

## Global dependencies
Project dependencies are installed and managed via [npm](https://npmjs.org/), the Node.js package manager. Make sure your [npm](https://npmjs.org/) is up-to-date by running `npm update -g npm` (this might require `sudo` on certain systems).

**Fractal** is a tool to help you build, document and integrate component/pattern libraries into your web projects. Read more on [GitHub](https://github.com/frctl/fractal). Fractal makes use of a number of ES6 features that mean it currently requires Node.js v4.0+ to run.

## Styleguide
### Developing front-end styleguide
Run `npm run dev:styleguide`. This will compile all assets, start a local server, and starts watching for changes.

### Building styleguide
Run `npm run build:styleguide`. This will build a static styleguide to `app/styleguide/build`.

---

## App
### Developing app
Run `npm run dev:app`. This will compile all assets, start a local server, and starts watching for changes.

### Creating the SSL certificate
To create the ssl certificate for the webpack-dev-server go to `node_modules\webpack-dev-server\ssl` and run `openssl x509 -in server.pem -out server.crt`. Then install the certificate under `Trusted Root Certification Authorities Store` and restart browser.

### Building app
Run `npm run build:app`. This will build a app to `app/build`.

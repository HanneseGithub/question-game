# react-base
This is our base project for React projects.

## Global dependencies
- [Node.js](https://nodejs.org/) (including [npm](https://www.npmjs.com/), currently v6) - use v12
  - The current LTS version (v14) is incompatible with chokidar 2.x and fsevents 1.x used by webpack-dev-server 3.x

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

## Copyright
© gotoAndPlay 2021

'use strict';

/* To prevent error in detailed preview tabs otherwise app.publicFolder is defined on preview render */
global.app = {
    publicFolder: '/',
};

/**
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();
const pkg = require('./package.json');
const nighthawkTheme = require('@gotoandplay/nighthawk');
const tsxAdapter = require('@gotoandplay/fractal-tsx-adapter')({
    // If your app uses server-side rendering, change this to 'ssr: true'.
    // Otherwise SSR is only used for tests.
    ssr: global.isRunningTests === true,
    wrapperElements: [
        {
            component: '@icon-provider',
            props: {
                getPath: (name) => global.app.publicFolder + 'inc/svg/icons.svg#' + name,
            },
        },
    ],
});

/**
 * Give your project a title.
 */
fractal.set('project.title', 'Project Web Style Guide');
fractal.set('project.version', pkg.version);

/**
 * Tell Fractal where to look for components.
 */
fractal.components.engine(tsxAdapter);
fractal.components.set('path', 'src/patterns');
fractal.components.set('title', 'Patterns');
fractal.components.set('default.preview', '@preview');
fractal.components.set('statuses', {
    prototype: {
        description: 'Do not implement.',
        key: 'prototype',
        label: 'Prototype',
    },
    ready: {
        description: 'Ready to implement.',
        key: 'ready',
        label: 'Ready',
    },
    wip: {
        description: 'Work in progress. Implement with caution.',
        key: 'wip',
        label: 'WIP',
    },
});
fractal.components.set('default.status', null);
fractal.components.set('default.context.language', 'en-US');
fractal.components.set('ext', '.tsx');

fractal.web.set('server.sync', true);
fractal.web.set('server.syncOptions', {
    open: true,
});

/**
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', 'temp/public');
fractal.web.set('builder.dest', 'build/styleguide');

fractal.web.theme(nighthawkTheme({
    /*
     * nighthawk also uses an 'html' panel by default, which is empty when not using SSR.
     * If you use SSR, you can remove this option to restore the HTML panel, but be
     * aware of its performance cost as all components will then be rendered twice.
     */
    panels: ['preview', 'view', 'context', 'resources', 'info'],
}));

const path    = require('path');
const fractal = require('../../fractal.config.js');

function FractalModuleResolverPlugin(source, target) {
    this.source = source;
    this.target = target;
}

FractalModuleResolverPlugin.prototype.apply = function(resolver) {
    var target = this.target;

    resolver.plugin('module', function(request, callback) {
        //console.log(callback);

        return fractal.components.load().then(function() {
            const component = fractal.components.find(request.request);

            if (request.request.substr(0, 1) === '@') {
                //console.log(request.request);
                //console.log(component);
            }

            if (component) {
                return resolver.doResolve('resolve', {
                    directory: request.directory,
                    path: request.path,
                    query: request.query,
                    request: component.viewPath,
                }, `resolve ${request.request} to ${component.viewPath}`, callback);
            } else {
                return callback();
            }
        });
    });
}

module.exports = FractalModuleResolverPlugin;

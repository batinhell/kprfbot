(function() {
    'use strict';

    var j = require('path').join;

    function Load() {}

    Load._controllersDir = j(__dirname, '../', 'controllers');

    Load._servicesDir = j(__dirname, '../', 'services');

    Load._modelsDir = j(__dirname, '../', 'models');

    Load.controller = function(id) {
        if (!id) { id = 'base'; }
        return require(j(Load._controllersDir, id));
    };

    Load.service = function(id) {
        if (!id) { id = 'base'; }
        return require(j(Load._servicesDir, id));
    };

    Load.model = function(id) {
        if (!id) { id = 'base'; }
        return require(j(Load._modelsDir, id));
    };

    Load.config = function () {
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
            return require('../config/config.production');
        } else {
            return require('../config/config');
        }
    };

    Load.counter = function () {
        return require('./counter');
    };

    module.exports = Load;

})();
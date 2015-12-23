var angular = require('angular');
var ngResource = require('angular-resource');
var ngSanitize = require('angular-sanitize');

(function(angular){
  'use strict';

  angular.module("appStore", ['ngResource', 'ngSanitize'])
      .controller('controller', Controller)
      .factory('appResource', Service)
      .service('queryHelper', QueryHelper)
      .constant('clientConfig', ClientConfig);

})(angular)


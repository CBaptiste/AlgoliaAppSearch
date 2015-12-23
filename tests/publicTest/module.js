var Controller = require('../../public/js/controller.js');
var Service = require('../../public/js/service.js');
var QueryHelper = require('../../public/js/helper/queryHelper.js');
var ClientConfig = require('../../public/js/helper/clientConfig.js');

(function(angular){
  'use strict';

  angular.module("appStore", ['ngResource', 'ngSanitize'])
      .controller('controller', Controller)
      .factory('appResource', Service)
      .service('queryHelper', QueryHelper)
      .constant('clientConfig', ClientConfig);

})(angular)


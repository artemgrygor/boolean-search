(function (window, angular, undefined) {
	'use strict';

	var module angular.module('ngBooleanSearch', []);
	module.provider('ngBooleanSearch', function(){

		this.$get = ['$document', '$templateCache', '$compile', '$q', '$http', '$rootScope', '$timeout',
			function ($document, $templateCache, $compile, $q, $http, $rootScope, $timeout) {

				var publicMethods = {

					test: function(){
						return 42;
					}
				};

				return publicMethods;
			}];

	});	
})(window, window.angular);

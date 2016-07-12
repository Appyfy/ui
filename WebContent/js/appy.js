'use strict';

var appy = angular.//
	module('appy', ['ngRoute','ngResource','ngSanitize','ngTouch','ui','ui.bootstrap','angular-carousel']).//
    config([ '$routeProvider', '$locationProvider', '$httpProvider', config ]);

appy.run(function($rootScope, $http) {});

$(document).ready(function() {
    $.material.init();
});

/*
appy.directive('ngDateTimePicker', function($timeout) {
	return {
		require : '?ngModel',
		link : function(scope, element, attrs, ngModel) {
			element.bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', minDate : new Date() });
		}
	};
});
*/

/*
window.onbeforeunload = function (e) {
    var e = e || window.event;
    e.preventDefault();
    var msg = "Do you really want to leave this page?"
    // For IE and Firefox
    if (e) {
        e.returnValue = msg;
    }
    // For Safari / chrome
    return msg;
 };
*/
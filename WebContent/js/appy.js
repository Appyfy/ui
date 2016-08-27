'use strict';

var appy = angular.//
	module('appy', ['ngRoute','ngResource','ngSanitize','ngTouch','ui','ui.bootstrap','angular-carousel']).//
    config([ '$routeProvider', '$locationProvider', '$httpProvider', config ]);

appy.directive("sparkline", function () {

    return {
        restrict: "E",
        scope: { data: "@" },
        compile: function (tElement, tAttrs, transclude) {
            tElement.replaceWith("<span>" + tAttrs.data + "</span>");
            return function (scope, element, attrs) {
                attrs.$observe("data", function (newValue) {
                    element.sparkline(JSON.parse(newValue), { type: 'line', width: '96%', height: '80px', barWidth: 11, barColor: 'blue' });
                });
            };
        }
    };
});

appy.directive("map", function () {

    return {
        restrict: "E",
        scope: { data: "@" },
        compile: function (tElement, tAttrs, transclude) {
            return function (scope, element, attrs) {
            	var mapProp = {
      			  center:new google.maps.LatLng(28.70406,77.10249),
      			  zoom: 7,
      			  mapTypeId: google.maps.MapTypeId.ROADMAP
      			};
            	new google.maps.Map(element, mapProp);
            };
        }
    };
});

appy.run(function($rootScope, $http) {});

$(document).ready(function() {
    $.material.init();
    initDatabase();
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
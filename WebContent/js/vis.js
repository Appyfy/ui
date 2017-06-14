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
            	/*var mapProp = {
      			  center:new google.maps.LatLng(28.70406,77.10249),
      			  zoom: 7,
      			  mapTypeId: google.maps.MapTypeId.ROADMAP
      			};
            	new google.maps.Map(element, mapProp);*/
            };
        }
    };
});
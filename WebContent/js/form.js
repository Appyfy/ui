'use strict';

function FormCtrl($rootScope, $scope) {

	$rootScope.populateFormData = function(data) {
		$scope.data = $rootScope.data[$scope.panel.data.id][0] || {};
		$scope.data = angular.extend($scope.data, $scope.data.fields);
	};

	if($scope.panel.data){
//		if($scope.panel.data.type == 'edit' || $scope.panel.data.type == 'view') {
//			if($scope.panel.data.params) {
//				$scope.panel.data.params.date = moment().format("DD-MM-YYYY");
//				$rootScope.fetchFieldData($scope.panel, undefined, $rootScope.populateFormData);
//			} else {
				$rootScope.populateFormData();
//			}
//		}
	}
	
	$rootScope.serializeFormData = function() {
		var scope = $(event.target).scope();

		var obj = { "fields" : {} };
		if(scope.data.ID) {
			obj.ID = scope.data.ID;
		}
		if (scope.panel.data.params) {
			obj = angular.extend(obj, scope.panel.data.params);
		}

		$.each(scope.panel.fields, function(indx, field) {
			var value = scope.data[field.id];
			if (value) {
				obj.fields[field.id] = value;
			}
		});
		
		obj.date = moment().format("DD-MM-YYYY");
		return obj;
	};
		
	// Search
	$rootScope.doSearch = function(panel) {
		var queryObj = $rootScope.serializeFormData();
		$rootScope.fetchData(panel.data.id, panel.data.name, queryObj);
		$rootScope.loadPage(panel.resultPage);
	};
	
	// Save
	$rootScope.doSave = function(panel) {
		var dataObj = $rootScope.serializeFormData(panel);
		$rootScope.saveObject(panel.data.name, dataObj);
	};

}
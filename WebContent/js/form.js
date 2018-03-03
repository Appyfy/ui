'use strict';

function FormCtrl($rootScope, $scope, $timeout) {

	$rootScope.populateFormData = function() {
		if($rootScope.action ==='EDIT') {
			var data = $rootScope.data[$scope.panel.data.id];
			if(!data) return;
			$rootScope.formData = data[0] || {};
			$rootScope.formData = angular.extend($scope.formData, $scope.formData.fields);
		} else {
			$rootScope.formData = {};
		}
		
		$timeout(function(){$('input').trigger('change')},100);	
		
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
		if(scope.formData.ID) {
			obj.ID = scope.formData.ID;
		}
		if (scope.panel.data.params) {
			obj = angular.extend(obj, scope.panel.data.params);
		}

		$.each(scope.panel.fields, function(indx, field) {
			var value = scope.formData[field.id];
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
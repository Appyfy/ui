'use strict';

function ListCtrl($rootScope, $scope) {

	$scope.data = $rootScope.data[$scope.panel.data.id];

	if(!$scope.data && $scope.panel.data.rows) {
		$scope.data = { "rows" : $scope.panel.data.rows }; 
	}
	
	if(!$scope.data && $scope.panel.data) {
		$rootScope.fetchFieldData($scope.panel);
	}

}
'use strict';

function TableCtrl($rootScope, $scope) {

	$scope.summary = {};
	$rootScope.calculateSummary = function() {
		var rows = $rootScope.data[$scope.panel.data.id];
		var columns = $scope.panel.columns;
		for ( var i = 0; i < rows.length; i++) {
			for ( var j = 0; j < columns.length; j++) {
				if(columns[j].summary) {
					$scope.summary[columns[j].name] = ( $scope.summary[columns[j].name] || 0 ) + rows[i][columns[j].name];  
				}
			}
		}
	};
	
	if($scope.panel.data.rows) {
		$rootScope.data[$scope.panel.data.id] = $scope.panel.data.rows; 
	}
	
	var rows = $rootScope.data[$scope.panel.data.id];
	if(!rows) {
		$rootScope.fetchFieldData($scope.panel, undefined, $rootScope.calculateSummary);
	} else {
		$rootScope.calculateSummary();
	} 
	
}
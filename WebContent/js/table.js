'use strict';

function TableCtrl($rootScope, $scope) {

	$scope.summary = {};
	$rootScope.calculateSummary = function(data) {
		$scope.data = { "rows" : data };
		var rows = $scope.data.rows;
		var columns = $scope.panel.columns;
		if(!rows || !columns) { 
			return; 
		}
		for ( var i = 0; i < rows.length; i++) {
			for ( var j = 0; j < columns.length; j++) {
				if(columns[j].summary) {
					$scope.summary[columns[j].name] = ( $scope.summary[columns[j].name] || 0 ) + rows[i][columns[j].name];  
				}
			}
		}
	};
	
	if($scope.panel.data && $scope.panel.data.rows) {
		$scope.data = { "rows" : $scope.panel.data.rows }; 
	}
	
	if(!$scope.data.rows) {
		$rootScope.fetchFieldData($scope.panel, undefined, $rootScope.calculateSummary);
	} else {
		$rootScope.calculateSummary($scope.data);
	}
	
	$rootScope.doFetch = function(params, row, scope) {
		$rootScope.fetchData(scope.panel.data.id, scope.panel.data.name, { "ID" : row.ID }, 
			function () { 
				$rootScope.loadPage($scope.panel.editPage)
			}
		);
	};
	
}
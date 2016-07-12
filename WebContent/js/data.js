
'use strict';

function createQuery(queryObj) {
	var queryStr = '';
	for ( var key in queryObj) {
		var value = queryObj[key];
		if(value) {
			queryStr += '&' + key + '=' + value; 
		}
	}
	return queryStr;
}

function DataCtrl($rootScope, $http) {
	
	$rootScope.data = {};
	
	// Value
	$rootScope.setValue = function(id, value) {
		$rootScope.data[id] = value;
	};
	
	$rootScope.getValue = function(id) {
		return $rootScope.data[id];
	};
	
	$rootScope.resetValue = function(id) {
		$rootScope.setValue(id,'');
	};
	
	// Data
	$rootScope.fetchData = function(id, name, queryObj, callback) {
		var queryStr = createQuery(queryObj);
		var dataURL = APPYBE_BASE_URL + '/data/' + name + '/' + queryStr;
		$http.get(dataURL).success(function(data) {
			delete $rootScope.data[id];
			$rootScope.data[id] = data;
			if(callback) {
				callback();
			}
		});
	};
	
	$rootScope.saveObject = function(name, obj) {
		var dataURL = APPYBE_BASE_URL + '/data/' + name;
		$http.post(dataURL, obj);
	};
	
	// Field
	$rootScope.fetchFieldData = function(field, value, callback) {
		value = value || field.data.parent;
		var queryObj = {};
		// only undefined not blank
		if(value !== undefined) {
			queryObj = { "parent" :  value };
		}
		if(field.data.params) {
			queryObj = angular.extend(queryObj, field.data.params); 
		}
		$rootScope.fetchData(field.data.id, field.data.name, queryObj, callback);
	};
	
	// Lookup
	$rootScope.fetchLookupData = function(field, value) {
		$rootScope.fetchFieldData(field, value);
		$rootScope.resetValue(field.id);
	};
	
	$rootScope.fetchLookupChainedData = function(field) {
		if(field.chain) {
			var value = $rootScope.getValue(field.id);
			if(value) {
				$rootScope.fetchLookupData(field.chain, value);
			}
		}
	};
	
	// Search
	$rootScope.doSearch = function(panel) {
		var queryObj = {};
		for ( var indx in panel.fields) {
			var field = panel.fields[indx];
			if(!field.chain) {
				var value = $rootScope.getValue(field.id);
				if(value) {
					queryObj[field.id] = value;
				}
			}
		}
		if(panel.data.params) {
			queryObj = angular.extend(queryObj, panel.data.params); 
		}
		$rootScope.fetchData(panel.data.id,panel.data.name, queryObj);
		$rootScope.loadPage(panel.resultPage);
	};
	
	// Bar code
	$rootScope.scan = function(target) {
		cordova.plugins.barcodeScanner.scan(function(value){
			$rootScope.data[target] = value.text;
		},
		function(error) {
			alert('Error Occured' + error);
		});
	};
	
	//  Action	
	$rootScope.doAction = function(action,row) {
		if(row.success){
			return;
		}
		try {
			var func = action.func;
			var funcDef = $rootScope[func];
			if(!funcDef) {
				funcDef = eval(func);
			}
			if(funcDef) {
				funcDef(row);
			}
		} catch(error) {
			console.log(error.stack);
		}
		
		row.success = true;
	};
	
}
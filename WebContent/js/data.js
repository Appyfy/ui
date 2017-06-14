'use strict';

function DataCtrl($rootScope, $http) {

	$rootScope.data = {};
	$rootScope.WebSQLSB = new WebSQLDB();
	$rootScope.WebSQLSB.init();
	
	// Value
	$rootScope.setValue = function(id, value) {
		$rootScope.data[id] = value;
	};
	$rootScope.getValue = function(id) {
		return $rootScope.data[id];
	};
	$rootScope.resetValue = function(id) {
		$rootScope.setValue(id, '');
	};
	
	$rootScope.createQuery = function(queryObj) {
		var queryStr = '';
		$.each(queryObj, function(key, value) {
			queryStr += '&' + key + '=' + value;
		});
		return queryStr;
	};

	// Data
	$rootScope.fetchData = function(id, name, queryObj, callback) {
		var queryStr = $rootScope.createQuery(queryObj);
		var dataURL = APPYBE_BASE_URL + '/data/' + name + '/' + queryStr;
		$http.get(dataURL).success(function(data) {
			delete $rootScope.data[id];
			$rootScope.data[id] = data;
			if (callback) {
				callback(data);
			}
		});
	};

	$rootScope.saveObject = function(name, dataObj, callback) {
		var dataURL = APPYBE_BASE_URL + '/data/' + name;
		$http.post(dataURL, dataObj).success(function(data){
			if(callback) {
				callback(data);
			}
		});
	};
	

	// Custom Endpoint
	$rootScope.sendObject = function(endpoint, callback) {
		var url = APPYBE_BASE_URL + '/' + endpoint;
		var data = _data();
		if(Object.keys(data).length == 0){
			return;
		}
		var id = _dataConfig().id;
		$http.post(url, _data(), { params : _action().params }).success(function(data){
			delete $rootScope.data[id];
			$rootScope.data[id] = data;
			if(callback) {
				callback(data);
			}
		});
	};
	

	// Field
	$rootScope.fetchFieldData = function(field, value, callback) {
		if(!field.data) return;
		
		if(field.data.source === 'LOCAL') {
			$rootScope.WebSQLSB.fetchRows(field.data.name, undefined, callback);
			return;
		}
		
		var queryObj = {};
		// only undefined not blank
		value = value || field.data.parent;
		if (value !== undefined) {
			queryObj.parent = value;
		}
		queryObj = angular.extend(queryObj, field.data.params || {});
		$rootScope.fetchData(field.data.id, field.data.name, queryObj, callback);
	};

	$rootScope.fetchFieldChainedData = function(field) {
		if (field.chain) {
			var value = $rootScope.getValue(field.id);
			if (value) {
				$rootScope.fetchFieldData(field.chain, value);
			}
		}
	};

	// Lookup
	$rootScope.fetchLookupData = function(field, value) {
		$rootScope.fetchFieldData(field, value);
		$rootScope.resetValue(field.id);
	};

	$rootScope.fetchLookupChainedData = function(field) {
		if (field.chain) {
			var value = $rootScope.getValue(field.id);
			if (value) {
				$rootScope.fetchLookupData(field.chain, value);
			}
		}
	};

	// List
	$rootScope.fetchListChainedData = function(field, row) {
		if (field.chain && row) {
			$rootScope.fetchFieldData(field.chain, row);
		}
	};
	
	// Image
	$rootScope.getImageURI = function(img) {
		return APPYSTR_BASE_URL + '/' + $rootScope.app + '/images/' + img.path;
	};
	
	// Action
	$rootScope.doAction = function(action, row) {
		if (row.success) {
			return;
		}
		try {
			var func = action.func;
			var funcDef = $rootScope[func] || eval(func);
			if (funcDef) {
				funcDef(action.params, row);
			}
		} catch (error) {
			console.log(error.message);
			//console.log(error.stack);
		}
	};
	
}
'use strict';

function createQuery(queryObj) {
	var queryStr = '';
	$.each(queryObj, function(key, value) {
		queryStr += '&' + key + '=' + value;
	})
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
		$rootScope.setValue(id, '');
	};

	// Data
	$rootScope.fetchData = function(id, name, queryObj, callback) {
		var queryStr = createQuery(queryObj);
		var dataURL = APPYBE_BASE_URL + '/data/' + name + '/' + queryStr;
		$http.get(dataURL).success(function(data) {
			delete $rootScope.data[id];
			$rootScope.data[id] = data;
			if (callback) {
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
		if (value !== undefined) {
			queryObj = {
				"parent" : value
			};
		}
		if (field.data.params) {
			queryObj = angular.extend(queryObj, field.data.params);
		}
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
		if (field.chain) {
			var value = row;
			if (value) {
				$rootScope.fetchLookupData(field.chain, value);
			}
		}
	};
	
	// Image
	$rootScope.getImageURI = function(img) {
		return APPYSTR_BASE_URL + '/' + $rootScope.app + '/images/' + img.path;
	};

	// Sparkline
	
	
	
	// Search
	$rootScope.doSearch = function(panel) {
		var queryObj = {};
		for ( var indx in panel.fields) {
			var field = panel.fields[indx];
			if (!field.chain) {
				var value = $rootScope.getValue(field.id);
				if (value) {
					queryObj[field.id] = value;
				}
			}
		}
		if (panel.data.params) {
			queryObj = angular.extend(queryObj, panel.data.params);
		}
		$rootScope.fetchData(panel.data.id, panel.data.name, queryObj);
		$rootScope.loadPage(panel.resultPage);
	};

	// Action
	$rootScope.doAction = function(action, row) {
		if (row.success) {
			return;
		}
		try {
			var func = action.func;
			var funcDef = $rootScope[func];
			if (!funcDef) {
				funcDef = eval(func);
			}
			if (funcDef) {
				funcDef(row);
			}
		} catch (error) {
			console.log(error.stack);
		}
	};
	
}
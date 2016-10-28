'use strict';

function InitApp($routeParams, $rootScope) {

	$rootScope.app = $routeParams.app;
	$rootScope.role = $routeParams.role || 'index';
	
//	$rootScope.APPYCDN_BASE_URL = APPYCDN_BASE_URL;
//	$rootScope.APPYUI_BASE_URL = APPYUI_BASE_URL;
//	$rootScope.APPYSTR_BASE_URL = APPYSTR_BASE_URL;
//	$rootScope.APPYBE_BASE_URL = APPYBE_BASE_URL;
	
//	try {
//		injectJS(APPYSTR_BASE_URL + '/' + $rootScope.app + '/app.js');
//		defer(winLib, $rootScope.app, function(){
//			initCustomEventHandler($rootScope);
//		});
//	} catch(error) {
//		console.log(error);
//	}
	
//	$rootScope.loadApp($routeParams.page);
}

function config($routeProvider, $locationProvider, $httpProvider) {
    	
	//$locationProvider.html5Mode(true);
	
  	$routeProvider.
  	when('/:app', {  templateUrl : '/partials/body.html', controller: InitApp }).
  	when('/:app/:role', {  templateUrl : '/partials/body.html', controller: InitApp }).
  	when('/:app/:role/:page', {  templateUrl : '/partials/body.html', controller: InitApp }).
    otherwise({redirectTo: '/404'});

  	$httpProvider.interceptors.push(function($q, $rootScope) {
  		
  		return {
  			'request': function(request) {
  				
  				if(request.url.endsWith(".html")) {
  					request.url = APPYUI_BASE_URL + request.url; 
  				} else if(request.url.endsWith(".json")) {
  					request.url = APPYSTR_BASE_URL + '/' + $rootScope.app + '/' + $rootScope.role + request.url; 
  				}
  				
  				return request;
  			},
  			'requestError': function(error) {
  				return $q.reject(error);
  			},
  			'response': function(response) {
  				return response;
  			},
  			'responseError': function(error) {
  				return $q.reject(error);
  			}
		  
  		};
	});

}
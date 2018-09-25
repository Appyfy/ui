'use strict';

function initApp($routeParams, $rootScope) {

	$rootScope.app = $routeParams.app;
	$rootScope.role = $routeParams.role || 'index';
	$rootScope.page = $routeParams.page;
	
	if($routeParams.page){
		$rootScope.loadPage($rootScope.page);
	}
	
	try {
		injectJS(APPYSTR_BASE_URL + '/' + $rootScope.app + '/app.js');
		defer(winLib, $rootScope.app, function(){
			initAppCustom($rootScope);
		});
	} catch(error) {
		console.log(error);
	}
	
}

function config($routeProvider, $locationProvider, $httpProvider) {
    	
	//$locationProvider.html5Mode(true);
	
  	$routeProvider.
  	when('/:app', {  templateUrl : '/partials/body.html', controller: initApp }).
  	when('/:app/:role', {  templateUrl : '/partials/body.html', controller: initApp }).
  	when('/:app/:role/:page', {  templateUrl : '/partials/body.html', controller: initApp }).
    otherwise({redirectTo: '/index'});

  	$httpProvider.interceptors.push(function($q, $rootScope) {
  		
  		return {
  			'request': function(request) {
  				
  				if(request.url.startsWith("/partials")) {
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
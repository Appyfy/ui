'use strict';

function NavCtrl($rootScope, $http, $scope) {

	$rootScope.arrow = false;
	$rootScope.header = "";
	$rootScope.pageStack = [];
	
	$rootScope.setHeader = function(header) {
		$rootScope.header = header;
	};
	
	$rootScope.toggleNavbar = function() {
//		if($(document).width() > 768) {
			$("#wrapper").toggleClass("toggled");
//		}
	};
	
	$rootScope.navigatePage = function(pageInfo) {
		$rootScope.action = 'NAVIGATE';
		$rootScope.loadPage(pageInfo.name, pageInfo.header);
		if($(document).width() < 768) {
			$rootScope.toggleNavbar();
		}
	};
	
	$rootScope.navigatePageAction = function(params, row) {
		$rootScope.navigatePage(row);
	};

	$rootScope.navigateBack = function() {
		if($rootScope.pageStack.length > 0){
			var pageInfo = $rootScope.pageStack.pop();
			$rootScope.loadPage(pageInfo.name, pageInfo.header, true);
		}
	};
	
	$rootScope.navigate = function() {
		if($rootScope.arrow) {
			$rootScope.navigateBack();
		} else {
			$rootScope.toggleNavbar();
		}
	};
	
	var rx = /INPUT|SELECT|TEXTAREA/i;
    $(document).bind("keydown keypress", function(e) {
    	if( ( e.altKey && e.keyCode == 37 /*back arrow*/ ) || e.keyCode == 8 /*backspace*/ ) {
	        if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ) {
	            e.preventDefault();
	            $rootScope.navigateBack();
	        }
	    }
	});

	$rootScope.loadApp = function(pageName) {
		$http.get('/app.json').success(function(data) {
			
			$rootScope.appConfig = data;
			
			if($rootScope.appConfig.usePageStack === undefined) {
				$rootScope.appConfig.usePageStack = true;
			}
			
			if($rootScope.appConfig.showNav === undefined) {
				$rootScope.appConfig.showNav =  true;
		    }


			document.title = $rootScope.appConfig.title;
			$rootScope.setHeader($rootScope.appConfig.title);
			
			if(pageName) {
				$rootScope.loadPage(pageName);
			} else { 
				var homePage = $rootScope.appConfig.homePage; 
				if(homePage) {
					$rootScope.loadPage(homePage.name, homePage.header);
				}
			}

			if($rootScope.appConfig.navbar == "NONE") {
				$rootScope.appConfig.showNav = false;
			} else {
				$rootScope.loadNav();
				if($rootScope.appConfig.navbar == "HIDDEN") {
					$rootScope.toggleNavbar();
				}
			}
		});
	};
	
	$rootScope.loadNav = function() {
		
		$http.get('/nav.json').success(function(data) {
			$rootScope.data.navConfig = { rows : data } ;
		});
	};
	
	$rootScope.openLink = function(linkButton) {
		if(linkButton.link) {
			window.open(linkButton.link,linkButton.target);
		} else {
			$rootScope.loadPage(linkButton.page.name, linkButton.page.header);
		}
	};
	
	$rootScope.loadPage = function(name, header, isBack, callback) {
		
		if(header) {
			//$rootScope.setHeader(header);
		}
		
		$http.get('/pages/' + name + '.json').success(function(data) {
			
			$rootScope.pageConfig = data;
			
			if($rootScope.appConfig.usePageStack && !isBack && $rootScope.pageInfo) {
				$rootScope.pageStack.push($rootScope.pageInfo);
			}
			
			$rootScope.arrow = $rootScope.pageStack.length != 0;
			
			header = header || $rootScope.pageConfig.header;
			
			$rootScope.pageInfo = { "name" : name, "header" : header };

            $rootScope.injectPanelJS({id : name});
				
			if(callback) { callback($rootScope.pageConfig); }
			
		});
		
	};
	
	$rootScope.getPartialUrl = function(panel) {
		if(panel.type === 'custom') {
			return '' + APPYSTR_BASE_URL + '/' + $rootScope.app + '/' + $rootScope.role + '/partials/' + panel.id + '.html';
		}
		return '/partials/' + panel.type + '.html';
	};
	
	$rootScope.injectPanelJS = function(panel) {
		var jsUrl = '' + APPYSTR_BASE_URL + '/' + $rootScope.app + '/' + $rootScope.role + '/js/' + panel.id + '.js';
		injectJS(jsUrl, 'panelJS');
	};
	
	$scope.panel = {
		data : { id : "navConfig",  heading : "header" },
		action : { primary : { func : "navigatePageAction" } }
	};
	
	$rootScope.loadApp();
	
}
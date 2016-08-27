'use strict';

function NavCtrl($rootScope, $http) {
	
	
	$rootScope.showNav = true;
	$rootScope.arrow = false;
	$rootScope.header = "";
	$rootScope.pageStack = [];
	
	$rootScope.setHeader = function(header) { 
		$rootScope.header = header;
	};
	
	$rootScope.toggleNavbar = function() {
		$("#wrapper").toggleClass("toggled");
	};
	
	$rootScope.navigatePage = function(pageInfo) {
		$rootScope.loadPage(pageInfo.name, pageInfo.header);
//		if($(document).width() < 768) {
			$rootScope.toggleNavbar();
//		}
	};

	$rootScope.navigateBack = function() {
//		if($rootScope.pageConfig.parentPage != null){
		if($rootScope.pageStack.length > 0){
			var pageInfo = $rootScope.pageStack.pop();
			$rootScope.loadPage(pageInfo.name, pageInfo.header, true);
//			$rootScope.loadPage($rootScope.pageConfig.parentPage);
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
    	if( ( e.altKey && e.keyCode == 37 /*back arrow*/ ) || e.keyCode == 8 /*backspace*/) {
	        if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ) {
	            e.preventDefault();
	            $rootScope.navigateBack();
	        }
	    }
	});

	$rootScope.loadApp = function(pageName) {
		$http.get('/app.json').success(function(data) {
			
			$rootScope.appConfig = data;
			
			document.title = $rootScope.appConfig.title;
			$rootScope.loadNav(pageName);
			
			if($rootScope.appConfig.navbar == "NO") {
				if($(document).width() > 768) {
					$rootScope.toggleNavbar();
				}
			} else if($rootScope.appConfig.navbar == "HIDDEN") {
				$rootScope.showNav = false;
				$rootScope.toggleNavbar();
			}
		});
	};
	
	$rootScope.loadNav = function(pageName) {
		if(pageName) {
			$rootScope.loadPage(pageName);
		} 
		$http.get('/nav.json').success(function(data) {
			$rootScope.navConfig = data;
			if(!pageName) {
				var homePage = $rootScope.appConfig.homePage; 
				if(homePage) {
					$rootScope.loadPage(homePage.name, homePage.header);
				} else  if($rootScope.navConfig.length > 0) {
					$rootScope.navigatePage($rootScope.navConfig[0]);
				}
			}
		});
	};
	
	$rootScope.openLink = function(linkButton) {
		if(linkButton.link) {
			window.open(linkButton.link,linkButton.target);
		} else {
			$rootScope.loadPage(linkButton.page.name, linkButton.page.header);
		}
		
	};

	$rootScope.loadPage = function(name, header, isBack) {
		
		if(header) {
			$rootScope.setHeader(header);
		}
		
		$http.get('/pages/' + name + '.json').success(function(data) {
			$rootScope.pageConfig = data;
//			$rootScope.arrow = $rootScope.pageConfig.parentPage != null;
		});
		
		
		if(!isBack && $rootScope.pageInfo) {
			$rootScope.pageStack.push($rootScope.pageInfo);
		}
		$rootScope.arrow = $rootScope.pageStack.length != 0;
		
		$rootScope.pageInfo = { "header" : header, "name" : name };
	};
	
	$rootScope.getPartialUrl = function(panel) {
		if(panel.type === 'custom') {
			return '/partials/custom/' + panel.id + '.html';
		}
		return '/partials/' + panel.type + '.html';
	};
	
}

//-----
// CSS
//-----

injectCSS(APPYCDN_BASE_URL + "/lib/jquery/css/jquery-ui-1.10.3.css");

injectCSS(APPYCDN_BASE_URL + "/lib/angular/ui/angular-ui.css");
//injectCSS(APPYCDN_BASE_URL + "/lib/jquery/plugins/forms/select2/select2.css");

injectCSS(APPYCDN_BASE_URL + "/lib/angular/ui/angular-carousel.css");
//injectCSS(APPYCDN_BASE_URL + "/lib/angular/ui/ng-grid/ng-grid.css");

//injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/v2.2.2/css/bootstrap.css");
//injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/v2.2.2/css/bootstrap-responsive.css");
     
injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/v3.3.4/css/bootstrap.css");
injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/v3.3.4/css/bootstrap-theme.css");
    
injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/css/roboto.css");
injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/css/material.css");
injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/css/material-fullpalette.css");
injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/css/ripples.css");

//injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/ne-theme.css");

//injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/plugins/datetimepicker.css");

injectCSS(APPYCDN_BASE_URL + "/lib/font-awesome/3.2.1/css/font-awesome.css");
 	
injectCSS(APPYUI_BASE_URL + "/css/bootstrap-override.css");
injectCSS(APPYUI_BASE_URL + "/css/navbar.css");
injectCSS(APPYUI_BASE_URL + "/css/index.css");

//----
// JS
//----

injectJS(APPYCDN_BASE_URL + "/lib/jquery/js/jquery-1.9.1.js");

defer(winLib, 'jQuery', function() {
	
injectJS(APPYCDN_BASE_URL + "/lib/jquery/js/jquery-ui-1.9.2.js");
injectJS(APPYCDN_BASE_URL + "/lib/jquery/plugins/forms/validation/jquery.validate.js");
//injectJS(APPYCDN_BASE_URL + "/lib/jquery/plugins/forms/select2/select2.js");

//injectJS(APPYCDN_BASE_URL + "/lib/misc/moment.js");
//injectJS(APPYCDN_BASE_URL + "/lib/misc/moment-with-locales.min.js");

//injectJS(APPYCDN_BASE_URL + "/lib/bootstrap/v2.2.2/js/bootstrap.js");
injectJS(APPYCDN_BASE_URL + "/lib/bootstrap/v3.3.4/js/bootstrap.js");

injectJS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/js/ripples.js");
injectJS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/js/material.js");

//injectJS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/plugins/datetimepicker.js");

injectJS(APPYCDN_BASE_URL + "/lib/angular/v1.2.9/angular.js");
defer(winLib, 'angular', function() {

function ngMod(lib) {
	try {
		return angular.module(lib);
	} catch(e) {
		return null;
	}
}

injectJS(APPYCDN_BASE_URL + "/lib/angular/v1.2.9/angular-route.js");
defer(ngMod, 'ngRoute', function() {
	
injectJS(APPYCDN_BASE_URL + "/lib/angular/v1.2.9/angular-resource.js");
defer(ngMod, 'ngResource', function() {

injectJS(APPYCDN_BASE_URL + "/lib/angular/v1.2.9/angular-sanitize.js");
defer(ngMod, 'ngSanitize',function() {
	
injectJS(APPYCDN_BASE_URL + "/lib/angular/v1.2.9/angular-touch.js");
defer(ngMod, 'ngTouch', function() {

injectJS(APPYCDN_BASE_URL + "/lib/angular/ui/angular-ui.js");
defer(ngMod, 'ui',function() {

injectJS(APPYCDN_BASE_URL + "/lib/angular/ui/bootstrap/ui-bootstrap-tpls-0.5.0.js");
defer(ngMod, 'ui.bootstrap',function() {

injectJS(APPYCDN_BASE_URL + "/lib/angular/ui/angular-carousel.js");
defer(ngMod, 'angular-carousel', function() {

injectJS(APPYUI_BASE_URL + "/js/app.js");

function ctrl(name) {
	try {
		return eval(name);
	} catch(e) {
		return null;
	}
}

injectJS(APPYUI_BASE_URL + "/js/config.js");
defer(ctrl, 'config', function() {

injectJS(APPYUI_BASE_URL + "/js/nav.js");
defer(ctrl, 'NavCtrl', function() {

injectJS(APPYUI_BASE_URL + "/js/data.js");
defer(ctrl, 'DataCtrl', function() {

injectJS(APPYUI_BASE_URL + "/js/list.js");
injectJS(APPYUI_BASE_URL + "/js/table.js");

injectJS(APPYUI_BASE_URL + "/js/appy.js");

defer(ngMod, 'appy', function() {

angular.bootstrap(document, ['appy']);

});// appy

});// data
});// nav
});// config

});// route
});// resource
});// sanitize
});// touch

});// ui
});// ui.bootstrap
});// carousel

});// angular

});// jQuery

//-----
// CSS
//-----

injectCSS("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js");

injectCSS("https://cdnjs.cloudflare.com/ajax/libs/angular-ui/0.4.0/angular-ui.css");
//injectCSS(APPYCDN_BASE_URL + "/lib/jquery/plugins/forms/select2/select2.css");

injectCSS("https://cdnjs.cloudflare.com/ajax/libs/angular-carousel/1.1.0/angular-carousel.min.js");
//injectCSS(APPYCDN_BASE_URL + "/lib/angular/ui/ng-grid/ng-grid.css");

//injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/v2.2.2/css/bootstrap.css");
//injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/v2.2.2/css/bootstrap-responsive.css");
     
injectCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css");
injectCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css");
    
injectCSS("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
injectCSS("https://raw.githubusercontent.com/FezVrasta/bootstrap-material-design/v3/dist/css/bootstrap-material-design.min.css");
//injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/css/material-fullpalette.css");
injectCSS("https://raw.githubusercontent.com/FezVrasta/bootstrap-material-design/v3/dist/css/ripples.min.css");

//injectCSS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/plugins/datetimepicker.css");

injectCSS(APPYCDN_BASE_URL + "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
 	
injectCSS(APPYUI_BASE_URL + "/bootstrap-override.css");
injectCSS(APPYUI_BASE_URL + "/navbar.css");
injectCSS(APPYUI_BASE_URL + "/index.css");

//----
// JS
//----

injectJS("https://code.jquery.com/jquery-1.9.1.min.js");

defer(winLib, 'jQuery', function() {
	
injectJS("https://code.jquery.com/ui/1.9.2/jquery-ui.min.js");
//injectJS(APPYCDN_BASE_URL + "/lib/jquery/plugins/forms/validation/jquery.validate.js");
//injectJS(APPYCDN_BASE_URL + "/lib/jquery/plugins/forms/select2/select2.js");
//injectJS(APPYCDN_BASE_URL + "/lib/jquery/plugins/jquery.sparkline.js");

injectJS("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.1.0/moment.min.js");
//injectJS(APPYCDN_BASE_URL + "/lib/misc/moment-with-locales.min.js");

//injectJS(APPYCDN_BASE_URL + "/lib/bootstrap/v2.2.2/js/bootstrap.js");
injectJS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js");

injectJS("https://raw.githubusercontent.com/FezVrasta/bootstrap-material-design/v3/dist/js/ripples.min.js");
injectJS("https://raw.githubusercontent.com/FezVrasta/bootstrap-material-design/v3/dist/js/material.min.js");

//injectJS(APPYCDN_BASE_URL + "/lib/bootstrap/themes/material/plugins/datetimepicker.js");

injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.9/angular.js");
defer(winLib, 'angular', function() {

function ngMod(lib) {
	try {
		return angular.module(lib);
	} catch(e) {
		return null;
	}
}

injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.9/angular-route.js");
defer(ngMod, 'ngRoute', function() {
	
injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.9/angular-resource.js");
defer(ngMod, 'ngResource', function() {

injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.9/angular-sanitize.js");
defer(ngMod, 'ngSanitize',function() {
	
injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.9/angular-touch.js");
defer(ngMod, 'ngTouch', function() {

injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.9/angular-animate.js");
defer(ngMod, 'ngAnimate', function() {
	
injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular-ui/0.4.0/angular-ui.js");
defer(ngMod, 'ui',function() {

injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.5.0/ui-bootstrap-tpls.js");
defer(ngMod, 'ui.bootstrap',function() {

injectJS("https://cdnjs.cloudflare.com/ajax/libs/angular-carousel/0.2.2/angular-carousel.min.js");
defer(ngMod, 'angular-carousel', function() {

function ctrl(name) {
	try {
		return eval(name);
	} catch(e) {
		return null;
	}
}

injectJS(APPYUI_BASE_URL + "/config.js");
defer(ctrl, 'config', function() {

injectJS(APPYUI_BASE_URL + "/nav.js");
defer(ctrl, 'NavCtrl', function() {

injectJS(APPYUI_BASE_URL + "/data.js");
defer(ctrl, 'DataCtrl', function() {

injectJS(APPYUI_BASE_URL + "/list.js");
injectJS(APPYUI_BASE_URL + "/table.js");
injectJS(APPYUI_BASE_URL + "/form.js");

injectJS(APPYUI_BASE_URL + "/slider.js");

injectJS(APPYUI_BASE_URL + "/appy.js");
defer(ngMod, 'appy', function() {

injectJS(APPYUI_BASE_URL + "/vis.js");

angular.bootstrap(document, ['appy']);
$('#loader').hide();

});// appy

});// data
});// nav
});// config

});// route
});// resource
});// sanitize
});// touch
});// animate

});// ui
});// ui.bootstrap
});// carousel

});// angular

});// jQuery
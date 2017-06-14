function SliderCtrl($rootScope, $scope) {

	$scope.slides = [];
	$scope.slide = {};
	var currIndex = 0;

	$scope.addSlide = function() {
		$scope.slide = {
			image : $rootScope.getImageURI( { "path" : "slider" + ($scope.slides.length + 1) + ".png" } ),
			id : currIndex++
		};
		$scope.slides.push($scope.slide);
	};

	$scope.addSlide();
	
	$scope.setSlide = function(id, img) {
		$scope.slides[id].image = img;
	};

}
function SliderCtrl($rootScope, $scope) {

  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.slides = [];
  $scope.slide = {};
  var currIndex = 0;

  $scope.addSlide = function() {
	  $scope.slide = {
			  image: $rootScope.getImageURI( { "path" : "slider" + ($scope.slides.length + 1) + ".png" } ),
		      id: currIndex++
      };
	  $scope.slides.push($scope.slide);
  };

//  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
//  }

}	
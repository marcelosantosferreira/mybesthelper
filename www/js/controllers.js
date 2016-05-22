angular.module('mybesthelper.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('Step1HelperController', ['$scope','$location', function($scope,$location){
	
	$scope.options = 0;
	
	/* Count the options clicked and go to next step */
	$scope.optionOnStep1 = function(){
		$scope.options++;
		console.log($scope.options);
		
		if ($scope.options === 4){
			
			//$location.path("/app/step2Helper");
		}
	};
}])

.controller('Step1FamilyController', ['$scope','$location', function($scope,$location){
	
	$scope.options = 0;
	
	$scope.optionOnStep1 = function(){
		$scope.options++;
		console.log($scope.options);
		if ($scope.options === 4){
			
			//$location.path("/app/step2Helper");
		}
	};
}])

.controller('MatchesController', ['$scope', 'matchFactory', 'baseURL', function($scope, menuFactory, baseURL) {
            
			$scope.baseURL = baseURL;
            $scope.tab = 1;
            $scope.filtText = '';
			$scope.matches = {};
            
            matchFactory.getMatches().query(
                function(response) {
                    $scope.matches = response;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
        }])

.controller('IndexController', ['$scope', 'matchFactory', 'baseURL', function($scope, matchFactory, baseURL) {
			$scope.showHelperInfo = false;
			$scope.showFamilyInfo = false;
			$scope.baseURL = baseURL;
	
			$scope.toggleHelper = function() {
                $scope.showHelperInfo = !$scope.showHelperInfo;
				console.log($scope.showHelperInfo);
            };
	
			$scope.toggleFamily = function() {
                $scope.showFamilyInfo = !$scope.showFamilyInfo;
            };
	

			/* TODO: calculate matches based on city
			$scope.matchCount = menuFactory.getMatchesCount()
				.$promise.then(
					function(response){
						$scope.return = response;
					},
					function(response) {
						$scope.message = "Error: "+response.status + " " + response.statusText;
					}
				);*/
			}]) 
;
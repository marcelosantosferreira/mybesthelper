angular.module('mybesthelper.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	
	//console.info('AppCtrl accessed!');
	
	//$scope.matches = $localStorage.getObject('matches', 512);
	$scope.matches = 512;
	$scope.userType = "";
	$scope.loggedAs = function(userType){
		$scope.userType = userType;
		console.info("User is a: " + $scope.userType);
	};
	$scope.lastNavigation = "";
	
	$scope.nextButton = function(lastNavigation){
		$scope.lastNavigation = lastNavigation;
		console.info("Last screen: " + $scope.lastNavigation);
	};

	// Form data for the login modal
	$scope.loginData = {};
	var profile = {firstname:"", lastname:"", email:"" , phone: "", details:[], icons: [], address: ""};
	$scope.profile = profile;
	//$scope.profile = $localStorage.getObject('profile', profile);
	console.warn("Profile: " + $scope.profile);

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function () {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function () {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};
	
	
	$scope.updateMatches = function(newValue){
		console.info("newValue of matches -> " + newValue);
		$scope.matches = newValue;
		//$localStorage.storeObject('matches', $scope.matches);
		//console.warn("stored!");
	}
	
})

.controller('ProfileController',['$scope',function($scope){
	console.info('Show profile:');
	console.info($scope.profile);
}])

.controller('MapController', ['$scope', '$state', '$cordovaGeolocation', function ($scope, $state, $cordovaGeolocation) {
	
	$scope.city = "city";
	
	$scope.showGears = true;
	$scope.message = "Detecting city...";
	
	var options = {
		timeout: 10000,
		enableHighAccuracy: true
	};
	
	$cordovaGeolocation.getCurrentPosition(options).then(function (position) {
		console.log("Building the map");
		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		console.log("LatLng is: " + latLng);

		var mapOptions = {
			center: latLng,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


		//Wait until the map is loaded
		google.maps.event.addListenerOnce($scope.map, 'idle', function () {

			var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: latLng
			});
			console.log("The marker is set up!");
			
			
		});

		//Wait until the map is loaded
		/*
		google.maps.event.addListenerOnce($scope.map, 'idle', function () {

			var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: latLng
			});

			var infoWindow = new google.maps.InfoWindow({
				content: "I am here!"
			});


			infoWindow.open($scope.map, marker);

			console.info("Map is successfully load!");
		});
		*/

		////
		
		//var latlngStr = input.split(',', 2);
		//var latlng = {
		//	lat: parseFloat(latlngStr[0]),
		//	lng: parseFloat(latlngStr[1])
		//};
		
		var latlng = latLng;
		var map = $scope.map;
		var infowindow = new google.maps.InfoWindow;
		var geocoder = new google.maps.Geocoder;
		console.log("geocoder: " + geocoder);
		
		geocoder.geocode({
			'location': latlng
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					map.setZoom(11);
					var marker = new google.maps.Marker({
						position: latlng,
						map: map
					});
					infowindow.setContent(results[1].formatted_address);
					$scope.profile.address = results[1].formatted_address;
					//$scope.city = 0;
					infowindow.open(map, marker);
					console.info(results[1].formatted_address);
				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
			
			
		});
		
		$scope.showGears = false;
		$scope.message = "";
	
	}, function (error) {
		console.error("Could not get location");
	});
	
}])

.controller('StepsHelperController', ['$scope', '$location','$localStorage','userOptionsfactory', function ($scope, $location, $localStorage, userOptionsfactory) {
	
	$scope.loggedAs("Helper");
	$scope.options = 0;

	/* Count the options clicked and go to next step */
	$scope.optionOnHelperStep = function (step, icon, detail) {
		var detailExistia = false;
		var iconExistia = false;
		
		$scope.options++;
		$scope.nextButton("#/app/step"+step+"Helper");
		
		for (var i = 0; i < $scope.profile.details.length; i++) {
			if ($scope.profile.details[i] == detail) {
				$scope.profile.details.splice(i, 1);
				console.warn(detail + " JÁ EXISTIA! REMOVIDO!");
				detailExistia = true;
			}
		}
		if (!detailExistia) {
			$scope.profile.details.push(detail);	
		}
		
		for (var i = 0; i < $scope.profile.icons.length; i++) {
			if ($scope.profile.icons[i] == "'button button-icon icon "+icon+"'") {
				$scope.profile.icons.splice(i, 1);
				console.warn(icon + " JÁ EXISTIA! REMOVIDO!");
				iconExistia = true;
			}
		}
		if (!iconExistia) {
			$scope.profile.icons.push("'button button-icon icon "+icon+"'");
		}
		
		$localStorage.storeObject('profile', $scope.profile.details);
		
		randomNumber = Math.floor((Math.random() * 60) + 15);
		
		$scope.matches = userOptionsfactory.addToUserOptions(detail, randomNumber, $scope.matches);
		
		$scope.updateMatches($scope.matches);
		
		if ($scope.options === 4) {
		//$location.path("/app/step2Helper");
		}
	};
}])

.controller('StepsFamilyController', ['$scope', '$location','$localStorage','userOptionsfactory', function ($scope, $location, $localStorage, userOptionsfactory) {

	$scope.loggedAs("Family");
	$scope.options = 0;
	
	$scope.optionOnFamilyStep = function (step, icon, detail) {
		var detailExistia = false;
		var iconExistia = false;
		
		$scope.options++;
		$scope.nextButton("#/app/step"+step+"Family");
		//console.log($scope.options + '->' + detail);
		
		for (var i = 0; i < $scope.profile.details.length; i++) {
			if ($scope.profile.details[i] == detail) {
				$scope.profile.details.splice(i, 1);
				console.warn(detail + " JÁ EXISTIA! REMOVIDO!");
				detailExistia = true;
			}
		}
		if (!detailExistia) {
			$scope.profile.details.push(detail);	
		}
		
		for (var i = 0; i < $scope.profile.icons.length; i++) {
			if ($scope.profile.icons[i] == "'button button-icon icon "+icon+"'") {
				$scope.profile.icons.splice(i, 1);
				console.warn(icon + " JÁ EXISTIA! REMOVIDO!");
				iconExistia = true;
			}
		}
		if (!iconExistia) {
			$scope.profile.icons.push("'button button-icon icon "+icon+"'");
		}
		
		$localStorage.storeObject('profile', $scope.profile.details);
		
		randomNumber = Math.floor((Math.random() * 60) + 15);
		
		$scope.matches = userOptionsfactory.addToUserOptions(detail, randomNumber, $scope.matches);
		
		$scope.updateMatches($scope.matches);
		/*
		console.log('-> ' + detail);
		$scope.profile.details.push(detail);
		
		$scope.profile.icons.push("'button button-icon icon "+icon+"'");
		
		console.log($scope.profile.details);
		$localStorage.storeObject('profile', $scope.profile.details);
		
		//console.log(theObject.id);
		randomNumber = Math.floor((Math.random() * 60) + 15);
		
		// A CARACTERÍSTICA Existe no vetor?
		// SIM, então retira-a e SOMA o número correspondente aos matches
		
		// NÃO, então adiciona-a + número e SUBTRAI dos matches
		
		// Armazena a característica + número randômico
		$scope.matches = $scope.matches - randomNumber;
		$scope.updateMatches($scope.matches);
		console.info("matches NOW is " + $scope.matches);
		
		if ($scope.options === 4) {

			//$location.path("/app/step2Helper");
		}
		*/
	};
}])

.controller('MatchesController', ['$scope', 'matchFactory', 'baseURL', function ($scope, menuFactory, baseURL) {

	$scope.baseURL = baseURL;
	$scope.tab = 1;
	$scope.filtText = '';
	$scope.matches = {};

	matchFactory.getMatches().query(
		function (response) {
			$scope.matches = response;
		},
		function (response) {
			$scope.message = "Error: " + response.status + " " + response.statusText;
		});
        }])

.controller('IndexController', ['$scope', 'matchFactory', 'baseURL', '$state', '$cordovaGeolocation', function ($scope, matchFactory, baseURL, $state, $cordovaGeolocation) {
	$scope.showHelperInfo = false;
	$scope.showFamilyInfo = false;
	$scope.baseURL = baseURL;
	$scope.showGears = true;
	$scope.message = "Detecting city...";
	/* Map */
	
	var options = {
		timeout: 10000,
		enableHighAccuracy: true
	};
	
	$cordovaGeolocation.getCurrentPosition(options).then(function (position) {
		console.log("Initing map in home");
		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		var mapOptions = {
			center: latLng,
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		$scope.map = new google.maps.Map(document.getElementById("mapInHome"), mapOptions);

		console.log("Put on div!");
		
		
		
		//Wait until the map is loaded
		google.maps.event.addListenerOnce($scope.map, 'idle', function () {

			var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: latLng
			});
			console.log("The marker is there!");
			$scope.message = "";
			$scope.showGears = false;
		});

		//Wait until the map is loaded
		google.maps.event.addListenerOnce($scope.map, 'idle', function () {

			var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: latLng
			});

			var infoWindow = new google.maps.InfoWindow({
				content: "Found 512 Helpers in your city!"
			});

			google.maps.event.addListener(marker, 'click', function () {
				infoWindow.open($scope.map, marker);
			});

		});
		console.info("Map is successfully load!");
		
		
	}, function (error) {
		console.log("Could not get location");
	});
	
	/* /Map */

	$scope.toggleHelper = function () {
		$scope.showHelperInfo = !$scope.showHelperInfo;
		console.log($scope.showHelperInfo);
	};

	$scope.toggleFamily = function () {
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
			}]);

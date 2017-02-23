// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('mybesthelper', ['ionic', 'mybesthelper.controllers', 'mybesthelper.services','ngCordova'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider) {
	
	
	
	$stateProvider

	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/sidebar.html',
		controller: 'AppCtrl'
	})

	.state('app.tabs', {
		url: '/tabs',
		views: {
			'mainContent': {
				templateUrl: 'templates/tabs.html'
			}
		}
	})
	.state('app.home', {
		url: '/home',
		views: {
			'mainContent': {
				templateUrl: 'templates/home.html',
				controller: 'IndexController'
			}
		}
	})
	.state('app.map', {
		url: '/map',
		views: {
			'mainContent': {
				templateUrl: 'templates/map.html',
				controller: 'MapController'
			}
		}
	})
	.state('app.step1Helper', {
		url: '/step1Helper',
		views: {
			'mainContent': {
				templateUrl: 'templates/step1Helper.html',
				controller: 'StepsHelperController'
			}
		}
	})

	.state('app.step1Family', {
		url: '/step1Family',
		views: {
			'mainContent': {
				templateUrl: 'templates/step1Family.html',
				controller: 'StepsFamilyController'
			}
		}
	})
	/*
	Route for the Helper Profile (my Profile)
	*/
	.state('app.helper', {
		url: '/helper',
		views: {
			'mainContent': {
				templateUrl: 'templates/helper.html'
			}
		}
	})

	
	.state('app.profile', {
			url: '/profile',
			views: {
				'mainContent': {
					templateUrl: 'templates/profile.html',
					controller: 'ProfileController'
				}
			}
		})
	
	.state('app.message', {
			url: '/message',
			views: {
				'mainContent': {
					templateUrl: 'templates/message.html'
				}
			}
		})
		.state('app.family', {
			url: '/family',
			views: {
				'mainContent': {
					templateUrl: 'templates/family.html'
				}
			}
		})
		.state('app.formHelper', {
			url: '/formHelper',
			views: {
				'mainContent': {
					templateUrl: 'templates/formHelper.html'
				}
			}
		})
		.state('app.formFamily', {
			url: '/formFamily',
			views: {
				'mainContent': {
					templateUrl: 'templates/formFamily.html'
				}
			}
		})
		.state('app.archetype1', {
			url: '/archetype1',
			views: {
				'mainContent': {
					templateUrl: 'templates/archetype1.html'
				}
			}
		})
		.state('app.archetype2', {
			url: '/archetype2',
			views: {
				'mainContent': {
					templateUrl: 'templates/archetype2.html'
				}
			}
		})
		.state('app.step4Helper', {
			url: '/step4Helper',
			views: {
				'mainContent': {
					templateUrl: 'templates/step4Helper.html',
					controller: 'StepsHelperController'
				}
			}
		})
		.state('app.step5', {
			url: '/step5',
			views: {
				'mainContent': {
					templateUrl: 'templates/step5.html'
				}
			}
		})

	.state('app.step2Helper', {
		url: '/step2Helper',
		views: {
			'mainContent': {
				templateUrl: 'templates/step2Helper.html',
				controller: 'StepsHelperController'
			}
		}
	})

	.state('app.step2Family', {
		url: '/step2Family',
		views: {
			'mainContent': {
				templateUrl: 'templates/step2Family.html',
				controller: 'StepsFamilyController'
			}
		}
	})

	.state('app.step3Helper', {
		url: '/step3Helper',
		views: {
			'mainContent': {
				templateUrl: 'templates/step3Helper.html',
				controller: 'StepsHelperController'
			}
		}
	})

	.state('app.step3Family', {
		url: '/step3Family',
		views: {
			'mainContent': {
				templateUrl: 'templates/step3Family.html',
				controller: 'StepsFamilyController'
			}
		}
	})

	;
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');
});

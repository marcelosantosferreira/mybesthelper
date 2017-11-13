'use strict';

angular.module('mybesthelper.services', ['ngResource'])
	.constant("baseURL", "http://localhost:3000/")
	.service('matchFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

		/* TODO: Return the collection matched
                this.getMatches = function(){
                    
                    return $resource(baseURL+"matches/:id", null,  {'update':{method:'PUT' }});
                    
                };
				 */
		/* TODO: Return 1 Match (details)
                this.getAMatch = function() {
                    return   $resource(baseURL+"matches/:id");;
                }
     			*/

        }])

.factory('userOptionsfactory', ['baseURL', function (baseURL) {
	/* Collection of characteristics */
	var factory = {};
	var userOptions = [];
	var details = [];
	var icons = [];

	factory.getDetails = function () {
		return details;
	}

	factory.getIcons = function () {
		return icons;
	}

	factory.getAll = function () {
		return userOptions;
	}

	factory.addToUserOptions = function (valor, randomNumber, matches) {
		var itemDeleted = false;
		console.warn("factory.addToUserOptions");
		/* Verifica se o item já existe na coleção... */
		for (var i = 0; i < userOptions.length; i++) {
			if (userOptions[i].id == valor) {

				matches = matches + userOptions[i].value;
				console.info("matches restored to " + matches);
				console.warn(valor + " já existe. Remover!");

				userOptions.splice(i, 1);
				console.info(valor + " removido!");
				/*
				details = details_;
				details.splice(i, 1);
				console.log(details);
				icons = icons_;
				icons.splice(i, 1);
				console.log(icons);
				*/

				//factory.deleteFromUserOptions(valor);
				//return;
				itemDeleted = true;
			}
		}
		if (!itemDeleted) {
			userOptions.push({
				id: valor,
				value: randomNumber
			});
			matches = matches - randomNumber;
			console.info(valor + " added!");
			console.info(userOptions);
		}

		return matches;
	};

	/* Deleta com base no ID */
	/*
	factory.deleteFromUserOptions = function (index) {
		for (var i = 0; i < userOptions.length; i++) {
			if (userOptions[i].id == index) {
				userOptions.splice(i, 1);
			}
		}
	}*/

	factory.deleteFromUserOptions = function (valor) {
		for (var i = 0; i < userOptions.length; i++) {
			if (userOptions[i] == valor) {
				userOptions.splice(i, 1);
				console.info("Item [" + valor + "] removed from position #" + i);
			}
		}
	}

	factory.getuserOptions = function () {
		return userOptions;
	};

	return factory;
    }])

/* Local Storage Support */
.factory('$localStorage', ['$window', function ($window) {
	return {
		store: function (key, value) {
			$window.localStorage[key] = value;
		},
		get: function (key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		storeObject: function (key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function (key, defaultValue) {
			return JSON.parse($window.localStorage[key] || defaultValue);
		}
	}
}]);

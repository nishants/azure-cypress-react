(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.app = angular.module("zinc", ['ui.router', 'ngDraggable']);
},{}],2:[function(require,module,exports){
angular.module("zinc").directive("dropDown", [function () {

	return {
		restrict: "C",
		scope   : true,
		template: "<div class='dropdown-inner' ><div class='current' ng-click='dropdown.show(!dropdown.active)'><label class='value' ng-bind='dropdown.current.value' ng-show='dropdown.current.value'></label> <label class='placeholder' ng-bind='dropdown.name' ng-hide='dropdown.current.value'></label><div class='caret fa fa-chevron-down'></div></div><ul class='options'><li ng-repeat='option in dropdown.options' ng-bind='option.value' ng-click='dropdown.select(option)'></li><li ng-click='dropdown.clear()' ng-show='dropdown.reset' ng-bind='dropdown.reset'></li></ul></div>",
		link    : function (scope, element, attrs) {
			var dropdown = {
				name: attrs.name,
				active: false,
				reset: scope.$eval(attrs.reset) || attrs.reset,
				current: {
					value: scope.$eval(attrs.value)
				},
				options: scope.$eval(attrs.options),
				select: function (option) {
					dropdown.current.value = option.value;
					dropdown.show(false);
				},
				show: function(value){
					dropdown.active = value;
					value ? element.addClass("active") : element.removeClass("active");
				},
				clear: function(){
					dropdown.current = {value: null};
					dropdown.show(false);
				}
			};
			scope.dropdown = dropdown;

		}
	};
}]);
},{}],3:[function(require,module,exports){
angular.module("zinc").run(["$rootScope", "stateMessages" ,function($rootScope, stateMessages){
	var state = {
			name				: "",
			loading     : null,
			message     : "Welcome Onboard !",
			error     	: null,
			loadingNext	: function(name, message){
				state.message = message;;
				state.loading = name;
				state.error   = null;
			},
			done   			: function(stateName){
				state.loading = null;
				state.message = null;
				state.name    = stateName;
			},
			failed: function(error){
				state.loading = null;
				state.message = null;
				state.error   = error;
			}
		},
		nameFor = function(state){
			return state.replace(/\./g, "-");
		};

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
		state.loadingNext(nameFor(toState.name), stateMessages[toState.name]);
	});

	$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
		state.failed("Unknown Error");
	});

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
		state.failed("Unknown Error");
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		state.done(nameFor(toState.name));
	});

	$rootScope.state = state;
}]);
},{}],4:[function(require,module,exports){
app.value("remote", "https://findfalcone.herokuapp.com");
app.value("requestConfig", {headers: {Accept: "application/json", "Content-Type": "application/json"}});

},{}],5:[function(require,module,exports){
angular.module('zinc').controller('GamePlayController', ["$scope", "deckParticipation", "GamePlayService", function($scope, deckParticipation, GamePlayService){
			$scope.gamePlay = GamePlayService.create(deckParticipation);

			$scope.gameplan = deckParticipation.gameplan;
			$scope.deck     = deckParticipation.deck;
			$scope.vocabset    = {id: 1};
			$scope.timer    = {timeLimit: '15s'};
			$scope.user     = {
				points: 100,
				timer : "00:19",
			};
			$scope.gamePlay.next();
		}]
);
},{}],6:[function(require,module,exports){
angular.module("zinc").service("GamePlayService", ["$http", function ($http) {
	var toWord = function(data){
		return {
			name: data.word,
			audio: data.pronunciation_audio,
			synonym: {
				options: data.synonym_option_names.map(function (name) {
					return {
						name: name,
						correct :name ==  data.correct_synonym,
					};
				}),
			},
			image: {
				options: data.image_options.map(function (option) {
					return {
						name: option.word,
						url : option.image_medium_url,
						correct: data.image_medium_url == option.image_medium_url
					};
				}),
			}
		};
	};
	return {
		create: function(data){
			var toggleMode = 0;
			gamePlay = {
				vocabset: {
					id: 2,
					title: data.deck.set_title,
					image: data.deck.set_image_url
				},
				words: data.deck.words.map(toWord),
				challenges: data.deck.words.map(function (word) {
					var word = toWord(word);
					toggleMode++;
					return {
						mode: {
							image  : (toggleMode%2 == 1),
							synonym: (toggleMode%2 == 0)
						},
						word: word,
						skipped: false,
						current: false,
					}
				}),
				current: null,
				_current_index: -1,
				next: function(){
					gamePlay.current = gamePlay.challenges[++gamePlay._current_index];
				},
				hasNext: function(){
					return gamePlay._current_index < gamePlay.challenges.length - 1;
				},
				skip: function () {
					gamePlay.current.skipped = true;
					gamePlay.next();
				}
			};
			return gamePlay;
		}
	}
}]);
},{}],7:[function(require,module,exports){
angular.module('zinc').controller('DropSquaresController', function ($scope) {
	$scope.onDrop = function (option) {
		!option.correct ? alert("Wrong answer"): "";
		$scope.gamePlay.next();
	};
});
},{}],8:[function(require,module,exports){
angular.module("zinc").config(["$stateProvider", "$urlRouterProvider", "$locationProvider",function($stateProvider, $urlRouterProvider, $locationProvider){

	$urlRouterProvider.otherwise('/vocab');
	$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'assets/templates/home-template.html'
			})
			.state('articles', {
				url: '/articles',
				templateUrl: 'assets/templates/articles-template.html'
			})
			.state('reports', {
				url: '/reports',
				templateUrl: 'assets/templates/reports-template.html'
			})
			.state('vocab', {
				url: '/vocab',
				templateUrl: 'assets/templates/vocab-list-template.html',
				resolve : {
					list: ["VocabService", function(VocabService){
						return VocabService.fetchMySets();
					}]
				},
				controller: ["$scope", "list", function($scope, list){
					$scope.games = list;
				}]
			})
			.state('vocab.view', {
				url: '/:id/view',
				templateUrl: 'assets/templates/vocab-view-template.html',
				resolve: {
					vocabset: [
						"$stateParams",
						"VocabService",
						function($stateParams, VocabService){
							return VocabService.getById($stateParams.id);
						}
					]
				},
				controller: ["$scope", "vocabset", function($scope, vocabset){
					$scope.vocabset = vocabset;
				}]
			})
			.state('vocab.play', {
				url: '/:vocabId/deck/:deckId/play',
				templateUrl: 'assets/templates/game-play-template.html',
				resolve: {
					deckParticipation: [
						"$stateParams",
						"VocabService",
						function($stateParams, VocabService){
							return  VocabService.getGamePlanFor($stateParams.vocabId, $stateParams.deckId );
						}
					]
				},
				controller: "GamePlayController"
			});

	$locationProvider.html5Mode({
		//enabled: true,
		//requireBase: false
	});
}]);

},{}],9:[function(require,module,exports){
app.value("stateMessages", {
	"vocab.view"  : "Opening Vocabulary Set",
	"default"     : "Loading ",
});
},{}],10:[function(require,module,exports){
angular.module("zinc").service("VocabService", ["$http", function ($http) {
	var service = {
		list : [],
		page : {
			index: -1,
			size : 10
		},
		fetchMySets: function(){
			return $http.get("assets/data/vocab-sets.json").then(function(response){
				return response.data.list;
			})
		},
		getById: function(id){
			return $http.get("assets/data/vocab-set-:id.json".replace(":id", id)).then(function(response){
				return response.data.vocabset;
			});
		},
		getGamePlanFor: function(vocabId, deckId){
			return $http.get("assets/data/vocab-set-:vocabId/deck-participation-:deckId.json".replace(":vocabId", vocabId).replace(":deckId", deckId)).then(function(response){
				return response.data.deck_participation;
			});
		}
	};
	return service;
}]);
},{}],11:[function(require,module,exports){
require("./app/app");
require("./app/variables");
require("./app/config");
require("./app/routes");
require("./app/components/forms/drop-down");
require("./app/components/state-loader/state-loader");
require("./app/vocabulary/vocab-service");
require("./app/game-play/modes/drop-squares/drop-squares-controller");
require("./app/game-play/game-play-service");
require("./app/game-play/game-play-controller");
},{"./app/app":1,"./app/components/forms/drop-down":2,"./app/components/state-loader/state-loader":3,"./app/config":4,"./app/game-play/game-play-controller":5,"./app/game-play/game-play-service":6,"./app/game-play/modes/drop-squares/drop-squares-controller":7,"./app/routes":8,"./app/variables":9,"./app/vocabulary/vocab-service":10}]},{},[11]);

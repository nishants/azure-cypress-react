(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.app = angular.module("crg", ['ui.router', 'ngDraggable']);
},{}],2:[function(require,module,exports){
app.directive("typewriter",["$timeout", function($timeout){
  return {
    restrict: "C",
    scope: false,
    link: function(scope, element, attrs){
      if(attrs.text){
        var chars = [],
            $e    = $(element),
            speed = parseInt(attrs.typingSpeed) || 100,
            done  = true,
            lastTimeout,
            beforeTyping = function(){
              $timeout(function(){
                done = false;
                attrs.beforeTyping && scope.$eval(attrs.beforeTyping);
              });
            },
            afterTyping = function(){
              $timeout(function(){
                done = true;
                attrs.afterTyping && scope.$eval(attrs.afterTyping);
              });
            },
            clear = function(){
              $e.html('');
            },
            type = function(){
              clearTimeout(lastTimeout);
              if(chars.length > 0){
                $e.append(chars.shift());
                if(done){
                  beforeTyping();
                }
              }else{
                if(!done){
                  afterTyping();
                }
              }
              lastTimeout = setTimeout(type, speed);
            };
        scope.$watch(attrs.text, function(text){
          clear();
          chars = text.split('');
          clearTimeout(lastTimeout);
          lastTimeout = setTimeout(type, speed);
        });
      }
    }
  };
}])
},{}],3:[function(require,module,exports){
app.directive("dropDown", [function () {

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
},{}],4:[function(require,module,exports){
app.run(["$rootScope", "stateMessages" ,function($rootScope, stateMessages){
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
    console.log(error);
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		state.done(nameFor(toState.name));
	});

	$rootScope.state = state;
}]);
},{}],5:[function(require,module,exports){
app.value("remote", "https://findfalcone.herokuapp.com");
app.value("requestConfig", {headers: {Accept: "application/json", "Content-Type": "application/json"}});

},{}],6:[function(require,module,exports){
app.factory("Passage", [function () {
  var toSelectableNodes = function(paragraphs){
        var nodes = [];
        for(var i =0; i < paragraphs.length; i++){
          var words = paragraphs[i].split(" ");
          for(var j =0; j < words.length; j++){
            nodes.push({text: words[j]});
          }
          nodes.push({text: '', linebreak: true});
        }
        return nodes;
      };

  return function(passage){
    return {
      from  : passage.from,
      by    : passage.by,
      words : toSelectableNodes(passage.text.split("\n"))
    };
  };
}]);
},{}],7:[function(require,module,exports){
app.factory("CRGDataService", ["$http", "SceneLoader",function ($http, SceneLoader) {
  var
      labelFor = function(scene){
        return SceneLoader[scene.name].label;
      },
      setScene = function(scene){
        scene.label = labelFor(scene)
        return scene;
      };
  return {
    getGame: function(id){
      var url = "assets/data/crg/crg-sample-game-data-<id>.json".replace("<id>", id);
      return $http.get(url).then(function(response){
        response.data.script.scenes = response.data.script.scenes.map(setScene);
        return response.data;
      })
    }
  };
}]);
},{}],8:[function(require,module,exports){
require("./components/passage/passage");
require("./player/crgameplay");
require("./editor/crg-editor");
require("./scenes/scenes");
require("./crg-data-service");

},{"./components/passage/passage":6,"./crg-data-service":7,"./editor/crg-editor":11,"./player/crgameplay":17,"./scenes/scenes":34}],9:[function(require,module,exports){
app.controller('CRGEditorController', ['$scope', '$timeout', 'CRGEditorService', function ($scope, $timeout, CRGEditorService) {
  var editor  = CRGEditorService;

  $scope.onTextSelect = function(indexes){
    $timeout(function(){
      var selectedText = indexes.map(function (index) {
        return editor.passageSelector.passage.words[index].text;
      }).join(" ")

      editor.passageSelector.selection.onTextSelect(indexes, selectedText);
    });
  };

  $scope.editor = editor;
}]);
},{}],10:[function(require,module,exports){
app.factory("CRGEditorService", ["Passage", "PassageSelector", "$state", function (Passage, PassageSelector, $state) {
  var findScene = function(name){
    return function(scene){
      return scene.name == name;
    };
  };
  var editorService = {
        gameId: null,
        script: {
          scenes: []
        },
        passage: {
          to: null,
          from: null,
          text: null,
        },
        previewing: [],
        setGameToEdit: function(gameData){
          editorService.script.gameId   = gameData.id;
          editorService.script.scenes   = gameData.script.scenes;
          editorService.passage         = gameData.passage;
          editorService.passageSelector =  PassageSelector(Passage(editorService.passage));
        },
        prepareGamePlan : function(scenes){
          var exitScene = editorService.script.scenes.filter(findScene("exit"))[0];
          var previewScenes = scenes ? scenes.concat(exitScene) : null,
              gameData      = JSON.parse(JSON.stringify({
            passage : editorService.passage,
            script  : {scenes: previewScenes || editorService.script.scenes}
          }));
          return gameData;
        },
        previewScene: function(scene){
          editorService.previewing = [scene];
          $state.go("crg.editor.preview-scenes");
        },
        addScene: function(scene){
          var index = editorService.script.scenes.length - 1;
          editorService.script.scenes.splice(index, 0, scene);
        },
        removeScene: function(sceneToRemove){
          editorService.script.scenes = editorService.script.scenes.filter(function(scene){
            return sceneToRemove !== scene;
          });
        },
        publish: function(){
          console.log(JSON.stringify(editorService.script));
        },
       passageSelector: null
  };
  return editorService;
}]);
},{}],11:[function(require,module,exports){
require('./crg-editor-controller');
require('./crg-editor-service');
require('./passage-selector');
},{"./crg-editor-controller":9,"./crg-editor-service":10,"./passage-selector":12}],12:[function(require,module,exports){
app.factory("PassageSelector", ["passageSelectorHeadings", function (passageSelectorHeadings) {
  var scrollTime = 500,
      scrollBackOffset = 200,
      scrollTo = function(position, then){
        $("html, body").stop().animate({scrollTop:position}, scrollTime, 'swing', then || function(){});
      },
      currentScrollPosition = function(){
        return $(window).scrollTop();
      },
      resetSelection = function(){
        window.getSelection().empty();
      };
  return function(passage){
    var passageSelector = {
      selecting: false,
      lastScrollOffset: 0,
      passage: passage,
      selection: {
        current: {text: '', indices: []},
        selectingFocus: false,
        selectingPhrase: false,
        focus: {text: '', indices: []},
        phrase: {text: '', indices: []},
        selectFocus: function () {
          passageSelector.selection.selectingFocus = true;
          passageSelector.selection.selectingPhrase = false;
          passageSelector.heading = passageSelectorHeadings.focus;
        },
        selectPhrase: function () {
          passageSelector.selection.selectingFocus = false;
          passageSelector.selection.selectingPhrase = true;
          passageSelector.heading = passageSelectorHeadings.highlight;
          resetSelection();
        },
        setFocus: function () {
          passageSelector.selection.focus = passageSelector.selection.getTextSelection();
          angular.forEach(passageSelector.passage.words,function(word,index){
            word.focus = passageSelector.selection.focus.indices.indexOf(index) > -1;
          });
          passageSelector.doneSelecting(
              passageSelector.selection.focus
          );
        },
        setPhrase: function () {
          passageSelector.selection.phrase = passageSelector.selection.getTextSelection();
          passageSelector.doneSelecting(
              passageSelector.selection.focus,
              passageSelector.selection.phrase
          );
        },
        onTextSelect: function (indices, text) {
          passageSelector.selection.current.indices = indices.map(function(index){return parseInt(index);});
          passageSelector.selection.current.text = text;
        },
        getTextSelection: function () {
          return {
            indices: passageSelector.selection.current.indices,
            text: passageSelector.selection.current.text
          };
        }
      },
      whenDone: function () {
      },
      reset: function () {
        passageSelector.lastScrollOffset = 0;
        passageSelector.selecting = false;
        passageSelector.whenDone = function () {};
        passageSelector.selection.focus = {text: '', indices: []};
        passageSelector.selection.phrase = {text: '', indices: []};
        passageSelector.selection.selectingFocus = false;
        passageSelector.selection.selectingPhrase = false;
        passageSelector.heading = null;
        angular.forEach(passageSelector.passage,function(word){
          word.focus = false;
          word.highlight = false;
        });
        resetSelection();
      },

      selectFocusFromPassage: function (params) {
        passageSelector.lastScrollOffset = currentScrollPosition();
        scrollTo(0);
        passageSelector.selecting = true;
        passageSelector.whenDone = params.whenDone;
        passageSelector.selection.selectFocus();
      },

      selectHighlightFromPassage: function (params) {
        passageSelector.lastScrollOffset = currentScrollPosition();
        scrollTo(0);
        passageSelector.selecting = true;
        passageSelector.selection.focus = params.focus || passageSelector.selection.focus;
        passageSelector.whenDone = params.whenDone;
        passageSelector.selection.selectPhrase();
      },

      doneSelecting: function (focus, phrase) {
        passageSelector.whenDone({
          focus: focus,
          phrase: phrase
        });
        scrollTo(passageSelector.lastScrollOffset + scrollBackOffset);
        passageSelector.reset();
      }
    }
    return passageSelector;
  };
}]);
},{}],13:[function(require,module,exports){
app.controller('CRGameplayController', ['$scope', '$timeout', 'CRGPlayer', 'CRGGameService', 'gamePlan', function ($scope, $timeout, CRGPlayer, CRGGameService, gamePlan) {

  var game    = CRGGameService;
  game.player = CRGPlayer;

  $scope.onTextSelect = function(indexes){
    $timeout(function(){
      game.selectedText = indexes.map(function (index) {
        return game.player.passage.words[index].text;
      }).join(" ");
      game.player.onTextSelection({indices: indexes, text: game.selectedText});
    });
  };

  $scope.game = game;
}]);
},{}],14:[function(require,module,exports){
app.service("CRGGameScript", ["SceneLoader", "$injector", function (SceneLoader, $injector) {

  var getSceneLoader = function(name){
    return $injector.get(SceneLoader[name].entry);
  };

  var
      script = {
        scenes    : [],
        sceneIndex: -1,
        next: function(){
          var nextScene = script.scenes[script.sceneIndex++];
          return getSceneLoader(nextScene.name)(nextScene.config);
        },
        load: function(scriptData){
          script.scenes     = scriptData.scenes;
          script.sceneIndex = 0;
        }
      };
  return script;
}]);
},{}],15:[function(require,module,exports){
app.factory("CRGGameService", [function () {
  var game = {
    player: null
  };
  return game;
}]);
},{}],16:[function(require,module,exports){
app.service("CRGPlayer", ["CRGGameScript", "Passage", "$timeout",function (CRGGameScript, Passage, $timeout) {
  var FLASH_TIMEOUT = 3000;
  var player = {
    points: 10,
    sound: true,
    input: '',
    typing: true,
    selectedText: null,
    passage: null,
    exit: function(){
      window.history.back();
    },
    load: function(gameData){
      player.passage = Passage(gameData.passage);
      CRGGameScript.load(gameData.script);
      player.start();
    },
    transitTo: function(state){
      player.state = state;
      player.setHighlightText(state.highlightPhrase);
      player.setFocusText(state.focusPhrase);
    },
    state: null,
    setFocusText: function(phrase){
      angular.forEach(player.passage.words, function(word, index){
        word.focus = phrase.indices.indexOf(index) > -1;
      });
    },
    setHighlightText: function(phrase){
      angular.forEach(player.passage.words, function(word, index){
        word.highlight = phrase.indices.indexOf(index) > -1;
      })
    },
    onTextSelection: function(phrase){
      if(player.state.onTextSelection){
        player.state.onTextSelection(phrase);
      }
    },
    resetSelection: function(){
      window.getSelection().empty();
    },
    flashHighlight: function(phrase, retain){
      player.resetSelection();
      angular.forEach(phrase.indices, function(wordIndex){
        player.passage.words[wordIndex].flash = true;
      });
      if(!retain){
       $timeout(function(){
         angular.forEach(phrase.indices, function(wordIndex){
           player.passage.words[wordIndex].flash = false;
         });
       },FLASH_TIMEOUT);
      }
    },
    toNextScene: function(){
      player.transitTo(CRGGameScript.next());
    },
    start: function(){
      player.toNextScene();
    }
  };
  return player;
}]);
},{}],17:[function(require,module,exports){
require('./crg-game-service');
require('./crg-game-controller');
require('./phrase-selector');
require('./selection-pointer');
require('./crg-player-service');
require('./crg-game-script');
},{"./crg-game-controller":13,"./crg-game-script":14,"./crg-game-service":15,"./crg-player-service":16,"./phrase-selector":18,"./selection-pointer":19}],18:[function(require,module,exports){
app.directive("phraseSelector", [function () {
  var getSelectionText = function (){

    var selection = window.getSelection();
    if(!selection || selection.type == 'None'){
      return [];
    }
    var
        range     = selection.getRangeAt(0),
        elements  = range.cloneContents().children ,
        node      = [];

    if(!elements.length){
      elements = [selection.anchorNode.parentElement];
    }
    for(var i = 0; i < elements.length; i++){
      node.push(angular.element(elements[i]).attr('data-word-number'))
    }
    return node.filter(function(index){return index !=undefined ;});
  };

  return {
    restrict: "C",
    scope   : true,
    link    : function (scope, element, attrs) {
      var highlightSelected = function () {
        var selections = getSelectionText();
        $("[data-word-number]").removeClass("selected-word");
        selections.forEach(function(dataWordNumber){
          var selector = "[data-word-number='<number>']".replace('<number>', dataWordNumber);
          $(selector).addClass("selected-word");
        });
        scope.$selection.indices = selections;
        scope.$eval(attrs.onTextSelect);
      };
      document.addEventListener("selectionchange", highlightSelected, false);
      scope.$selection = {indices: []};
    }
  };
}]);


},{}],19:[function(require,module,exports){
app.directive("selectionPointer", [function () {

  return {
    restrict: "C",
    scope   : false,
    link    : function (scope, element, attrs) {
      scope.$watch("$selection.indices", function(indices){
        if(indices.length){
          var firstSelectedWord = $(element).find("[data-word-number='<index>']".replace('<index>', indices[0])),
              wordHeight = 25,
              y = firstSelectedWord.position().top - wordHeight,
              x = firstSelectedWord.position().left;

          $(element).find(".selection-options").css("transform", "translateX(<x>px) translateY(<y>px)".replace('<x>', x).replace('<y>',y ));
        }else{
          $(element).find(".selection-options").css("transform", "scale(0)");
        }

      }, true);
    }
  };
}]);


},{}],20:[function(require,module,exports){
app.directive("setFocus", ['CRGEditorService', function(CRGEditorService){

  return {
    restrict : "A",
    scope    : false,
    link     : function(scope, element, attrs){
      element.on("click", function(){
        CRGEditorService.passageSelector.selectFocusFromPassage({
          whenDone: function(selection){
            scope.scene.config.focus = selection.focus;
          }
        })
      });
    }
  };
}]);
},{}],21:[function(require,module,exports){
app.directive("setHighlight", ['CRGEditorService', function(CRGEditorService){

  return {
    restrict : "A",
    scope    : false,
    link     : function(scope, element, attrs){
      element.on("click", function(){
        CRGEditorService.passageSelector.selectHighlightFromPassage({
          focus : scope.scene.config.phrase,
          whenDone: function(selection){
            scope.scene.config.phrase = selection.phrase;
          }
        })
      });
    }
  };
}]);
},{}],22:[function(require,module,exports){
app.directive("addKeyImage", ['CRGEditorService', function(CRGEditorService){

  return {
    restrict : "A",
    scope    : false,
    link     : function(scope, element, attrs){
      element.on("click", function(){
        CRGEditorService.passageSelector.selectHighlightFromPassage({
          whenDone: function(selection){
            scope.keyImage.phrase = selection.phrase;
          }
        })
      });
    }
  };
}]);
},{}],23:[function(require,module,exports){
app.factory("ExitGameState", [function () {
  return function () {
    var state = {
      showInput: false,
      buttons: [{
        label: "Exit",
        onClick: function(){
          window.history.back();
        },
      }],
      transcript: {text: "End of game."},
      highlightPhrase: {indices: []},
      focusPhrase    : {indices: []},
    };

    return state;
  };
}]);
},{}],24:[function(require,module,exports){
app.factory("DoneReadingPassageState", ["EnterMainIdeaState", "CRGGameService", function (EnterMainIdeaState, game) {
  return function(){
    var showInput = function(){
      game.player.transitTo(EnterMainIdeaState());
    };

    var state = {
      showInput: false,
      highlightPhrase: {indices: []},
      focusPhrase    : {indices: []},
      transcript: {text: "Did the passage make sense ?"},
      buttons: [
        {
          label: "Definitely",
          onClick: function () {
            showInput(state);
          }}, {
          label: "Sort of",
          onClick: function () {
            showInput(state);
          }}, {
          label: "Not Really",
          onClick: function () {
            showInput(state);
          }}]
    };
    return state;
  };
}]);
},{}],25:[function(require,module,exports){
app.factory("EnterMainIdeaState", ["CRGGameService",function (game) {
  return function(){
    return {
      showInput   : true,
      buttons     : [],
      highlightPhrase: {indices: []},
      focusPhrase    : {indices: []},
      transcript: {text: "Describe the main idea in 120 characters or less."},
      submitInput : function(userInput){
        console.log("user says : " + userInput);
        game.player.toNextScene();
      }
    };
  };
}]);
},{}],26:[function(require,module,exports){
app.factory("ReadingPassageState", ["DoneReadingPassageState", "CRGGameService", function (DoneReadingPassageState, game) {
  return function(){
    return {
      showInput: false,
      highlightPhrase: {indices: []},
      focusPhrase    : {indices: []},
      transcript: {text: "Before Attempting any skills, read the passage to the left."},
      buttons: [
        {
          label: "I am done!",
          onClick: function () {
            game.player.transitTo(DoneReadingPassageState(game))
          }
        }
      ]
    };
  };
}]);
},{}],27:[function(require,module,exports){
app.service("FindPhraseEditor", ['SceneLoader', function (SceneLoader) {

  var findPhraseEditor = {
        createFor: function(group){
          return             {
            "group"       : group,
            "name"        : "find-all-key-images",
            label         : SceneLoader["find-all-key-images"].label,
            "config":       {
              "transcript" : {"text": ""},
              "expectedCorrectAnswers" : 1,
              "keyImages": []
            }
          };
        }
      };
  return findPhraseEditor;
}]);
},{}],28:[function(require,module,exports){
app.factory("DisplayAllKeyImages", ["CRGGameService",function (game) {

  return function(data){
    var allImagesWords = data.keyImages.map(function(keyImage){return keyImage.phrase.indices;}).join().split(",").map(function(index){return parseInt(index)});

    game.player.flashHighlight({indices: allImagesWords}, true)
    return {
      showInput   : false,
      buttons     : [{
        label: "Proceed",
        onClick: function(){
          game.player.toNextScene();
        },
      }],
      highlightPhrase: {indices: data.keyImages.map(function(keyImage){return keyImage.phrase.indices;}).join().split(",").map(function(index){return parseInt(index)})},
      focusPhrase    : {indices: []},
      transcript: {text: "Here is everything we found."}
    };
  };
}]);
},{}],29:[function(require,module,exports){
app.factory("FindAllKeyImages", ["CRGGameService", "DisplayAllKeyImages", function (game, DisplayAllKeyImages) {
  var MIN_SELECTION_DISTANCE = 0.5,
      selectionDistance = function(selection, expectedPhrase){
        var common = selection.indices.filter(function(index){
          return expectedPhrase.indices.indexOf(parseInt(index)) > -1;
        });
        return common.length/selection.indices.length;
      },
      selectionIsCloseEnough = function(selected, options){
        var closeEnough = options.filter(function(expected){
          return selectionDistance(selected, expected) > MIN_SELECTION_DISTANCE;
        });
        return closeEnough.length;
      },
      expectedSelectionIndex = function(selected, options){
        var foundOptionIndex = -1;
        options.forEach(function (expected, index) {
          var isExpected = selected.indices.length == expected.indices.length && selectionDistance(selected, expected) == 1;
          foundOptionIndex = isExpected ? index: foundOptionIndex;
        })
        return foundOptionIndex;
      },
      getPhrase = function(keyImage){
        return keyImage.phrase;
      };
  return function (data) {
    var state = {
      showInput         : false,
      buttons           : [],
      transcript        : {text : data.transcript.text},
      highlightPhrase   : {indices: []},
      focusPhrase       : {indices: []},
      expectedSelections  : data.keyImages.map(getPhrase),
      textSelectedIsClose : false,
      expectedCorrectAnswers: data.expectedCorrectAnswers || data.keyImages.length,
      onTextSelection   : function(selectedPhrase){
        var selectedOptionIndex = expectedSelectionIndex(selectedPhrase, state.expectedSelections),
            isCorrect = selectedOptionIndex > -1,
            closeEnough = !isCorrect && selectionIsCloseEnough(selectedPhrase, state.expectedSelections);

        state.textSelectedIsClose = closeEnough;
        isCorrect && state.onCorrectSelection(selectedPhrase,selectedOptionIndex);
      },
      onCorrectSelection: function(phrase, selectedOptionIndex){
        state.expectedSelections.splice(selectedOptionIndex, 1);
        game.player.flashHighlight({indices: phrase.indices.map(function(i){return parseInt(i);})}, true);
        var correctAnsers = data.keyImages.length - state.expectedSelections.length;
        if(correctAnsers == state.expectedCorrectAnswers){
          state.allExpectedPhrasesSelected();
        }
      },
      allExpectedPhrasesSelected: function(){
        data.keyImages.length > 1 ? game.player.transitTo(DisplayAllKeyImages(data)):game.player.toNextScene();
      }
    };
    return state;
  };
}]);
},{}],30:[function(require,module,exports){
app.service("MultiChoiceEditor", ['SceneLoader', function (SceneLoader) {

  var multiChoiceEditor = {
        createFor: function(group){
          return             {
            "group"       : group,
            "name"        : "multi-choice",
            label         : SceneLoader["multi-choice"].label,
            "config"      : {
              "phrase": {"indices": [], "text"  : ""},
              "focus": {"indices" : [], "text"  : ""},
              "transcript": {"text"    : ""},
              "options": []
            }
          };
        }
      };
  return multiChoiceEditor;
}]);
},{}],31:[function(require,module,exports){
app.factory("AskMultiChoiceQuestion", ["MultiChoiceResult", "CRGGameService", function (MultiChoiceResult, game) {
  return function (data) {
    var state = {
      showInput: false,
      buttons: [
        {
          label: 'Submit',
          onClick: function(){
            game.player.transitTo(MultiChoiceResult(data, state.options));
          }
        }],
      options: data.options.map(function(usage){
        return {
          label: usage.label,
          correct: usage.correct,
        }
      }),
      transcript: {text: data.transcript.text || "Which one of following is not a good example of highlighted phrase ?"},
      highlightPhrase: data.phrase,
      focusPhrase    : data.focus,
    };
    return state;
  };
}]);
},{}],32:[function(require,module,exports){
app.factory("MultiChoiceResult", ["CRGGameService", function (game) {
  return function (data, input) {
    var result = data.options.map(function (option, index) {
          return {
            label: option.label,
            correct: option.correct,
            result: input[index].input == option.correct
          }
        }),
        isIncorrect = function (option) {
          return !option.result;
        },
        incorrectAnswer = result.filter(isIncorrect).length > 0,
        message = incorrectAnswer ? data.answerExplanation : "That's correct.";

    var state = {
      showInput: false,
      buttons: [
        {
          label: 'Proceed',
          onClick: function(){
            game.player.toNextScene();
          }
        }],
      result: result,
      transcript: {text: message},
      highlightPhrase: data.phrase,
      focusPhrase    : data.focus,
    };
    return state;
  };
}]);
},{}],33:[function(require,module,exports){
app.controller("SceneEditorController", ['$scope','$injector', 'MultiChoiceEditor', 'SceneLoader', function ($scope, $injector, MultiChoiceEditor, SceneLoader) {

  var sceneConfigs = [];
  for(var scene in SceneLoader){
    var config = SceneLoader[scene];
    config.name = scene;
    if(config.editor){
      config.editor = $injector.get(config.editor)
      sceneConfigs.push(config);
    }
  }

  $scope.sceneConfigs = sceneConfigs;
  $scope.sceneEditors  = {
    multiChoice: MultiChoiceEditor
  };
}]);
},{}],34:[function(require,module,exports){
require('./scene-editor-controller');
require('./components/set-focus-directive');
require('./components/set-highlight-directive');
require('./components/set-key-image-directive');

require('./intro/states/reading-passage-state');
require('./intro/states/done-reading-passage-state');
require('./intro/states/enter-main-idea-state');
require('./exit/states/exit-game-state');

require('./text-input/text-input-editor');
require('./text-input/states/text-input-state');

require('./yes-no-choice/states/ask-question');
require('./yes-no-choice/states/wrong-answer');
require('./yes-no-choice/yes-no-editor');

require('./multi-choice/multi-choice-editor');
require('./multi-choice/states/ask-multi-choice-question-state');
require('./multi-choice/states/multi-choice-result-state');

require('./key-images/states/find-all-key-images-state');
require('./key-images/states/display-all-key-images-state');
require('./key-images/find-phrase-editor');

},{"./components/set-focus-directive":20,"./components/set-highlight-directive":21,"./components/set-key-image-directive":22,"./exit/states/exit-game-state":23,"./intro/states/done-reading-passage-state":24,"./intro/states/enter-main-idea-state":25,"./intro/states/reading-passage-state":26,"./key-images/find-phrase-editor":27,"./key-images/states/display-all-key-images-state":28,"./key-images/states/find-all-key-images-state":29,"./multi-choice/multi-choice-editor":30,"./multi-choice/states/ask-multi-choice-question-state":31,"./multi-choice/states/multi-choice-result-state":32,"./scene-editor-controller":33,"./text-input/states/text-input-state":35,"./text-input/text-input-editor":36,"./yes-no-choice/states/ask-question":37,"./yes-no-choice/states/wrong-answer":38,"./yes-no-choice/yes-no-editor":39}],35:[function(require,module,exports){
app.factory("TextInputState", ["CRGGameService", function ( game) {
  return function (visualize) {
    var state = {
      showInput: true,
      buttons: [],
      transcript: {text: visualize.transcript.text || "What do you imagine when you read the highlighted text ?"},
      highlightPhrase: visualize.phrase,
      focusPhrase    : visualize.focus,
      submitInput: function (userInput) {
        console.log("user visualized : " + userInput);
        game.player.toNextScene();
      }
    };
    return state;
  };
}]);
},{}],36:[function(require,module,exports){
app.service("TextInputEditor", ['SceneLoader', function (SceneLoader) {

  var textInputEditor = {
        createFor: function(group){
          return             {
            "group"       : group,
            "name"        : "text-input",
            label         : SceneLoader["text-input"].label,
            "config"      : {
              "phrase": {"indices": [], "text"  : ""},
              "focus": {"indices" : [], "text"  : ""},
              "transcript": {"text"    : ""},
              "options": []
            }
          };
        }
      };
  return textInputEditor;
}]);
},{}],37:[function(require,module,exports){
app.factory("AskQuestion", ['CRGGameService', 'WrongAnswerToYesNo', function (game, WrongAnswerToYesNo) {
  return function (config) {
    var state = {
      showInput: false,
      buttons: [
        {
          label: 'Yes',
          onClick: function(){
            config.expectedYes ? game.player.toNextScene() : game.player.transitTo(WrongAnswerToYesNo(config));
          }
        },
        {
          label: 'No',
          onClick: function(){
            config.expectedYes ? game.player.transitTo(WrongAnswerToYesNo(config)) :  game.player.toNextScene();
          }
        }
      ],
      transcript        : {text: config.question},
      highlightPhrase   : config.phrase,
      focusPhrase       : config.focus
    };
    return state;
  };
}]);
},{}],38:[function(require,module,exports){
app.factory("WrongAnswerToYesNo", ["CRGGameService", function ( game) {
  return function (data) {
    var state = {
      showInput: false,
      buttons: [
        {
          label: 'Proceed',
          onClick: function(){
            game.player.toNextScene();
          }
        }],
      transcript: {text: data.wrongAnswerMessage},
      highlightPhrase: data.phrase,
      focusPhrase    : data.focus
    };
    return state;
  };
}]);
},{}],39:[function(require,module,exports){
app.service("YesNoEditor", ['SceneLoader', function (SceneLoader) {

  var textInputEditor = {
        createFor: function(group){
          var sceneName = "yes-no";
          return             {
            "group"           : group,
            "name"            : sceneName,
            label             : SceneLoader[sceneName].label,
            "config"          : {
              "phrase"        : {"indices" : [], "text"    : ""},
              "focus"         : {"indices" : [], "text"    : ""},
              "question"      : "",
              "expectedYes"   : false,
              "wrongAnswerMessage": ""
            }
          };
        }
      };
  return textInputEditor;
}]);
},{}],40:[function(require,module,exports){
app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",function($stateProvider, $urlRouterProvider, $locationProvider){

	$urlRouterProvider.otherwise('/crg');
	$stateProvider
			.state('crg', {
				url: '/crg',
				templateUrl: 'assets/templates/crg-template.html'
			})
			.state('crg.gameplay', {
				url: '/play/:id',
				templateUrl: 'assets/templates/crg-gameplay-template.html',
        controller: 'CRGameplayController',
        resolve : {
          gamePlan: ['CRGDataService', 'CRGPlayer', '$stateParams', function(CRGDataService, CRGPlayer, $stateParams){
            return CRGDataService.getGame($stateParams.id).then(function(gameData){
              CRGPlayer.load(gameData);
              return gameData;
            });
          }]
        }
			})
      .state('crg.editor', {
        url: '/editor/:id',
        templateUrl: 'assets/templates/crg-editor-template.html',
        controller: 'CRGEditorController',
        resolve : {
          gamePlan: ['CRGDataService', 'CRGEditorService', '$stateParams', function(CRGDataService, CRGEditorService, $stateParams){
            return CRGDataService.getGame($stateParams.id).then(function(gameData){
              CRGEditorService.setGameToEdit(gameData);
            });
          }]
        }
      })
      .state('crg.editor.preview', {
        url: '/preview',
        templateUrl: 'assets/templates/crg-preview-template.html',
        controller: 'CRGameplayController',
        resolve : {
          gamePlan: ['CRGEditorService', 'CRGPlayer', function(CRGEditorService, CRGPlayer){
            var gameData = CRGEditorService.prepareGamePlan();
            CRGPlayer.load(gameData);
            return gameData;
          }]
        }

      })
      .state('crg.editor.preview-scenes', {
        url: '/preview-scenes',
        templateUrl: 'assets/templates/crg-preview-template.html',
        controller: 'CRGameplayController',
        resolve : {
          gamePlan: ['CRGEditorService', 'CRGPlayer', function(CRGEditorService, CRGPlayer){
            var gameData = CRGEditorService.prepareGamePlan(CRGEditorService.previewing);
            CRGPlayer.load(gameData);
            return gameData;
          }]
        }
      });
}]);

},{}],41:[function(require,module,exports){
app.value("stateMessages", {
  "default"     : "Loading ",
});

app.value("passageSelectorHeadings", {
  focus  : {
    label       : "Select text for student to focus upon.",
    description   : "This is the part of passage that the student should focus on while answering questions in this scene.",
  },
  highlight  : {
    label       : "Select text to highlight",
    description   : "This is tha part of text that will be highlighted for student to analyze.",
  }
});

app.value("SceneLoader", {
  "intro"                 :{
    entry: "ReadingPassageState",
    label: "Main Idea"
  },
  "text-input"            :{
    entry: "TextInputState",
    label: "Input Text",
    editor: "TextInputEditor",
  },
  "multi-choice"          :{
    entry: "AskMultiChoiceQuestion",
    label: "Multiple Choice Question",
    editor: "MultiChoiceEditor"
  },
  "yes-no"                :{
    entry: "AskQuestion",
    label: "Yes/No Question",
    editor: "YesNoEditor"
  },
  "find-all-key-images"   :{
    entry: "FindAllKeyImages",
    label: "Find Phrase",
    editor: "FindPhraseEditor"
  },
  "exit"                  : {
    entry: "ExitGameState",
    label: "Exit"
  }
});
},{}],42:[function(require,module,exports){
require("./app/app");
require("./app/variables");
require("./app/config");
require("./app/routes");
require("./app/components/forms/drop-down");
require("./app/components/state-loader/state-loader");
require("./app/components/animations/typewriter");

require("./app/crg/crg");
},{"./app/app":1,"./app/components/animations/typewriter":2,"./app/components/forms/drop-down":3,"./app/components/state-loader/state-loader":4,"./app/config":5,"./app/crg/crg":8,"./app/routes":40,"./app/variables":41}]},{},[42]);

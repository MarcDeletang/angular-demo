
var Todo = angular.module('Todo', ['ui.bootstrap', 'ngSanitize', 'pascalprecht.translate'])

Todo.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    TITLE: 'Hello !',
    TEXT: 'Hi, this paragrap is quite empty :(',
    DIRECTIVE: 'This is a directive example',
    DYNAMIC: 'Hello {{name}} you seem dynamic !'
  })
  $translateProvider.translations('fr', {
    TITLE: 'Bonjour !',
    TEXT: 'Bonjour, ce paragraphe est un peu vide :(',
    DIRECTIVE: 'Ceci est un exemple de directive',
    DYNAMIC: "Bonjour {{name}}, vous avez l'air dynamique !"
  })
  $translateProvider.preferredLanguage(navigator.language)
  $translateProvider.useSanitizeValueStrategy('sanitize')
})

angular.module('Todo').controller('MainController', function ($scope, $translate) {
  $scope.name = "John"

  $scope.frClick = function(){
    $translate.use('fr')
  }

  $scope.enClick = function(){
    $translate.use('en')
  }
})


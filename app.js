'use strict';

var AJAXTabsDemo = angular.module("AJAXTabsDemo", [
	"ngRoute",
	"ngAJAXTabs",
	"controllers"
]).config(["$routeProvider", "$locationProvider",
	function($routeProvider, $locationProvider) {
		$routeProvider.
			when("/pane-1", {
				controller: "Pane1",
				templateUrl: "pane-1.html"
			}).
			when("/pane-2", {
				controller: "Pane2",
				templateUrl: "pane-2.html"
			}).
			when("/pane-3", {
				controller: "Pane3",
				templateUrl: "pane-3.html"
			}).
			otherwise({
				redirectTo:"/pane-1"
			});
	}
          ]);

var controllers = angular.module("controllers", []).run(function($rootScope, $routeParams) {
    $rootScope.panes = [
        { "vis": false, "name": "Pane 1", "path":"pane-1", "partial":"pane-1.html", "controller":"Pane1", "includedInTabView":true },
        { "vis": true, "name": "Pane 2", "path":"pane-2", "partial":"pane-2.html", "controller":"Pane2", "includedInTabView":true },
        { "vis": false, "name": "Pane 3", "path":"pane-3", "partial":"pane-3.html", "controller":"Pane3", "includedInTabView":false }
    ];
}).controller("Pane1", function($scope) {
    $scope.textFromControllerScope = "Roo";
}).controller("Pane2", function($scope) {
    $scope.textFromControllerScope = "Bar";
}).controller("Pane3", function($scope, $routeParams) {
    /* Pane3 controller functionality */
    var paineis = [];
    paineis.push($scope.$parent.panes[1]);
    paineis.push($scope.$parent.panes[0]);
    $scope.ranes = paineis;
    // $scope.dois = $routeParams['dois'].split(',');
})

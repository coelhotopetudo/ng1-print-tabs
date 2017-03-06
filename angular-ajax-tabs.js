(function(window, angular, undefined) {'use strict';

var ngAJAXTabs = angular.module("ngAJAXTabs", []);

ngAJAXTabs.directive("tabs", function() {
    return {
		restrict: "E",
		transclude: true,
		scope: {},
		controller: function($scope, $element) {
			var panes = $scope.panes = [];

        $scope.select = function(pane) {
            angular.forEach(panes, function(rane, pane) {
                rane.selected = false;
            });
            if (pane.load !== undefined) {
                pane.load();
            }
            pane.selected = true;

            // if (pane.visivel) {
            //     var ranes = [];
            //     ranes = angular.element(panes);
            //     ranes.remove(pane);
            // }
            // pane.visivel = !pane.visivel;
        };

      this.addPane = function(pane) {
				if (panes.length === 0) $scope.select(pane);
				panes.push(pane);
			};

			  this.delPane = function(pane) {
            panes = panes.filter(function(el){return el !== pane;});
			  };
		},
		template:
		  '<div class="tabbable">' +
		    '<ul class="nav nav-tabs">' +
		      '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
		        '<a href="" ng-click="select(pane)">{{pane.tabTitle}}</a>' +
		      '</li>' +
		    '</ul>' +
		    '<div class="tab-content" ng-transclude></div>' +
		  '</div>',
		replace: true
    };
});

ngAJAXTabs.directive("pane", ["$http", "$templateCache", "$controller", "$compile", function($http, $templateCache, $controller, $compile) {
	return {
		require: "^tabs",
		restrict: "E",
		transclude: true,
		  scope: {
          tabTitle: "@"
      },
		link: function(scope, element, attrs, tabsCtrl) {
			var templateCtrl, templateScope;

			if (attrs.template && attrs.controller) {
				scope.load = function() {
					$http.get(attrs.template, {cache: $templateCache})
					.then(function(response) {
						templateScope = scope.$new();
						templateScope.isTabbedPane = true;
						templateCtrl = $controller(attrs.controller, {$scope: templateScope});
              templateScope.visivel = !templateScope.visivel;
						element.html(response.data);
						element.children().data('$ngControllerController', templateCtrl);
						$compile(element.contents())(templateScope);
					});
				};
			}

			tabsCtrl.addPane(scope);
		},
		template:
	        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
	        '</div>',
		replace: false
	};
}]);

ngAJAXTabs.directive("rabs", function() {
    return {
		restrict: "E",
		transclude: true,
		scope: {},
		controller: function($scope, $element) {
			var panes = $scope.panes = [];

        $scope.select = function(pane) {
            angular.forEach(panes, function(rane, pane) {
                rane.selected = false;
            });
            if (pane.load !== undefined) {
                pane.load();
            }
            pane.selected = true;

            // if (pane.visivel) {
            //     var ranes = [];
            //     ranes = angular.element(panes);
            //     ranes.remove(pane);
            // }
            // pane.visivel = !pane.visivel;
        };

      this.addPane = function(pane) {
				if (panes.length === 0) $scope.select(pane);
				panes.push(pane);
			};

			  this.delPane = function(pane) {
            panes = panes.filter(function(el){return el !== pane;});
			  };
		},
		template:
		  '<div class="tabbable">' +
            'j' +
		    '<ul class="nav nav-tabs">' +
		      '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
		        '<a href="" ng-click="select(pane)">{{pane.tabTitle}}</a>' +
		      '</li>' +
		    '</ul>' +
		    '<div class="tab-content" ng-transclude></div>' +
		  '</div>',
		replace: true
    };
});

ngAJAXTabs.directive("rane", ["$http", "$templateCache", "$controller", "$compile", function($http, $templateCache, $controller, $compile) {
	return {
		require: "^rabs",
		restrict: "E",
		transclude: true,
		  scope: {
          tabTitle: "@"
      },
		link: function(scope, element, attrs, tabsCtrl) {
			var templateCtrl, templateScope;

			if (attrs.template && attrs.controller) {
				scope.load = function() {
					$http.get(attrs.template, {cache: $templateCache})
					.then(function(response) {
						templateScope = scope.$new();
						templateScope.isTabbedPane = true;
						templateCtrl = $controller(attrs.controller, {$scope: templateScope});
              templateScope.visivel = !templateScope.visivel;
						element.html(response.data);
						element.children().data('$ngControllerController', templateCtrl);
						$compile(element.contents())(templateScope);
					});
				};
			}

			tabsCtrl.addPane(scope);
		},
		template:
	        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
	        '</div>',
		replace: false
	};
}]);
})(window, window.angular);

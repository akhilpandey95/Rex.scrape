(function() {
	var app = angular.module('store', ['ui.bootstrap']);

	app.factory('Service', function($rootScope) {
		var Service = {};

		Service.message = '';

		Service.broadcastItem = function(broadcastType) {
			$rootScope.$broadcast(broadcastType);
		};

		Service.prepForBroadcast = function(broadcastType, msg) {
			this.message = msg;
			this.broadcastItem(broadcastType);
		};

		return Service;
	});

	app.filter('productFilter', function() {
		return function(input) {
			return input
		}
	});

	app.filter('makeUppercase', function () {
		return function (item) {
			return item.toUpperCase();
		};
	});

	app.controller('StoreController', function($scope, $http, Service){
		$scope.loading = false;
		$scope.products2 = 'hello';
		$scope.products = [];
		var dict = {};
		dict['Price High to Low'] = '-cost';
		dict['Price Low to High'] = 'cost';
		dict['Highest Rated'] = '-rating';
		dict['Alphabetical'] = 'title';

		var get_sorter = {};


		get_sorter['Low Price'] = 'lowp';
		get_sorter['High Price'] = 'highp';
		get_sorter['Relavance'] = 'relavance';
		get_sorter['Popularity'] = 'popularity';

		$scope.text = "samsung";
		$scope.orderProp = 'cost';
		$scope.getProp = 'popularity';

		$scope.$on('ordering', function() {
			$scope.orderProp = dict[Service.message];
		});

		$scope.$on('getordering', function() {
			console.log(Service.message);
			$scope.getProp = get_sorter[Service.message];
		});

		$scope.submit = function() {
			$scope.loading = true;
			$http.defaults.useXdomain = true;
			delete $http.defaults.headers.common['X-Requested-With'];
			$http.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
			$http.defaults.headers.common["Access-Control-Allow-Origin"] = "GET, POST, PUT, DELETE, OPTIONS";

			if (!$scope.getProp) {
				$scope.getProp = 'popularity';
			}
			$http({url: uri = 'http://rex001.herokuapp.com/secrets/search?term=' + $scope.text + '&sort=' + $scope.getProp})

			.success(function (data) {
			     // put $scope var that needs to be updated
			     $scope.products = data.prodlist;
			           //$scope.products2 = data.prodlist;      // inside a function inside $apply like this
			           console.log($scope.products);
			           $scope.loading = false;
			       }).error(function (data, status) {
			       	console.log(status);
			       	$scope.loading = false;
			       });
			   }

			   $scope.logName = function () {
			   	console.log($scope.products);
			   	console.log($scope.products2);
			   	console.log($scope.text);
			   }
			});

	app.controller('searchController', function($scope, Service) {
		$scope.submit = function() {

			Service.prepForBroadcast('data', $scope.text);

		}


	});

	app.controller('filterController', function($scope, Service){
		this.selected = 'Price Low to High';
		this.selected2 = 'Relavance';
		this.options = ['Price Low to High', 'Price High to Low', 'Highest Rated', 'Alphabetical'];
		this.options2 = ['Low Price', 'Relavance', 'High Price', 'Popularity'];
		$scope.handleClick = function(msg) {
				//console.log('handleClick1');
				Service.prepForBroadcast('ordering', msg);
			};

		});

	app.controller('filterControllerOm', function($scope, Service){
		this.selected = 'Relavance';
		this.options = ['Low Price', 'Relavance', 'High Price', 'Popularity'];
		$scope.handleClick = function(msg) {
			Service.prepForBroadcast('getordering', msg);
		};
	});


	app.controller('TabController', function(){
		this.tab = 1;

		this.setTab = function(newValue){
			this.tab = newValue;
		};

		this.isSet = function(tabName){
			return this.tab === tabName;
		};
	});

	app.controller('GalleryController', function(){
		this.current = 0;
		this.setCurrent = function(newGallery){
			this.current = newGallery || 0;
		};
	});

})();

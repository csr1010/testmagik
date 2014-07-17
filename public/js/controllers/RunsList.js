angular.module('testApp').controllerProvider.register('RunsListController',
		function($scope, $http, mobCheckFactory, currencyFactory,$location) {
			$scope.alert = {
				type : '',
				msg : ''
			};
			$scope.regListheight = (window.innerHeight - 50-60) + "px";
			$scope.firstLetter = 
			$scope.regHead = {
				firstLetter : "R",
				title : "uns List",
			};
			$scope.gototestcases = function(){
				$location.path("/home/testcases");
			};
			$scope.runDescs=[
			                 	"test run 1 fails",
			                 	"test run 3 fails test run 3 fails test run 3 fails test run 3 fails test run 3 fails "
			                 ];
			$scope.regBody = {
				regBoxmodel : [{
					runCount:1,
					status:{
						list : [ {txt: "Success",cls:"default"}, {txt: "fail",cls:"danger"}],
						selectedResult : "Active",
					},
					description:[{ desc:"test run 1 fails"},{ desc:"test run 1A fails"}]
				},
				{
					runCount:2,
					status:{
						list : [ {txt: "Active",cls:"default"}, {txt: "InActive",cls:"danger"}],
						selectedResult : "Active",
					},
					description:[{ desc:"test run 2 fails"},{ desc:"test run 2A fails"}]
				},
				{
					runCount:3,
					status:{
						list : [ {txt: "Active",cls:"default"}, {txt: "InActive",cls:"danger"}],
						selectedResult : "Active",
					},
					description:[{ desc:"test run 3 fails"}]
				}
             ]
			};
		});
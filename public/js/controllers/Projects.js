angular.module('testApp').controllerProvider.register('ProjctsListController',
		function($scope, $http, mobCheckFactory,$location,$window,$rootScope) {
			$scope.alert = {
				type : '',
				msg : ''
			};
			$rootScope.regListheight = (window.innerHeight - 50) + "px";
			$scope.regHead = {
				firstLetter : "",
				title : "Projects List",
				button:{
					plus:false
				}
			};
			$scope.gotoTestCases = function(){
				$location.path("/home/testcases/new");
			};
			$scope.provideuserSessionData = function(i){
				var wantd =  JSON.parse(sessionStorage.getItem('currentUser')) ?
						JSON.parse(sessionStorage.getItem('currentUser')).data[i].selectedResult : false
						if(!wantd){
							 $rootScope.$apply(function()
			       	    	          {
								 			$rootScope.logoff();
			       	    	          });
						}else{
							return wantd;
						}
			};
			$scope.opensettings=function(){
				if(window.innerWidth <=1230){
					$(".leftnavclass").css({
						"-webkit-transform":" translateX(0px) translateZ(0px) ",
						"-moz-transform":" translateX(0px) translateZ(0px) ",
						"-o-transform":" translateX(0px) translateZ(0px) ",
						"transform":" translateX(0px) translateZ(0px) ",
					});
					$(".blockr").css({
						"display":"block"
					});
				}
				/*setTimeout(function(){
					document.getElementsByClassName('leftnavclass')[0].style.webkitTransform = 'translateX(0px) translateZ(0px)  rotateY(0deg) rotateZ(0deg) ';
				},200);*/
				};
			$scope.regBody = {
				ProBoxmodel : []
			};
			(function(){
				var role = $scope.provideuserSessionData("role");
				 if(role=="Admin"){
					 $scope.regHead.button={
									plus:true
								};
				 }
				 else{
					 $scope.regHead.button={
								plus:false
							};
				 }
				 
				 var currentProjects = JSON.parse(mobCheckFactory.sessionStorer.getItem('currentProjects')) || [];
				 if(currentProjects.length > 0 ){
					 $scope.regBody.ProBoxmodel = currentProjects;
				 }
				 else{
					 $http({
				            url: '/fetchProjects',
				            method: "POST",
				            data:{
				            	Account:$scope.provideuserSessionData("Account")
				            }
				        }).success(function (data, status, headers, config) {
				        	    if(data.status){
				        	    	$scope.alert.type = "success";
				        	    	$scope.alert.msg = data.message;
				        	    	$scope.regBody.ProBoxmodel =[];
				        	    	$scope.regBody.ProBoxmodel  = data.data;
				        	    	mobCheckFactory.sessionStorer.setItem('currentProjects',JSON.stringify(data.data));
				        	    }else{
				        	    	$scope.alert.type = "danger";
				        	    	$scope.alert.msg = data.message;
				        	    }
				            }).error(function (data, status, headers, config) {
				            	alert("some thing is wrong"+status);
				            });
				 }
				 
				 
			})();
		});


/* {
					name:"Everyday",
					count:38,
					firstLetter:"E",
					color:"rgb(160, 221, 104)"
				}, {
					name:"Cleartrip",
					count:23,
					firstLetter:"C",
					color:"rgb(160, 221, 104)"
				},{
					name:"Exam Magik",
					count:10,
					firstLetter:"E",
					color:"rgb(68, 180, 255)"
				},
				 {
					name:"Password Reset",
					count:5,
					firstLetter:"P",
					color:"rgb(255, 68, 83)"
				},
				 {
					name:"Adv Time sheet",
					count:5,
					firstLetter:"A",
					color:"rgb(45, 195, 165)"
				},
				{
					name:"Vote Magik",
					count:3,
					firstLetter:"V",
					color:"rgb(45, 195, 165)"
				},{
					name:"Price Elasticity",
					count:15,
					firstLetter:"P",
					color:"rgb(131, 133, 85)"
				},{
					name:"Store Trip Analysis",
					count:2,
					firstLetter:"S",
					color:"rgb(160, 221, 104)"
				},{
					name:"Stop Watch",
					count:6,
					firstLetter:"S",
					color:"rgb(255, 68, 83)"
				}, {
					name:"Customer Orders",
					count:23,
					firstLetter:"C",
					color:"rgb(255, 68, 83)"
				},*/
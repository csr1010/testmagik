angular.module('testApp').controllerProvider.register('masternavcntrlr', 
		function($scope,$rootScope,$location,$timeout){
	$rootScope.regListheight =  (window.innerHeight - 50)+"px";
	$(window).resize(function(){
		$rootScope.$apply(function(){
			$rootScope.regListheight = (window.innerHeight - 50) + "px";
			$rootScope.usrMngmntListheight = (window.innerHeight - 50 ) + "px";
	    });
		if(window.innerWidth >1230){
			$(".leftnavclass").css({
				"-webkit-transform":" translateX(0px) translateZ(0px) ",
				"-moz-transform":" translateX(0px) translateZ(0px) ",
				"-o-transform":" translateX(0px) translateZ(0px) ",
				"transform":" translateX(0px) translateZ(0px) ",
			});
			$(".blockr").css({
				"-webkit-transform":" translateX(-100%) translateZ(0px) ",
				"-moz-transform":" translateX(-100%) translateZ(0px) ",
				"-o-transform":" translateX(-100%) translateZ(0px) ",
				"transform":" translateX(-100%) translateZ(0px) ",
			});
			//$(".leftnavclass .nonfilgridsholder").addClass("inleft").removeClass("movenorml");
		}
	});
	$scope.opensettings=function(){
		if(window.innerWidth <=1230){
			$(".leftnavclass,.blockr").css({
				"-webkit-transform":" translateX(0px) translateZ(0px) ",
				"-moz-transform":" translateX(0px) translateZ(0px) ",
				"-o-transform":" translateX(0px) translateZ(0px) ",
				"transform":" translateX(0px) translateZ(0px) ",
			});
		}
		};
		
	 if($.trim(sessionStorage.getItem("currentUser")) != "") 
	 {
		 var role = JSON.parse(sessionStorage.getItem('currentUser')).data.role.selectedResult
		 if(role=="Admin"){
			 $scope.navigationMenu = {
						header:{
				    		title:"TestsRun",
				    	},
				    	body:{
							menu:[
							      {title:"Users" ,href:".registration",icon:"icon icon-user-group"},
							      {title:"Projects" ,href:".ProjectsList",icon:"icon icon-folder"},
							      ]	
				    	}
				};
		 }
		 else{
			 $scope.navigationMenu = {
						header:{
				    		title:"Test Magik",
				    	},
				    	body:{
							menu:[
							      {title:"Projects" ,href:".ProjectsList",icon:"icon icon-folder"},
							      ]	
				    	}
				};
		 }
	 }
	 else{
		 $rootScope.logoff();
	 }
		
	$scope.closesettings=function(){
		if(window.innerWidth <=1230){
			$(".leftnavclass,.blockr").css({
				"-webkit-transform":" translateX(-100%) translateZ(0px) ",
				"-moz-transform":" translateX(-100%) translateZ(0px) ",
				"-o-transform":" translateX(-100%) translateZ(0px) ",
				"transform":" translateX(-100%) translateZ(0px) ",
			});
		}
		};
	$rootScope.logoff = function(){
		$location.path("/");
		sessionStorage.setItem("currentUser",null);
		sessionStorage.setItem("globalObject",null);
	};
});
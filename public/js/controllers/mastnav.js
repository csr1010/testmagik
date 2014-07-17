angular.module('testApp').controllerProvider.register('masternavcntrlr', 
		function($scope,$rootScope,$location){
	$rootScope.regListheight =  (window.innerHeight - 50)+"px";
	$(window).resize(function(){
		$rootScope.$apply(function(){
			$rootScope.regListheight = (window.innerHeight - 50) + "px";
			$rootScope.usrMngmntListheight = (window.innerHeight - 50 - 60 - 60 - 5) + "px";
	    });
		if(window.innerWidth >900){
			$(".leftnavclass").css({
				"-webkit-transform":" translateX(0px) translateZ(0px) ",
				"-moz-transform":" translateX(0px) translateZ(0px) ",
				"-o-transform":" translateX(0px) translateZ(0px) ",
				"transform":" translateX(0px) translateZ(0px) ",
			});
			$(".blockr").css({
				"display":"none"
			});
		}
	});
	$scope.opensettings=function(){
		if(window.innerWidth <=900){
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
							      {title:"User Management" ,href:".registration"},
							      {title:"Projects" ,href:".ProjectsList"},
							      ]	
				    	}
				};
		 }
		 else{
			 $scope.navigationMenu = {
						header:{
				    		title:"TestsRun",
				    	},
				    	body:{
							menu:[
							      {title:"Projects" ,href:".ProjectsList"},
							      ]	
				    	}
				};
		 }
	 }
	 else{
		 $scope.logoff();
	 }
	
	$scope.closesettings=function(){
		if(window.innerWidth <=900){
			$(".leftnavclass").css({
				"-webkit-transform":" translateX(-100%) translateZ(0px) ",
				"-moz-transform":" translateX(-100%) translateZ(0px) ",
				"-o-transform":" translateX(-100%) translateZ(0px) ",
				"transform":" translateX(-100%) translateZ(0px) ",
			});
			$(".blockr").css({
				"display":"none"
			});
		}
		/*setTimeout(function(){
			document.getElementsByClassName('leftnavclass')[0].style.webkitTransform = 'translateX(-100%) translateZ(0px)  rotateY(-30deg) rotateZ(0deg) ';
		},200);*/
		};
	$scope.logoff = function(){
		$location.path("/");
		sessionStorage.setItem("accountInfo","");
		sessionStorage.setItem("currentUser","");
		sessionStorage.setItem("currentWeekRange","");
	};
});
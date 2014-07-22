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
				"display":"none"
			});
			$(".nonfulfillClass").removeClass("blurrr");
			$(".leftnavclass .nonfilgridsholder").addClass("inleft").removeClass("movenorml");
		}
	});
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
			$(".nonfulfillClass").addClass("blurrr");
			$scope.movNormal();
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
		
		/*$rootScope.movrit= function(){
			$(".nonfulfillClass").addClass("moverit");
			$timeout(function(){
				
			},101);
		};*/
	 $scope.movNormal= function(){
		 $(".leftnavclass .nonfilgridsholder").addClass("movenorml");
	    	$timeout(function(){
	    		$(".leftnavclass .nonfilgridsholder").removeClass("inleft");
	    	},302);
		};
		$scope.movNFLNormal= function(){
			 $(".nonfulfillClass").addClass("movenorml");
		    	$timeout(function(){
		    		$(".nonfulfillClass").removeClass("inrit");
		    	},302);
			};
	$scope.closesettings=function(){
		if(window.innerWidth <=1230){
			$(".leftnavclass").css({
				"-webkit-transform":" translateX(-100%) translateZ(0px) ",
				"-moz-transform":" translateX(-100%) translateZ(0px) ",
				"-o-transform":" translateX(-100%) translateZ(0px) ",
				"transform":" translateX(-100%) translateZ(0px) ",
			});
			$(".blockr").css({
				"display":"none"
			});
			$(".nonfulfillClass").removeClass("blurrr");
			$(".leftnavclass .nonfilgridsholder").addClass("inleft").removeClass("movenorml");
		}
		/*setTimeout(function(){
			document.getElementsByClassName('leftnavclass')[0].style.webkitTransform = 'translateX(-100%) translateZ(0px)  rotateY(-30deg) rotateZ(0deg) ';
		},200);*/
		};
	$rootScope.logoff = function(){
		$location.path("/");
		sessionStorage.setItem("currentUser",null);
		sessionStorage.setItem("globalObject",null);
	};
});
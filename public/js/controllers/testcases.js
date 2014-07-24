angular.module('testApp').controllerProvider.register('testcasescontrlr', 
		function($rootScope,$scope,mobCheckFactory,$location,formvalidationFactory,serviceFactory){
	$rootScope.regListheight = (window.innerHeight - 50) + "px";
	$scope.testcsHead = {
		title : "Test Cases",
	};
	 $scope.alert =  { 
	         	type: '',
	         	msg: '' 
	           };
	$scope.testCasedetails={
			form:null,
			buttons:{
			         "add":false,
			         "edit":true,
			         "done":false,
			         "nav":true,
			         "del":false
			},
			readMode:true,
			projectdetails:true
	};
	$scope.navtoRun = function(to){
			$location.path("/home/RunsList/"+to);
	};
	$scope.gotoprjcts = function(){
		$location.path("/home/ProjectsList");
	};
	$scope.saveTestcases = function(){
		var errorResponse = formvalidationFactory.formValidation($scope.testCasedetails.form);
		if(!errorResponse.error ){
		$scope.testCasedetails.buttons={
		         "add":false,
		         "edit":true,
		         "done":false,
		         "nav":true,
		         "del":false
		};
		$scope.testCasedetails.readMode = true;
		$scope.testCasedetails.projectdetails=false;
		$scope.regBody.testcsBoxModel.color=mobCheckFactory.colorCodes[Math.round(Math.random(1)*10)];
		$scope.regBody.testcsBoxModel.timestamp = 
			JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')) ? 
				JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).timestamp : new Date().getTime() +"PR"+$scope.regBody.testcsBoxModel.empid.selectedResult;
		 
				 serviceFactory.getData({
			            url: '/saveProjectdetails',
			            method: "POST",
			            data: $scope.regBody.testcsBoxModel,
			        },$scope.ifregSuccess,$scope.iffail);
		}
		else{
			$scope.alert.type = "danger";
	    	$scope.alert.msg = errorResponse.description;
		}
	};
	 $scope.ifregSuccess = function(data){
 	    if(data.status){
	    	$scope.alert.type = "success";
	    	$scope.alert.msg = data.message;
	    	mobCheckFactory.sessionStorer.setItem('newProjectData',JSON.stringify($scope.regBody.testcsBoxModel));
	    	$scope.keepNewPorjctsinSession();
	    }else{
	    	$scope.alert.type = "danger";
	    	$scope.alert.msg = data.message;
	    }
    };
  $scope.iffetchSuccess = function(data){
	    if(data.status){
	    	$scope.regBody.testcsBoxModel = data.data;
	    	mobCheckFactory.sessionStorer.setItem('newProjectData',JSON.stringify($scope.regBody.testcsBoxModel));
	    	$scope.keepNewPorjctsinSession();
	    }else{
	    	$scope.alert.type = "danger";
	    	$scope.alert.msg = data.message;
	    }
  
  };
			 $scope.iffail = function(errorstat){
				 	$scope.alert.type = "danger";
			    	$scope.alert.msg = "oops ! something is wrong tryAgain"+errorstat;
			 };
	$scope.keepNewPorjctsinSession = function(){
		var currentProjects = JSON.parse(mobCheckFactory.sessionStorer.getItem('currentProjects')) || [];
    	currentProjects = currentProjects.filter(function(val){
				    		return val.timestamp != $scope.regBody.testcsBoxModel.timestamp;
    	});
    	currentProjects.unshift($scope.regBody.testcsBoxModel);
    	mobCheckFactory.sessionStorer.setItem('currentProjects',JSON.stringify(currentProjects));
	};
	$scope.editTestcases = function(){
		$scope.testCasedetails.buttons={
		         "add":true,
		         "edit":false,
		         "done":true,
		         "nav":false,
		         "del":true
		};
		$scope.testCasedetails.readMode = false;
		$scope.testCasedetails.projectdetails=true;
	};
	$scope.addTestCases = function(){
		var errorResponse = formvalidationFactory.formValidation($scope.testCasedetails.form);
		if(!errorResponse.error ){
			var newtestCase = {
					selectedResult:"",
					disabled:false,
					toDelete :false,
					color:"",
					info:{
						timestamp: new Date().getTime() +"TSC"+$scope.regBody.testcsBoxModel.empid.selectedResult,
						currentRuncount:0,
						succsCount:0,
						failCount:0,
						timeSpent:"0 hrs"
					}
					
				};
			newtestCase.color = mobCheckFactory.colorCodes[Math.round(Math.random(1)*10)];
			$scope.regBody.testcsBoxModel.testCases.unshift(newtestCase);
			$scope.regBody.testcsBoxModel.count.selectedResult = $scope.regBody.testcsBoxModel.testCases.length;
		}else{
			$scope.alert.type = "danger";
	    	$scope.alert.msg = errorResponse.description;
		}
	};
	$scope.deletetestCase = function(i){
		i.toDelete = true;
		$scope.regBody.testcsBoxModel.testCases=
		$scope.regBody.testcsBoxModel.testCases.filter(function(val){
				return !val.toDelete;
		});
		$scope.regBody.testcsBoxModel.count.selectedResult = $scope.regBody.testcsBoxModel.testCases.length;
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
	$scope.regBody = {
			testcsBoxModel :{ 
				timestamp:new Date().getTime(),
				JIRANumber:{
					selectedResult:"",
					placeHolder:"enter JIRA NO:",
					disabled:false,
				},
				Account:{
					selectedResult:$scope.provideuserSessionData("Account"),
				},
				empid:{
					selectedResult:$scope.provideuserSessionData("empid"),
				},
				name:{
					selectedResult:"",
					placeHolder:"enter Project Name",
					disabled:false,
				},
				color:"",
				count:{
					selectedResult:0,
					placeHolder:"No:tst cases",
					disabled:true,
					type:mobCheckFactory.mobileCheck() ? "number" :"number"
				},
				testCases:[]
			},
		};
	$scope.getProjectTestCases = function(ts){
		 serviceFactory.getData({
	            url: '/fetchSelectdProjct/'+ts,
	            method: "GET",
	            cache:true,
	        },$scope.iffetchSuccess ,$scope.iffail);
	};
	(function(){
		var pathLocation = $location.$$url.split("/");
		var endID = pathLocation[pathLocation.length-1];
		var role = $scope.provideuserSessionData("role");
		if(role=="Admin"){
			if(endID ==="new"){
			$scope.testCasedetails.buttons={
					         "add":true,
					         "edit":false,
					         "done":true,
					         "nav":false,
					         "del":true
					};
			$scope.testCasedetails.readMode = false;
			$scope.testCasedetails.projectdetails=true;
			}
			else{
					$scope.testCasedetails.buttons={
							         "add":false,
							         "edit":true,
							         "done":false,
							         "nav":true,
							         "del":false
							};
					$scope.testCasedetails.readMode = true;
					$scope.testCasedetails.projectdetails=false;
			}
		}
	 else{
		 $scope.testCasedetails.buttons={
		         "add":false,
		         "edit":false,
		         "done":false,
		         "nav":true,
		         "del":false
		};
		 $scope.testCasedetails.readMode = true;
		 $scope.testCasedetails.projectdetails=false;
	 }
				if(endID ==="new"){
					mobCheckFactory.sessionStorer.setItem('newProjectData',null);
				}
				else{
					var currentProjects = JSON.parse(mobCheckFactory.sessionStorer.getItem('currentProjects')) || [];
					if(currentProjects.length > 0 ){
						var projectFound = false;
						for(var i=0;i<currentProjects.length;i++){
							if(currentProjects[i].timestamp == endID){
								$scope.regBody.testcsBoxModel = currentProjects[i];
								mobCheckFactory.sessionStorer.setItem('newProjectData',JSON.stringify($scope.regBody.testcsBoxModel));
								projectFound = true;
								break;
							}
						}
						if(!projectFound){
							$scope.getProjectTestCases( endID);
						}
					}
					else{
						$scope.getProjectTestCases( endID);
					}
				}
	})();
});


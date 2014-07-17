angular.module('testApp').controllerProvider.register('testcasescontrlr', 
		function($scope,mobCheckFactory,$location,formvalidationFactory,$http){
	$scope.regListheight = (window.innerHeight - 50) + "px";
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
		$scope.testCasedetails.projectdetails=true;
		$scope.regBody.testcsBoxModel.color=mobCheckFactory.colorCodes[Math.round(Math.random(1)*10)];
		$scope.regBody.testcsBoxModel.timestamp = 
			JSON.parse(sessionStorage.getItem('newProjectData')) ? 
				JSON.parse(sessionStorage.getItem('newProjectData')).timestamp : new Date().getTime()
		 $http({
	            url: '/saveProjectdetails',
	            method: "POST",
	            data: $scope.regBody.testcsBoxModel,
	        }).success(function (data, status, headers, config) {
	        	    if(data.status){
	        	    	$scope.alert.type = "success";
	        	    	$scope.alert.msg = data.message;
	        	    	sessionStorage.setItem('newProjectData',JSON.stringify($scope.regBody.testcsBoxModel));
	        	    	$scope.keepNewPorjctsinSession();
	        	    }else{
	        	    	$scope.alert.type = "danger";
	        	    	$scope.alert.msg = data.message;
	        	    }
	            }).error(function (data, status, headers, config) {
	            	alert("some thing is wrong"+status);
	            });
		}
		else{
			$scope.alert.type = "danger";
	    	$scope.alert.msg = errorResponse.description;
		}
	};
	$scope.keepNewPorjctsinSession = function(){
		var currentProjects = JSON.parse(sessionStorage.getItem('currentProjects')) || [];
    	currentProjects = currentProjects.filter(function(val){
				    		return val.timestamp != $scope.regBody.testcsBoxModel.timestamp;
    	});
    	currentProjects.unshift($scope.regBody.testcsBoxModel);
    	sessionStorage.setItem('currentProjects',JSON.stringify(currentProjects));
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
					toDelete:false,
					color:"",
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
	$scope.regBody = {
			testcsBoxModel :{
				timestamp:new Date().getTime(),
				Account:{
					selectedResult:JSON.parse(sessionStorage.getItem('currentUser')).data.Account.selectedResult,
				},
				empid:{
					selectedResult:JSON.parse(sessionStorage.getItem('currentUser')).data.empid.selectedResult,
				},
				name:{
					selectedResult:"",
					placeHolder:"enter Project Name",
					disabled:false,
				},
				color:"",
				count:{
					selectedResult:"",
					placeHolder:"No:tst cases",
					disabled:true,
					type:mobCheckFactory.mobileCheck() ? "number" :"text"
				},
				testCases:[]
			},
		};
	$scope.getProjectTestCases = function(ts){
		 $http({
	            url: '/fetchSelectdProjct/'+ts,
	            method: "GET",
	            cache:true,
	        }).success(function (data, status, headers, config) {
	        	    if(data.status){
	        	    	$scope.regBody.testcsBoxModel = data.data;
	        	    	sessionStorage.setItem('newProjectData',JSON.stringify($scope.regBody.testcsBoxModel));
	        	    	$scope.keepNewPorjctsinSession();
	        	    }else{
	        	    	$scope.alert.type = "danger";
	        	    	$scope.alert.msg = data.message;
	        	    }
	            }).error(function (data, status, headers, config) {
	            	alert("some thing is wrong"+status);
	            });
	};
	(function(){
		var pathLocation = $location.$$url.split("/");
		var endID = pathLocation[pathLocation.length-1];
		var role = JSON.parse(sessionStorage.getItem('currentUser')).data.role.selectedResult;
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
					sessionStorage.setItem('newProjectData',null);
				}
				else{
					var currentProjects = JSON.parse(sessionStorage.getItem('currentProjects')) || [];
					if(currentProjects.length > 0 ){
						var projectFound = false;
						for(var i=0;i<currentProjects.length;i++){
							if(currentProjects[i].timestamp == endID){
								$scope.regBody.testcsBoxModel = currentProjects[i];
								sessionStorage.setItem('newProjectData',JSON.stringify($scope.regBody.testcsBoxModel));
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


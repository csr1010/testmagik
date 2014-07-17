angular.module('testApp').controllerProvider.register('logregController', function(
		$scope,mobCheckFactory,formvalidationFactory, $http,$location)
{
	 $scope.alert =  { 
	                	type: '',
	                	msg: '' 
	                  };
	 
	 $scope.logindetails={
		form:"",
		empid:{
			placeHolder:"EMP ID",
    		selectedResult:"",
    		type:mobCheckFactory.mobileCheck() ? "number" :"number"
		},
		pwd:{
			placeHolder:"password",
    		selectedResult:"",
		}
	 };
	 $scope.login = function(){
		   if(!formvalidationFactory.formValidation($scope.logindetails.form).error){
		   		delete $scope.logindetails.form;
				var postData = formvalidationFactory.formSerialization($scope.logindetails) ;
				
			 
				 $http({
			            url: '/signIn',
			            method: "POST",
			            data: postData,
			        }).success(function (result, status, headers, config) {
			        	    if(result.status){
			        	    	sessionStorage.setItem("currentUser",JSON.stringify(result));
			        	    	$location[result.data.path.method](result.data.path.url);
			        	    }else{
			        	    	$scope.alert.type = "danger";
			        	    	$scope.alert.msg = result.message;
			        	    }
			            }).error(function (data, status, headers, config) {
			            	alert("some thing is wrong"+status);
			            });
			 }
		   else{
				 alert("some thing is wrong")
			 }
		 };
		 $scope.regDetails={
					info : {
						disabled : false,
						classy : false,
						isChanged:false,
						tobeDeleted:false,
						isExisting:true,
						isChangedtoNeutral:false
					},
					chckybox : {
						selectedResult : false,
					},
					empid : {
						type : mobCheckFactory.mobileCheck() ? "number"
								: "number",
						selectedResult : "",
						placeHolder : "EMP ID",
					},
					name : {
						selectedResult : "",
						placeHolder : "EMP NAME",
					},
					transferTO:{
						selectedResult : "",
						transferDone:false
					},
					contact:{
					type : mobCheckFactory.mobileCheck() ? "number"
								: "number",
						selectedResult : "",
						placeHolder : "CONTACT NO:",
					},
					Account : {
						list:[
						       "The Home Depot CA"  ,
						       "KLM AirLines"  ,
						     ],
						selectedResult : "",
						placeHolder : "Account",
						disabled : true
					},
					role : {
						list : [ "Admin", "SubOrdinate", "NoRole" ],
						selectedResult : "Admin",
					},
					status : {
						list : [ {txt: "Active",cls:"success"}, {txt: "InActive",cls:"default"}],
						selectedResult : "Active",
					},
					pwd:{
						placeHolder:"password",
			    		selectedResult:"",
					},
					form:"",
				};
	 
	 $scope.registration = function(){
	   if(!formvalidationFactory.formValidation($scope.regDetails.form).error){
			//var postData = formvalidationFactory.formSerialization($scope.regDetails) ;
			delete $scope.regDetails.form;
		 
			 $http({
		            url: '/registerAdmin',
		            method: "POST",
		            data: $scope.regDetails,
		        }).success(function (data, status, headers, config) {
		        	    if(data.status){
		        	    	$scope.alert.type = "success";
		        	    	$scope.alert.msg = data.message;
		        	    }else{
		        	    	$scope.alert.type = "danger";
		        	    	$scope.alert.msg = data.message;
		        	    }
		            }).error(function (data, status, headers, config) {
		            	alert("some thing is wrong"+status);
		            });
		 }
	   else{
			 alert("some thing is wrong")
		 }
	 };
});
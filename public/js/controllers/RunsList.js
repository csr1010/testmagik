angular.module('testApp').controllerProvider.register('RunsListController',
		function($scope, $http, mobCheckFactory, formvalidationFactory,$location,$rootScope,$window,timerFactory,$cacheFactory) {
			$scope.alert = {
				type : '',
				msg : '',
				endID:"",
				zera:"",
				form:null,
				moreBut:true,
				lessbut:false
			};
			(function(){
				var pathLocation = $location.$$url.split("/");
				$scope.alert.endID = pathLocation[pathLocation.length-1];
				$scope.alert.zera = JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).zeraNumber.selectedResult;
				timerFactory.eventdelgt();
			})();
			$rootScope.times="00 : 00 : 00";
			$rootScope.regListheight = (window.innerHeight - 50) + "px";
			$scope.gettstTitle = function(){
				var dump = JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData'))?
						    JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).testCases : false;
						    if(!dump){
						    	$location.path("/home/ProjectsList");
						    }
				var title="";
				for(var j = 0 ; j < dump.length ; j++){
					if(dump[j].info.timestamp == $scope.alert.endID){
						title = dump[j].selectedResult;
						break;
					}
				}
				return title;
			};
			$scope.regHead = {
				title : $scope.gettstTitle() ,
			};
			$scope.gototestcases = function(){
				//$window.history.back();
				$scope.stopTime();
				var ts  = 
					JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')) ? 
						JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).timestamp : "new";
						$location.path("/home/testcases/"+ts);
			};
			$scope.runDescs=[ ];
			$scope.addRunissue = function(){
				var errorResponse = formvalidationFactory.formValidation($scope.alert.form);
				if(!errorResponse.error ){
					var newrunIssue  =  {
							toDelete :false,
							selectedResult:"",
							placeHolder:"issue description",
							disabled:false,
						};
					
					$scope.regBody.runBoxmodel[0].description.forEach(function(val,indx){
						if($scope.runDescs.indexOf(val.selectedResult) == -1)
							$scope.runDescs.unshift(val.selectedResult);
					});
					
					$scope.regBody.runBoxmodel[0].description.unshift(newrunIssue);
					$scope.regBody.runBoxmodel[0].issueCount.selectedResult = $scope.regBody.runBoxmodel[0].description.length;
				}else{
					$scope.alert.type = "danger";
			    	$scope.alert.msg = errorResponse.description;
				}
			};
			$scope.saveruns= function(){
				var errorResponse = formvalidationFactory.formValidation($scope.alert.form);
				if(!errorResponse.error ){
					$scope.stopTime();
					$scope.regBody.runBoxmodel[0].times.actTime.selectedResult = $rootScope.times;
					$scope.regBody.runBoxmodel[0].runCount = 	$scope.currentRunCount;
				 $http({
			            url: '/saveRundetails',
			            method: "POST",
			            data: $scope.regBody.runBoxmodel[0],
			        }).success(function (data, status, headers, config) {
			        	    if(data.status){
			        	    	$scope.alert.type = "success";
			        	    	$scope.alert.msg = data.message;
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
			$scope.keepNewPorjctsinSession=function(){
				var hasProp = false;
				var obj =JSON.parse(mobCheckFactory.sessionStorer.getItem('runData')) || {};
    	    	obj.hasOwnProperty($scope.regBody.runBoxmodel[0].info.tstCASID) 
    	    	    ? hasProp = true 
    	    	     : obj[$scope.regBody.runBoxmodel[0].info.tstCASID] = $scope.regBody.runBoxmodel[0];
    	    	if(hasProp){
    	    		var dump = obj[$scope.regBody.runBoxmodel[0].info.tstCASID];
    	    		for(var j = 0 ; j < dump.length ; j++){
    					if(dump[j].timestamp == $scope.regBody.runBoxmodel[0].timestamp){
    						dump.splice(j,1);
    						break;
    					}
    	    		}
    					dump.unshift($scope.regBody.runBoxmodel[0]);
    	    	}
    	    	
    	    	mobCheckFactory.sessionStorer.setItem("runData",JSON.stringify(obj));
			};
			$scope.keepoldPorjctsinSession=function(){
				var obj =JSON.parse(mobCheckFactory.sessionStorer.getItem('runData')) || {};
				$scope.regBody.oldrunBoxmodel.forEach(function(val,indx){
					if(indx==0) obj[val.info.tstCASID]=[];
					obj[val.info.tstCASID].unshift(val);
				});
    	    	mobCheckFactory.sessionStorer.setItem("runData",JSON.stringify(obj));
			};
		/*	$scope.getCountFromDB = function(id){
				var dummObj = {};
				dummObj[id] =[];
				var obj =JSON.parse(mobCheckFactory.sessionStorer.getItem('runData')) || dummObj;
				return obj.hasOwnProperty(id) ? obj[id].length+1 : 1;
			};*/
			$scope.currentRunCount = 0;
			$scope.getCountFromDB = function(){
				var currentZERA = $scope.alert.zera;
				var tstcasId = $scope.alert.endID ;
				$http({
		            url: '/fetchSelectdRUNZERACount/'+currentZERA+"_"+tstcasId+"_"+new Date().getTime(),
		            method: "GET",
		            cache:false,
		        }).success(function (data, status, headers, config) {
		        	    if(data.status){
		        	    	$scope.currentRunCount =  data.data;
		        	    }else{
		        	    	$scope.currentRunCount =  1;
		        	    }
		            }).error(function (data, status, headers, config) {
		            	alert("some thing is wrong"+status);
		            });
			};
			$scope.ifrunsuccs = function(){
				$scope.regBody.runBoxmodel[0].description=[];
				$scope.regBody.runBoxmodel[0].issueCount.selectedResult = $scope.regBody.runBoxmodel[0].description.length;
				$scope.regBody.runBoxmodel[0].issueCatgory.selectedResult ="none";
			};
			$scope.deleterunIssue = function(i){
				i.toDelete = true;
				$scope.regBody.runBoxmodel[0].description=
					$scope.regBody.runBoxmodel[0].description.filter(function(val){
						return !val.toDelete;
				});
				$scope.regBody.runBoxmodel[0].issueCount.selectedResult = $scope.regBody.runBoxmodel[0].description.length;
			};
			$scope.regBody = {
					oldrunBoxmodel : []
			};
			$scope.showprev=function(){
				$scope.alert.lessbut = true;
				$scope.alert.moreBut = false;
				var id = $scope.alert.endID;
				var dummObj = {};
				dummObj[id] =[];
				var obj =JSON.parse(mobCheckFactory.sessionStorer.getItem('runData')) || dummObj;
				if(obj.hasOwnProperty(id) && obj[id].length>0){
					var dump = obj[id];
					$scope.regBody.oldrunBoxmodel = [];
					$scope.regBody.oldrunBoxmodel = $scope.regBody.oldrunBoxmodel.concat(dump);
				}	
				else{
					var currentZERA = $scope.alert.zera;
					var tstcasId = $scope.alert.endID ;
					$scope.getrunbyZERA(currentZERA+"_"+tstcasId+"_"+new Date().getTime());
				}
			};
			$scope.hideprev=function(){
				$scope.alert.lessbut = false;
				$scope.alert.moreBut = true;
					$scope.regBody.oldrunBoxmodel = [];
			};
			$scope.getrunbyZERA = function(ts){
				 $http({
			            url: '/fetchSelectdRUNZERA/'+ts,
			            method: "GET",
			            cache:false,
			        }).success(function (data, status, headers, config) {
			        	    if(data.status){
			        	    	$scope.regBody.oldrunBoxmodel = data.data;
			        	    	$scope.keepoldPorjctsinSession();
			        	    }else{
			        	    	$scope.alert.type = "danger";
			        	    	$scope.alert.msg = data.message;
			        	    }
			            }).error(function (data, status, headers, config) {
			            	alert("some thing is wrong"+status);
			            });
			};
			$scope.provideuserSessionData = function(i){
				var wantd =  JSON.parse(sessionStorage.getItem('currentUser')) ?
						JSON.parse(sessionStorage.getItem('currentUser')).data[i].selectedResult : false
						if(!wantd){
							 $rootScope.$apply(function()
			       	    	          {
								 			$rootScope.logoff();
			       	    	          });
						}
						else{
							return wantd;
						}
			};
			$scope.regBody = { 
				runBoxmodel : [{
					timestamp: new Date().getTime() +"RUN"+$scope.provideuserSessionData("empid"),
					info:{
						zeraNumber:$scope.alert.zera,
						projID:JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).timestamp, 
						tstCASID:$scope.alert.endID 
					},
					runCount: $scope.getCountFromDB(),
					times:{
						disabled:false,
						estTime:{
							selectedResult:"02 : 30 : 00",
							disabled:false,
						},
						actTime:{
							selectedResult:$rootScope.times,
							disabled:false,
							strtTSmp:new Date().getTime(),
							endTSmp:new Date().getTime()

						}
					},
					Account:{
						selectedResult:$scope.provideuserSessionData("Account"),
					},
					empid:{
						selectedResult:$scope.provideuserSessionData("empid"),
					},
					status:{
						disabled:false,
						list : [ {txt: "Success",cls:"default"}, {txt: "fail",cls:"danger"}],
						selectedResult : "Active",
					},
					color:mobCheckFactory.colorCodes[Math.round(Math.random(1)*10)],
					issueCount:{
						selectedResult:0,
						placeHolder:"No:Issues",
						disabled:true,
						type:mobCheckFactory.mobileCheck() ? "number" :"number"
					},
					issueCatgory:{
						list:[
						       "none",
						       "Cat1"  ,
						       "Cat2"  ,
						     ],
						selectedResult : "none",
						disabled : false
					},
					description:[
					             {
					            	 toDelete :false,
						selectedResult:"",
						placeHolder:"issue description",
						disabled:false,
					}]
				}
             ]
			};
			$scope.startTime = function(){
				$scope.regBody.runBoxmodel[0].times.actTime.strtTSmp = new Date().getTime();
				timerFactory.start();
			};
			$scope.stopTime = function(){
				timerFactory.stop();
				 $scope.regBody.runBoxmodel[0].times.actTime.endTSmp = new Date().getTime();
			};
		});
angular.module('testApp').controllerProvider.register('RunsListController',
		function($scope, serviceFactory, mobCheckFactory, formvalidationFactory,$location,$rootScope,$window,timerFactory,$cacheFactory) {
			$scope.alert = {
				type : '',
				msg : '',
				endID:"",
				JIRA:"",
				jiraStatus:"",
				form:null,
				moreBut:true,
				lessbut:false,
				buttns:{
					strt:true,
					hold:false,
					cont:false,
					end:true,
					save:true,
					add:true,
				}
			};
			(function(){
				var pathLocation = $location.$$url.split("/");
				$scope.alert.endID = pathLocation[pathLocation.length-1];
				$scope.alert.JIRA = JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).JIRAS.currentJIRA.selectedResult;
				$scope.alert.jiraStatus = JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).JIRAS.currentJIRA.status.selectedResult;
				if($scope.alert.jiraStatus !="Active"){
					//$scope.regBody.runBoxmodel = [];
					$scope.alert.buttns.save = false;
					$scope.alert.buttns.add = false;
					//$scope.showprev();
				}
				else{
					timerFactory.eventdelgt();
				}
				
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
					if(dump[j].info.tscsid == $scope.alert.endID){
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
						JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).prjid : "new";
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
			 $scope.ifregSuccess = function(data){
	        	    if(data.status){
	        	    	$scope.alert.type = "success";
	        	    	$scope.alert.msg = data.message;
	        	    	$scope.keepNewPorjctsinSession();
	        	    }else{
	        	    	$scope.alert.type = "danger";
	        	    	$scope.alert.msg = data.message;
	        	    }
	            };
			  $scope.iffetchSuccess = function(data){
	        	    if(data.status){
	        	    	$scope.currentRunCount =  data.data;
	        	    }else{
	        	    	$scope.currentRunCount =  1;
	        	    }
	            };
			  $scope.iffetch2Success = function(data){
	        	    if(data.status){
	        	    	$scope.regBody.oldrunBoxmodel = data.data;
	        	    	$scope.keepoldPorjctsinSession();
	        	    }else{
	        	    	$scope.alert.type = "danger";
	        	    	$scope.alert.msg = data.message;
	        	    }
	            
			  };
						 $scope.iffail = function(errorstat){
							 	$scope.alert.type = "danger";
						    	$scope.alert.msg = "oops ! something is wrong tryAgain"
						 };
			$scope.saveruns= function(){
				var errorResponse = formvalidationFactory.formValidation($scope.alert.form);
				if(!errorResponse.error ){
					$scope.stopTime();
					$scope.regBody.runBoxmodel[0].times.actTime.selectedResult = $rootScope.times;
					$scope.regBody.runBoxmodel[0].runCount = 	$scope.currentRunCount;
					 serviceFactory.getData({
				            url: '/saveRundetails',
				            method: "POST",
				            data: $scope.regBody.runBoxmodel[0],
				        },$scope.ifregSuccess,$scope.iffail);
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
    					if(dump[j].runid == $scope.regBody.runBoxmodel[0].runid){
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
				var currentJIRA = $scope.alert.JIRA;
				var tstcasId = $scope.alert.endID ;
				serviceFactory.getData({
		            url: '/fetchSelectdRUNJIRACount/'+currentJIRA+"_"+tstcasId+"_"+new Date().getTime(),
		            method: "GET",
		            cache:false,
		        },$scope.iffetchSuccess ,$scope.iffail);
				
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
					var currentJIRA = $scope.alert.JIRA;
					var tstcasId = $scope.alert.endID ;
					$scope.getrunbyJIRA(currentJIRA+"_"+tstcasId+"_"+new Date().getTime());
				}
			};
			$scope.hideprev=function(){
				$scope.alert.lessbut = false;
				$scope.alert.moreBut = true;
					$scope.regBody.oldrunBoxmodel = [];
			};
			$scope.getrunbyJIRA = function(ts){
				serviceFactory.getData({
		            url: '/fetchSelectdRUNJIRA/'+ts,
		            method: "GET",
		            cache:false,
		        },$scope.iffetch2Success ,$scope.iffail);
			};
			$scope.provideuserSessionData = function(i){
				var wantd =  JSON.parse(localStorage.getItem('currentUser')) ?
						JSON.parse(localStorage.getItem('currentUser')).data[i].selectedResult : false
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
					runid: new Date().getTime() +"RUN"+$scope.provideuserSessionData("empid"),
					info:{
						JIRANumber:$scope.alert.JIRA,
						projID:JSON.parse(mobCheckFactory.sessionStorer.getItem('newProjectData')).prjid, 
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
						selectedResult : "fail",
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
				$scope.alert.buttns.strt = false;
				$scope.alert.buttns.cont = false;
				$scope.alert.buttns.hold = true;
			};
			$scope.stopTime = function(){
				timerFactory.stop();
				 $scope.regBody.runBoxmodel[0].times.actTime.endTSmp = new Date().getTime();
				 $scope.alert.buttns.strt = true;
					$scope.alert.buttns.cont = false;
					$scope.alert.buttns.hold = false;
			};
			$scope.holdTime = function(){
				timerFactory.hold();
				 $scope.alert.buttns.strt = false;
					$scope.alert.buttns.cont = true;
					$scope.alert.buttns.hold = false;
			};
			$scope.continueTime = function(){
				timerFactory.cont();
				 $scope.alert.buttns.strt = false;
					$scope.alert.buttns.cont = false;
					$scope.alert.buttns.hold = true;
				 
			};
		});
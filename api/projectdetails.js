var  prjreturnMessage ={
			data:{},
			message:"",
			status:false
	};
var curntObjct = this;
exports.createProject = function(req, res) {
	var x =req.body;
		var objectID = req.body.timestamp ;
		var accountName = req.body.Account.selectedResult ;
		db.projects.update({'timestamp':objectID,'Account.selectedResult':accountName},x,{upsert:true},function(err,doc){
			if(doc){
				prjreturnMessage.status=true;
	        	prjreturnMessage.message ="project saved successfully";
				prjreturnMessage.timestamp =doc.timestamp;
				 res.jsonp(prjreturnMessage);
		 }
		});

  };
exports.createrun = function(req, res) {
	var x =req.body;
		var objectID = req.body.timestamp ;
		var accountName = req.body.Account.selectedResult ;
		db.runlist.update({'timestamp':objectID,'Account.selectedResult':accountName},x,{upsert:true},function(err,doc){
			if(doc){
				prjreturnMessage.status=true;
	        	prjreturnMessage.message ="Run saved successfully";
				//prjreturnMessage.timestamp =doc.timestamp;
				 res.jsonp(prjreturnMessage);
		 }
		});

  };
exports.getALLProjects = function(req, res) {
		var accountName = req.body.Account;
		db.projects.find({'Account.selectedResult':accountName},function(err,doc){
			if(doc){
				prjreturnMessage.status=true;
	        		prjreturnMessage.message ="projects fetched successfully";
				prjreturnMessage.data = doc;
				 res.jsonp(prjreturnMessage);
		 }
else{
prjreturnMessage.status=false;
	        		prjreturnMessage.message ="No projects";
					 res.jsonp(prjreturnMessage);
}
		});

  };
exports.getfixdprojct = function(req, res) {
		 var ts= req.params.ts;
		db.projects.find({'timestamp':ts},function(err,doc){
			if(doc){
				prjreturnMessage.status=true;
	        		prjreturnMessage.message ="projects fetched successfully";
				prjreturnMessage.data = doc;
				 res.jsonp(prjreturnMessage);
		 }
else{
prjreturnMessage.status=false;
	        		prjreturnMessage.message ="No projects";
					 res.jsonp(prjreturnMessage);
}
		});

  };
  exports.getrunsbyJIRA = function(req, res) {
		 var zertst= req.params.JIRA.split("_");
		 var zr = zertst[0];
		 var ts = zertst[1];
		db.runlist.find({'info.JIRANumber':zr,'info.tstCASID':ts},function(err,doc){
			if(doc){
				prjreturnMessage.status=true;
	        		prjreturnMessage.message ="previous RUNS fetched successfully";
				prjreturnMessage.data = doc;
				 res.jsonp(prjreturnMessage);
		 }
else{
prjreturnMessage.status=false;
	        		prjreturnMessage.message ="No RUNS";
					 res.jsonp(prjreturnMessage);
}
		});

  };
   exports.getrunsCountbyJIRA = function(req, res) {
		 var zertst= req.params.JIRA.split("_");
		 var zr = zertst[0];
		 var ts = zertst[1];
		db.runlist.count({'info.JIRANumber':zr,'info.tstCASID':ts},function(err,doc){
			if(doc){
			console.log(doc);
				prjreturnMessage.status=true;
	        		prjreturnMessage.message ="";
				prjreturnMessage.data = doc+1;
				 res.jsonp(prjreturnMessage);
		 }
else{
prjreturnMessage.status=false;
	        		prjreturnMessage.message ="No RUNS";
					 res.jsonp(prjreturnMessage);
}
		});

  };
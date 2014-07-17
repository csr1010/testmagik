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
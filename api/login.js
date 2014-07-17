	var  returnMessage ={
			data:{},
			message:"",
			status:false
	};
	function addnew(x){
		x[0].info.isChanged = false;
		x[0].info.isChangedtoNeutral = false;
			db.users.update({empid:x[0].empid},
					{$set:{
					 info:x[0].info,
					 status:x[0].status,
					 role:x[0].role,
					 
					 Account:x[0].Account,
					 
					 contact:x[0].contact,
					 transferTO:x[0].transferTO,
					 chckybox:x[0].chckybox,
					 empid:x[0].empid,
					 name:x[0].name,
					}
			       },{upsert:true},function(){
				x.shift();
				if(x.length!=0)
				addnew(x);
			});
		};
	function updateTransfers(x){
		db.nflData.update(
				{
					'info.userEMPID':x[0].empid
				},
				{$set:{
					'info.userEMPID':x[0].trandfrID
				}
				},
				{
					multi:true
				},
				function(){
					x.shift();
					if(x.length!=0)
						updateTransfers(x);
				});
	};
	exports.createAdmin = function(req, res) {
		var x =req.body;
		var empid = req.body.empid.selectedResult;
		delete x.Account.list;
		db.users.update({'empid.selectedResult':empid},x,{upsert:true},function(err,doc){
			if(doc){
				returnMessage.status=true;
	        	returnMessage.message ="Registered successfully";
				res.jsonp(returnMessage);
		 }
		});
	};
	exports.create = function(req, res) {
	var x =req.body;
	var account = req.body[0].Account.selectedResult;
	addnew(x);
	db.users.update({
		'info.isExisting':false,
		'Account.selectedResult':account,
	},{$set:{
		'info.isExisting':true,
		'pwd.selectedResult':"root"
	}},{multi:true},function(){
		db.users.remove(
				{
				  'info.tobeDeleted':true,
				  'Account.selectedResult':account,
				}
		);	
	});
	
  };
  exports.findallusers = function(req, res){
	  var accountID = req.params.account;
	  console.log(accountID);
	  db.users.find({
     		"Account.selectedResult":accountID
		}, function(err, doc) {
			 if(doc == null){
				   	returnMessage.status=false;
		        	returnMessage.message ="No users found,so not able to fetch records";
					res.jsonp(returnMessage);
			   }
			 else{
				 	returnMessage.data=doc;
					returnMessage.status=true;
		        	returnMessage.message ="Fetched All available Employees from  "+ accountID;
					res.jsonp(returnMessage);
			 }
		});
  };
 exports.getcurrencyCodes = function(req, res){
	 var accountID = req.params.account;
	 db.accounts.findOne({
			'fullname.selectedResult':accountID
		}, function(err, doc) {
			 if(doc == null){
				   	returnMessage.status=false;
		        	returnMessage.message ="No account found,so not able to fetch currency Codes";
					res.jsonp(returnMessage);
			   }
			 else{
				 	returnMessage.data=doc;
					returnMessage.status=true;
		        	returnMessage.message ="success";
					res.jsonp(returnMessage);
			 }
		});
 };
 exports.findbyID = function(req, res) {
	    var empid = req.body.empid;
		var pwd = req.body.pwd;
		console.log(empid)
		console.log(pwd)
		db.users.findOne({
			'empid.selectedResult':	{ $in : [ empid.toString(), empid ] } 
		}, function(err, doc) {
		   if(doc == null){
			   	returnMessage.status=false;
	        	returnMessage.message ="Dear  " +empid+ ",it seems you haven't registered yet,Please register"
				res.jsonp(returnMessage);
		   }
		   else{
					if(doc !=null  && doc.hasOwnProperty('pwd') && 
							doc.status.selectedResult=="Active" &&
							doc.role.selectedResult!="NoRole" &&
							doc.pwd.selectedResult == pwd && 
							doc.hasOwnProperty('empid') && 
							doc.empid.selectedResult == empid){
						
						delete doc.pwd;
						doc.path={
								url:"/home/ProjectsList",
								method:"path",
						};
						returnMessage.data=doc;
						returnMessage.status=true;
			        	returnMessage.message ="success";
						res.jsonp(returnMessage);
					}
					else{
						returnMessage.status=false;
			        	returnMessage.message ="Dear  " +empid + ", your credentials seems invalid, or NO Access please contact Admin"
						res.jsonp(returnMessage);
					}
				}
			});
			
  };

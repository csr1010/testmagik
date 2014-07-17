angular.module('testApp').provide.service('mobCheckFactory', function($rootScope) {
	return mobileCheckresult ={
				colorCodes:[
				            "RGB(164, 196, 0)",
				            "RGB(96, 169, 23)",
				            "RGB(250, 104, 0)",
				            "RGB(244, 114, 208)",
				            "RGB(27, 161, 226)",
				            "RGB(0, 80, 239)",
				            "RGB(216, 0, 115)",
				            "RGB(240, 163, 10)",
				            "#FF8E8E",
				            "#ADFA95",
				            "RGB(118, 96, 138)",
				            ],
				mobileCheck:function isMobile() {
				    var mobile = ['iphone','ipad','android','blackberry',
				                  'nokia','opera mini','windows mobile','windows phone','iemobile']; 
				    for (var i in mobile)
				    	if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) 
				    		return true;
				    return false;//default
				},
		 };
	 });
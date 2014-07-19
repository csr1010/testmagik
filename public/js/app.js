(function()
{
    var testApp = angular.module('testApp',['ui.router','ui.bootstrap','ngTouch']);
    //var testApp = angular.module('testApp',['ui.router','vs-repeat','ui.bootstrap']);
    var monthmapper = {
    		"1":"jan",
    		"2":"feb",
    		"3":"mar",
    		"4":"apr",
    		"5":"may",
    		"6":"jun",
    		"7":"jul",
    		"8":"aug",
    		"9":"sep",
    		"10":"oct",
    		"11":"nov",
    		"12":"dec",
    };
    Date.prototype.getDispDate = function( date ){
	    return {
	    	day:date.getDate(),
	    	mon:monthmapper[date.getMonth()+1],
	    	year:date.getFullYear()
	    };
	};
    Date.prototype.getFullDate = function( date ){
    	date = new Date(date);
    	var mnth = ( date.getMonth()+1 ) < 10 ? "0"+(date.getMonth()+1) :( date.getMonth()+1 );
    	var dates = ( date.getDate() ) < 10 ? "0"+(date.getDate()) :( date.getDate() );
	    return [date.getFullYear(),mnth, dates ].join('/');
	};
    testApp.config(function(
    		$stateProvider, 
    		$urlRouterProvider, 
    		$controllerProvider, 
    		$compileProvider, 
    		$filterProvider, 
    		$provide
    		)
    {
    	
    	testApp.controllerProvider = $controllerProvider;
    	testApp.compileProvider    = $compileProvider;
    	testApp.filterProvider     = $filterProvider;
    	testApp.provide            = $provide;
         $urlRouterProvider.otherwise("");
         $stateProvider.state('login', {
             url: "/",
             templateUrl: 'html/logReg.html',
		        controller: 'logregController',
		        resolve:{
		       	      dep1:function($q, $rootScope)
		       	    	  {
		       	    	      var deferred = $q.defer();
		       	    	      var dependencies =
		       	    	      [
		       	    	          'js/controllers/logReg.js',
		       	    	          'js/factory/mobileCheckFactory.js',
		       	    	          'js/factory/formvalidationFactory.js',
		       	    	          'js/factory/userarayFactory.js',
		       	    	      ];
		       	    	      $script(dependencies, function()
		       	    	      {
		       	    	          $rootScope.$apply(function()
		       	    	          {
		       	    	              deferred.resolve();
		       	    	          });
		       	    	      });
		       	    	   
		       	    	      return deferred.promise;
		       	    	  },
		       	}
           }).state('regAdmin', {
               url: "/adminreg",
               templateUrl: 'html/adminregUI.html',
  		        controller: 'logregController',
  		        resolve:{
  		       	      dep1:function($q, $rootScope)
  		       	    	  {
  		       	    	      var deferred = $q.defer();
  		       	    	      var dependencies =
  		       	    	      [
  		       	    	          'js/controllers/logReg.js',
  		       	    	          'js/factory/mobileCheckFactory.js',
  		       	    	          'js/factory/formvalidationFactory.js',
  		       	    	          'js/factory/userarayFactory.js',
  		       	    	      ];
  		       	    	      $script(dependencies, function()
  		       	    	      {
  		       	    	          $rootScope.$apply(function()
  		       	    	          {
  		       	    	              deferred.resolve();
  		       	    	          });
  		       	    	      });
  		       	    	   
  		       	    	      return deferred.promise;
  		       	    	  },
  		       	}
             }).state('master', {
             url: "/home",
             templateUrl: 'html/mastnav.html',
		        controller: 'masternavcntrlr',
		        resolve:{
		       	      deps:function($q, $rootScope)
		       	    	  {
		       	    	      var deferred = $q.defer();
		       	    	      var dependencies =
		       	    	      [
		       	    	          'js/controllers/mastnav.js', 
		       	    	      ];
		       	    	      $script(dependencies, function()
		       	    	      {
		       	    	          $rootScope.$apply(function()
		       	    	          {
		       	    	              deferred.resolve();
		       	    	          });
		       	    	      });
		       	    	   
		       	    	      return deferred.promise;
		       	    	  },
		       	}
           }).state('master.registration', {
               url: "/registration",
               templateUrl: 'html/registrations.html',
  		       controller: 'registrationController',
  		      resolve:{
	       	      deps:function($q, $rootScope)
	       	    	  {
	       	    	      var deferred = $q.defer();
	       	    	      var dependencies =
	       	    	      [
	       	    	          'js/controllers/registrations.js',
	       	    	          'js/directives/infinitescroll.js',
		       	    	      'js/factory/mobileCheckFactory.js',
		       	    	      'js/factory/formvalidationFactory.js',
		       	    	      'js/factory/filterprovider.js',
	       	    	      ];
	       	    	      $script(dependencies, function()
	       	    	      {
	       	    	          $rootScope.$apply(function()
	       	    	          {
	       	    	              deferred.resolve();
	       	    	          });
	       	    	      });
	       	    	      return deferred.promise;
	       	    	  }
	       	}
             }).state('master.ProjectsList', {
               url: "/ProjectsList",
               templateUrl: 'html/Projects.html',
  		       controller: 'ProjctsListController',
  		      resolve:{
	       	      deps:function($q, $rootScope)
	       	    	  {
	       	    	      var deferred = $q.defer();
	       	    	      var dependencies =
	       	    	      [
	       	    	          'js/controllers/Projects.js',
		       	    	      'js/factory/mobileCheckFactory.js',
	       	    	      ];
	       	    	      $script(dependencies, function()
	       	    	      {
	       	    	          $rootScope.$apply(function()
	       	    	          {
	       	    	              deferred.resolve();
	       	    	          });
	       	    	      });
	       	    	      return deferred.promise;
	       	    	  }
	       	}
             }).state('master.testcases', {
                 url: "/testcases/:id",
                 templateUrl: 'html/testcases.html',
    		       controller: 'testcasescontrlr',
    		      resolve:{
  	       	      deps:function($q, $rootScope)
  	       	    	  {
  	       	    	      var deferred = $q.defer();
  	       	    	      var dependencies =
  	       	    	      [
  	       	    	          'js/controllers/testcases.js',
  		       	    	      'js/factory/mobileCheckFactory.js',
  		       	    	      'js/factory/formvalidationFactory.js',
  		       	    	      'js/factory/currencyFactory.js', 
  	       	    	      ];
  	       	    	      $script(dependencies, function()
  	       	    	      {
  	       	    	          $rootScope.$apply(function()
  	       	    	          {
  	       	    	              deferred.resolve();
  	       	    	          });
  	       	    	      });
  	       	    	      return deferred.promise;
  	       	    	  }
  	       	}
               }).state('master.RunsList', {
                   url: "/RunsList/:id",
                   templateUrl: 'html/RunsList.html',
      		       controller: 'RunsListController',
      		      resolve:{
    	       	      deps:function($q, $rootScope)
    	       	    	  {
    	       	    	      var deferred = $q.defer();
    	       	    	      var dependencies =
    	       	    	      [
    	       	    	          'js/controllers/RunsList.js',
    		       	    	      'js/factory/mobileCheckFactory.js',
    		       	    	      'js/factory/timerFactory.js',
    		       	    	   'js/factory/formvalidationFactory.js',
    	       	    	      ];
    	       	    	      $script(dependencies, function()
    	       	    	      {
    	       	    	          $rootScope.$apply(function()
    	       	    	          {
    	       	    	              deferred.resolve();
    	       	    	          });
    	       	    	      });
    	       	    	      return deferred.promise;
    	       	    	  }
    	       	}
                 });
      /*   .state('master.detail', {
        	 views:{
        		 'detail':{
        			 	url:"/NFL",
        		        templateUrl: '../WRStcs/html/Inflection.html',
        		        controller: 'InflectController',
        		        resolve:{
        		       	      deps:function($q, $rootScope)
        		       	    	  {
        		       	    	      var deferred = $q.defer();
        		       	    	      var dependencies =
        		       	    	      [
        		       	    	          'js/controllers/Inflections.js',
        		       	    	         // 'js/factory/globalscope.js'
        		       	    	      ];
        		       	    	   
        		       	    	      // Load the dependencies
        		       	    	      $script(dependencies, function()
        		       	    	      {
        		       	    	          // all dependencies have now been loaded by so resolve the promise
        		       	    	          $rootScope.$apply(function()
        		       	    	          {
        		       	    	              deferred.resolve();
        		       	    	          });
        		       	    	      });
        		       	    	   
        		       	    	      return deferred.promise;
        		       	    	  },
        		       	   deps2:'globalscope'
        		       	}
        		      }
        	 }
     });*/
    }).run(function($rootScope,$location){
		  $rootScope.$on('$stateChangeStart', 
					function(event, toState, toParams, fromState, fromParams)
					{ 
			  		var currentUser="";
			  			if($.trim(sessionStorage.getItem("currentUser")) == "") 
			  				currentUser = null;
			  			else
			  				currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
				    	if(
				    	toState.controller != "logregController"
				    	   &&(	
				    	   currentUser == null ||
				    	   !currentUser.status || 
				    	   currentUser.data.empid == ""
				    		 )
				    	   ){
				    		 $rootScope.$apply(function()
			       	    	          {
								 			$rootScope.logoff();
			       	    	          });
				    		event.preventDefault();
				    	}
					});  
	  
    });
})();
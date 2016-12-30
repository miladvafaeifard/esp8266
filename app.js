/*global angular*/
var app = angular.module('App', []);

app.controller('CtrlMain', function($scope, $http, HttpWrapper, convertTextToDigital){
	var url = "http://192.168.2.19/";
	$scope.turn = function(state){
		var esp8266 = {
			method: 'POST',
			url: url+state
		};

		var dweet = {
			method: 'POST',
			url: 'https://dweet.io/dweet/for/esp-fish',
			data: {"Rv": 6000, "status": { "LED": convertTextToDigital(state), "text": state}},
			header: {
				'content-type': 'application/json' 
			}	
		}
		
		HttpWrapper.post(esp8266);
		HttpWrapper.post(dweet);
		// 	dweetio.dweet_for('esp-fish', data, function(err, dweet){
		// 		console.log(dweet.thing); // the generated name
		// 		console.log(dweet.content); // the content of the dweet
		// 		console.log(dweet.created); // the create date of the dweet
		// 	});
	};
});

app.service('HttpWrapper', function($http){
	var service = {
		post: function(obj){
			$http(obj).then(function(response){
				console.log('res: ', response);
			}, function(err){
				console.log('Error: ', err);
			});
		}
	}

	return service;
});

app.factory('convertTextToDigital', function(){
	return function(status){
		return status === 'on'? 1 : 0;
	}
});
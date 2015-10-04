var app = angular.module("chatApp", []);

app.controller("chatController",["$scope", function($scope){
	var socket = io();
	$scope.sendMessage = function() {
		socket.emit('chat message', $scope.message);
		$scope.message.body = "";
	};

	$scope.message = {
		user: "",
		body: "",
	};

	$scope.messages = [];

	socket.on('chat message', function(msg){
		$scope.messages.push(msg);
		$scope.$apply();
	});

	socket.on('user activity', function(user){
		
		$scope.messages.push({
			user: "SYSTEM",
			body: "'" + user + "' has joined the chat."
		});
		$scope.$apply();
	});

	$scope.message.user = prompt("What is you name?");

	socket.emit('user activity', $scope.message.user);
}]);
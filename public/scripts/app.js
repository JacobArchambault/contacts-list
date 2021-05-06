app = angular.module("todoList3", []);

app.controller('mainCtrl', function($scope, $http) {
  
	$scope.msg = '';
  
	$http.get("/getContacts").then(function (response) {
			$scope.contacts = response.data;  // all documents from db
		});
  
   
	$scope.addContact = function() {
	  
		if($scope.newName) {
		  
			info =  {"name": $scope.newName, "email": $scope.newEmail}
		  
			$http({
				method: 'POST',
				url: '/addContact',
				data: info
			}).then(function (response) {
	             $scope.contacts = response.data;
				
				});	  
		}
	  
		$scope.newName = "";     // clear textboxes
		$scope.newEmail = "";
	};
  
  
    $scope.deleteContact = function(contact) {  
		email = contact.email
		url = "deleteContact?email=" + email;
	  
		$http.get(url).then(function (response) {
				$scope.contacts = response.data;
			});
	};
  
});

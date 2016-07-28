angular.module('contactApp').controller('editContactCtrl', function($scope, $uibModal, $uibModalInstance, $http, contactItem){
	function getContacts(){
		$http.get('/contacts').then(function(response){
			console.log('getContacts Async ' + response.data);
			$scope.contacts = response.data;
		});
	};
	$scope.contact = contactItem;
	
	$scope.delete = function(){
		console.log('deleteContact ' + $scope.contact._id)
		var deleteModalInstance = $uibModal.open({
			templateUrl: 'modals/deleteContact.html',
			controller: function($scope, $uibModalInstance){
				$scope.yes = function(){
					$uibModalInstance.close();
				};
				$scope.no = function(){ 
					$uibModalInstance.dismiss();
				};
			}
		});

		deleteModalInstance.result.then(function(){
			$http.delete('/contacts/' + $scope.contact._id).then(function(){   
				$uibModalInstance.close();
			});    
		});
	};

	$scope.save = function(){
		console.log('saveContact ' + $scope.contact._id)
		$http.post('/contacts', $scope.contact).then(function(response){   
			console.log('saveContact /contacts: ', response.data);
			getContacts();
			$uibModalInstance.close();
		});
	};
	
		$scope.edit = function(){
		console.log('editContact ' + $scope.contact._id);
		var modalInstance = $uibModal.open({
			templateUrl: 'modals/editContact.html',
			controller: 'editContactCtrl',
			windowClass: 'large-Modal',
			resolve: {
				contactItem: function(){return angular.copy($scope.contact);}
			}
		});
		modalInstance.result.then(function(){
			getContacts();
			$uibModalInstance.close();
		});
	};

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	};
});
'use strict';





export default function SavedMappingController($scope ,$state, $stateParams, appServices ) {



    $scope.user = appServices.getUserName();

}

SavedMappingController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];
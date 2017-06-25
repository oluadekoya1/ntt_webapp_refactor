'use strict';





export default function SavedMappingController($scope ,$state, $stateParams, appServices,allMappedTable ) {

    console.log(allMappedTable);

    $scope.user = appServices.getUserName();
    $scope.allSavedMappedTable =allMappedTable;
    $scope.uploadXML = function(){
        $state.go('uploadPage', {username :$scope.user });
    };
    $scope.manageXML = function(){
        $state.go('qualysScan', {username :$scope.user });
    };

}

SavedMappingController.$inject = ['$scope', '$state', '$stateParams', 'appServices', 'allMappedTable'];
'use strict';





export default function SavedMappingController($scope ,$state, $stateParams, appServices,allMappedTable ) {

    console.log(allMappedTable);

    $scope.user = appServices.getUserName();
    $scope.allSavedMappedTable =allMappedTable;

}

SavedMappingController.$inject = ['$scope', '$state', '$stateParams', 'appServices', 'allMappedTable'];
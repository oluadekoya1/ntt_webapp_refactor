'use strict';




export default function SanitisedTableController($scope ,$state, $stateParams, appServices ) {


    //$scope.myApps = function(){
    //    $state.go('review-app', {username :$scope.user });
    //};

    $scope.user = appServices.getUserName();

}

SanitisedTableController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

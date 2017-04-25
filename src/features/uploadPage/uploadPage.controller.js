'use strict';




export default function UploadPageController($scope ,$state, $stateParams, appServices ) {


    //$scope.myApps = function(){
    //    $state.go('review-app', {username :$scope.user });
    //};




    $scope.user = appServices.getUserName();

}

UploadPageController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

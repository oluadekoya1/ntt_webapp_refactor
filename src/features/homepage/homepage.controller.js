'use strict';


import assesspic from '../../directives/imgs/assesspic.jpg';


export default function HomePageController($scope ,$state, $stateParams, appServices ) {

    $scope.assesspic = assesspic;

    $scope.myApps = function(){
        $state.go('review-app', {username :$scope.user });
    };

    $scope.define = function(){
        $state.go('define-app', {username :$scope.user });
    };

    $scope.manageXML = function(){
        $state.go('qualysScan', {username :$scope.user });
    };


    $scope.dashboard = function(){
        $state.go('current-assessment');
    };

    $scope.user = appServices.getUserName();

}

HomePageController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

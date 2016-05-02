'use strict';

import thisPic2 from '../../directives/imgs/pic2.jpg';
import thisPic3 from '../../directives/imgs/pic3.jpg';
import thisPic1 from '../../directives/imgs/Pic1.jpg';
import assesspic from '../../directives/imgs/assesspic.jpg';


export default function HomePageController($scope ,$state, $stateParams, appServices ) {
    $scope.thisPic1 =thisPic1;
    $scope.thisPic2 = thisPic2;
    $scope.thisPic3 = thisPic3;
    $scope.assesspic = assesspic;

    $scope.create = function(){
        $state.go('review-app', {username :$scope.user });
    };

    $scope.define = function(){
        $state.go('define-app', {username :$scope.user });
    };

    $scope.dashboard = function(){
        $state.go('current-assessment');
    };

    $scope.user = appServices.getUserName();

}

HomePageController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

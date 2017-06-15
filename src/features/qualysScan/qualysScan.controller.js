'use strict';
import '../qualysScan/css/skel.css';
import '../qualysScan/css/font-awesome.min.css';




export default function QualysScanController($scope ,$state, $stateParams, appServices ) {



    $scope.user = appServices.getUserName();

    $scope.uploadXML = function(){
        $state.go('uploadPage', {username :$scope.user });
    };

}

QualysScanController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

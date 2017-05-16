'use strict';

import $ from'jquery';
import '../../factories/appServices';


export default function adminPortalController($scope, $state, $stateParams, $http, appServices) {

    $scope.user = appServices.getAdminName();


    if($scope.user !== ""){
        $scope.varName =true;
    }

    $scope.logout1 = function(){
        appServices.deleteCookie("loggedInUser");
    };


}

adminPortalController.$inject = ["$scope", "$state", '$stateParams', "$http", "appServices"];






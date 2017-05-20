'use strict';

import $ from'jquery';
import '../../factories/appServices';


export default function adminPortalController($scope, $state, $stateParams, $http, appServices, allInfo) {



    $scope.user = appServices.getAdminName();

    console.log(allInfo);

    $scope.allSavedInfo = allInfo;







    if($scope.user !== ""){
        $scope.varName =true;
    }

    $scope.logout1 = function(){
        appServices.deleteCookie("loggedInUser");
        $state.go("admin");
    };


}

adminPortalController.$inject = ["$scope", "$state", '$stateParams', "$http", "appServices", "allInfo"];






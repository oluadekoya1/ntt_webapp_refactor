'use strict';

import $ from'jquery';
import '../../factories/appServices';


export default function adminPortalController($scope, $state, $stateParams, $http, appServices) {


    $scope.adminName = "";

    $scope.adminPassword = "";

    $scope.adminLogin = () => {
        $http.post('/api/admin-sign-in', {username: $scope.adminName, password : $scope.adminPassword})
            .success(function(data){
                if(typeof data === "boolean" && data === true && data.toString().length === 4){
                    appServices.setCookie("loggedInAdmin", $scope.adminName);
                    appServices.setAdminName($scope.adminName);
                    $state.go('adminPortal');

                } else {
                    $('#errorModal1').modal('show');
                }
            }).error(function(data){


        })
    };



}

adminPortalController.$inject = ["$scope", "$state", '$stateParams', "$http", "appServices"];


'use strict';






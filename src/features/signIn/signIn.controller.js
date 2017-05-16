'use strict';
import logo1 from '../../directives/imgs/download.png';
import $ from'jquery';
import '../../factories/appServices';

export default function signInController($scope, $state, $http, appServices) {

    //TODO Status bar when setting or getting from BAckend

    $scope.logo1 = logo1;

    $scope.username = "";

    $scope.password = "";

    $scope.userLogin = () => {
        $http.post('/api/sign-in', {username: $scope.username, password : $scope.password})
        .success(function(data){
            if(typeof data === "boolean" && data === true && data.toString().length === 4){
                appServices.setCookie("loggedInUser", $scope.username);
                appServices.setUserName($scope.username);
                $state.go('homepage');
            } else {
                $('#errorModal').modal('show');
            }
        }).error(function(data){


        })
    }

}

signInController.$inject = ["$scope", "$state", "$http", "appServices"];
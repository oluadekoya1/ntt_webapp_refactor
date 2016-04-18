'use strict';
import logo1 from '../../directives/imgs/download.png';
import $ from'jquery';

export default function signInController($scope, $state, $http, appServices) {

    //TODO Status bar when setting or getting from BAckend

    $scope.logo1 = logo1;

    $scope.username = "";

    $scope.password = "";

    $scope.userLogin = () => {
        $http.post('/api/sign-in', {username: $scope.username, password : $scope.password})
        .success(function(data){
            if(data){
                appServices.setCookie("loggedInUser", $scope.username);
                appServices.setUserName($scope.username);
                $state.go('homepage');
            } else {
                $('#errorModal').modal('show');
               // swal({   title: "Are you sure?",   text: "You will not be able to recover this imaginary file!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, delete it!",   closeOnConfirm: false }, function(){   swal("Deleted!", "Your imaginary file has been deleted.", "success"); });
            }
        }).error(function(data){
            console.log(data);

        })
    }

}

signInController.$inject = ["$scope", "$state", "$http", "appServices"];
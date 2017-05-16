
'use strict';

export default function adminPortalController($scope ,$state, $stateParams, appServices ) {


    $scope.user = appServices.getAdminName();


    if($scope.user !== ""){
        $scope.varName =true;
    }

    $scope.logout1 = function(){
        appServices.deleteCookie("loggedInUser");
    };

}

adminPortalController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

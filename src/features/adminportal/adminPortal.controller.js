'use strict';




export default function adminPortalController($scope ,$state, $stateParams, appServices ) {


    $scope.user = appServices.getAdminName();


    if($scope.user !=""){
        $scope.varName =true;
    };

    $scope.logout1 = function(){
        appServices.deleteCookie("loggedInUser");


        console.log($state.go("admin"));
    };

    //$scope.$on('$locationChangeStart', function(event, next, current){
    //    // Here you can take the control and call your own functions:
    //    alert('Sorry ! Back Button is disabled');
    //    // Prevent the browser default action (Going back):
    //    event.preventDefault();
    //});


}

adminPortalController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

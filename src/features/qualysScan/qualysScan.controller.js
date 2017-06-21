'use strict';
import '../qualysScan/css/skel.css';
import '../qualysScan/css/font-awesome.min.css';




export default function QualysScanController($scope ,$state, $stateParams, appServices ) {



    $scope.user = appServices.getUserName();

    $scope.uploadXML = function(){
        $state.go('uploadPage', {username :$scope.user });
    };
    $scope.savedXMLmapping = function(){
        $state.go('savedMapping', {username :$scope.user });
    };

    $scope.textholder1="Upload your qualys xml scan reports to map the identified vulnerabilities to F5 BIG-IP ASM mitigation features" ;
    $scope.textholder2="To view your list of sanitised and mapped qualsy scan reports" ;
    $scope.textholder3="Retrieve and map qualys scan reports directly from the qualys platform " ;

}

QualysScanController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

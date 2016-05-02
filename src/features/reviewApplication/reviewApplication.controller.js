'use strict';



export default function reviewAppCtrl($scope ,$state, $stateParams, appServices ) {

    $scope.currentAppData = {};

    $scope.getAllSavedApp = function(){

        appServices.getAllSavedApp().then(function(data){

            $scope.allSavedApps = data;

            console.log(data);

            //data = data[0];
            //data['application_type'] = data['application_type'] * 1;
            //data.uris = JSON.parse(data.uris);
            //data.parameters = JSON.parse(data.parameters);
            //data.criticality = JSON.parse(data.criticality);
            //data['custom_options'] = JSON.parse(data['custom_options']);
            //data['known_applications'] = JSON.parse(data['known_applications']);
            //
            //$scope.appDescribe = data['application_description'];
            //
            //$scope.appType = data['application_type'];
            //
            //$scope.currentAppData = data;  console.log($scope);
            //
            //($scope.currentAppData['application_type'] === 1 )  ? customApp() : knownApp();
        })
    };

    function customApp(){
        $scope.rowHeader = $scope.currentAppData.uris;
        $scope.colHeader = $scope.currentAppData['custom_options'];
    }


    function knownApp(){
        $scope.rowHeader = [];
        $scope.colHeader = $scope.currentAppData['known_applications'];
    }



}

reviewAppCtrl.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

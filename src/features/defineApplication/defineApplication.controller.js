'use strict';

import features from './constants/translation.json';
import KnownApplicationsOptions from './constants/policyDefinitions.json';
import assessmentQuestions from '../createapplication/constants/assessment.json';
import policyQuestions from '../createapplication/constants/policyDefine.json';

export default function DefineAppCtrl($scope ,$state, $stateParams, $http, appServices) {

    $scope.customOptions = angular.copy(features.questionFeatures);

    $scope.knownAppOptions = angular.copy(features.questionFeatures);

    $scope.knownAppOptions.owasp.checked = true;

    $scope.knownAppOptions.api.checked = true;

    $scope.appTypes = angular.copy(features.applicationTypes);

    $scope.selectedAppType = $scope.appTypes[0];

    $scope.appName = "";

    $scope.KnownApplications = angular.copy(KnownApplicationsOptions.KnownApplications);

    $scope.parameters = [{id: 'parameter1'}];

    $scope.addNewParameter = function() {
        var newItemNo = $scope.parameters.length+1;
        $scope.parameters.push({'id':'parameter'+newItemNo});
    };
    $scope.removeParameter = function() {
        if ($scope.length >1){
            var lastItem = $scope.parameters.length-1;
            $scope.parameters.splice(lastItem);
        }
    };

    $scope.appFqdn =  "";

    $scope.uris = [{id: 'uri1'}];

    $scope.selectedKnownApp = $scope.KnownApplications.options[0];


    $scope.addNewUri = function() {
        var newItemNo = $scope.uris.length+1;
        $scope.uris.push({'id':'uri'+newItemNo});
    };
    $scope.removeUri = function()
    {
        if ($scope.length >1){
            var lastItem = $scope.uris.length-1;
            $scope.uris.splice(lastItem);
        }

    };

    $scope.SaveappDefn = function() {

        if ($scope.appName == null || $scope.appName == "") {
            alert("Application Name must be filled out");
        }
        else {
            let date = new Date(),
                id = date.getTime(),
                assessmentQns = angular.copy(assessmentQuestions)
                //policyQns = getPolicyCnt()
                ;

            //create new application
            var newApp = {
                    id : id,
                    username : appServices.username,
                    assessApp : 'false',
                    policyCheck: 'false',
                    appName : $scope.appName,
                    appDescription : JSON.stringify($scope.selectedKnownApp.label),
                    selectedAppType : JSON.stringify($scope.selectedAppType.value),
                    appFqdn : $scope.appFqdn,
                    customOptions : JSON.stringify($scope.customOptions),
                    knownAppOptions : JSON.stringify($scope.knownAppOptions),
                    assessmentList : JSON.stringify([assessmentQns]),
                    policyDefinition : JSON.stringify("") ,
                    uris : JSON.stringify($scope.uris),
                    parameters : JSON.stringify( $scope.parameters),
                    status : 'in progress'
                };


            $http.post('/api/save', newApp)
                .success(function(){
                    //$scope.allList.push(newJSONApp);
                    $state.go('review-app', { id : id });
                })
                .error(function(data){
                    console.log(data);
                });

            //resetAll();
        }


    };





}

DefineAppCtrl.$inject = ['$scope',  '$state', '$stateParams',  '$http','appServices'];


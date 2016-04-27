'use strict';

import features from './constants/translation.json';
import KnownApplicationsOptions from './constants/policyDefinitions.json';
import assessmentQuestions from '../createapplication/constants/assessment.json';
import policyQuestions from '../createapplication/constants/policyDefine.json';
import questionData1 from '../defineApplication/constants/constant1.json';

export default function DefineAppCtrl($scope ,$state, $stateParams, $http, appServices) {

    $scope.customOptions = angular.copy(features.questionFeatures);

    $scope.knownAppOptions = angular.copy(features.questionFeatures);

    $scope.knownAppOptions.owasp.checked = true;

    $scope.knownAppOptions.api.checked = true;

    $scope.appFunc = angular.copy(questionData1.appFunc);

    $scope.uriFunc = angular.copy(questionData1.uriFunc);

    $scope.multiHttpFunc = angular.copy(questionData1.multiHttpFunc);

    $scope.specificHttpFunc = angular.copy(questionData1.specificHttpFunc);

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
            console.log($scope.parameters);
        }
    };

    $scope.appFqdn =  "";

    $scope.uris = [{id: 'uri1'}];

    $scope.selectedKnownApp = $scope.KnownApplications.options[0];


    $scope.addNewUri = function() {
        var newItemNo = $scope.uris.length+1;
        $scope.uris.push({'id':'uri'+newItemNo});
    };

    $scope.removeUri = function(){
        if ($scope.uris.length >1){
           $scope.uris.pop();
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

            var stringifyNewApp = {
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

            $http.post('/api/save', stringifyNewApp)
                .success(function(){
                    //$scope.allList.push(newJSONApp);
                   // $state.go('review-app', { id : id });
                })
                .error(function(data){
                    console.log(data);
                });

            //resetAll();
        }


    };

    $scope.$watch('selectedAppType.value', function() {
        if($scope.selectedAppType.value === 1){
            $scope.selectedFeatures = [];

            $scope.appFunc = angular.copy(questionData1.appFunc);

            $scope.uriFunc = angular.copy(questionData1.uriFunc);

            $scope.multiHttpFunc = angular.copy(questionData1.multiHttpFunc);

            $scope.specificHttpFunc = angular.copy(questionData1.specificHttpFunc);

            $scope.uris = [{id: 'uri1'}];

            $scope.parameters = [{id: 'parameter1'}];

        }else{
            $scope.selectedFeatures = [{"label" : "OWASP Top 10 Application Vulnerability", "value" : 1, "checked" : false},
                {"label" : "Web Services (SOAP and REST)", "value" : 2, "checked" : false}];
        }
    });



    $scope.checkItems = function(obj){
        if(obj.checked){
            $scope.selectedFeatures.push(obj)
        } else {
            $scope.selectedFeatures = $scope.selectedFeatures.filter(function(item){
                return item.value != obj.value
            })
        }
    };


}

DefineAppCtrl.$inject = ['$scope',  '$state', '$stateParams',  '$http','appServices'];


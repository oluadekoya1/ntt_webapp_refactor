'use strict';

import features from './constants/translation.json';
import KnownApplicationsOptions from './constants/policyDefinitions.json';
import assessmentQuestions from '../createapplication/constants/assessment.json';
import policyQuestions from '../createapplication/constants/policyDefine.json';
import questionData1 from '../defineApplication/constants/constant1.json';
import $ from'jquery';

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function createCustomOption(){
    var cOption = angular.copy(features.questionFeatures);

    for (var i in cOption){

        for(var prop in cOption[i]){
            if(prop === "options"){
                cOption[i][prop].forEach(function(obj){
                    obj.id = obj.id+"-"+makeid();
                });
            }
        }


    }

    return angular.copy(cOption);
}


function createKnowAppOptions(){
    var kOption = angular.copy(features.questionFeatures);

    for (var i in kOption){

        for(var prop in kOption[i]){
            if(prop === "options"){
                kOption[i][prop].forEach(function(obj){
                    obj.id = obj.id+"-"+makeid();
                });
            }
        }

    }

    kOption.owasp.checked = true;

    kOption.api.checked = true;

    return angular.copy(kOption);
}


export default function DefineAppCtrl($scope ,$state, $stateParams, $http, appServices) {

    //common questions

    $scope.appFunc = angular.copy(questionData1.appFunc);

    $scope.uriFunc = angular.copy(questionData1.uriFunc);

    $scope.multiHttpFunc = angular.copy(questionData1.multiHttpFunc);

    $scope.specificHttpFunc = angular.copy(questionData1.specificHttpFunc);

    //end of common questions

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

    $scope.uris = [];

    $scope.knownAppOptions = createKnowAppOptions();

    $scope.selectedKnownApp = $scope.KnownApplications.options[0];

    $scope.addNewUri = function() {

        var newItemNo = $scope.uris.length+1;

        $scope.uris.push({'id':'uri'+newItemNo, name: "", uriFunction: "", customOptions : createCustomOption()});
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
                   $state.go('review-app', { id : id });
                })
                .error(function(data){
                    console.log(data);
                });

            //resetAll();
        }


    };

    $scope.$watch('selectedAppType.value', function() {

        if($scope.selectedAppType.value === 1){

            $scope.appFunc = angular.copy(questionData1.appFunc);

            $scope.uriFunc = angular.copy(questionData1.uriFunc);

            $scope.multiHttpFunc = angular.copy(questionData1.multiHttpFunc);

            $scope.specificHttpFunc = angular.copy(questionData1.specificHttpFunc);

            $scope.uris.length = 0;

            $scope.parameters = [{id: 'parameter1'}];

        }

    });

    $scope.updateTable = function() {
        console.log($scope.appName);
        console.log($scope.appFqdn);

            if ($scope.appName == "" || $scope.appName  == null || $scope.appFqdn == "" || $scope.appFqdn  == null )
            {

                $('#errorModal1').modal('show');
            } else {
                let date = new Date(),
                    assessmentQns = angular.copy(assessmentQuestions),
                    policyQns = angular.copy(policyQuestions);

                //create new application
                var newApp = {
                        id : date.getTime(),
                        username : appServices.username,
                        appName : $scope.appName,
                        selectedAppType : $scope.selectedAppType.label,
                        appFqdn : $scope.appFqdn,
                        selectedKnownApp :  JSON.stringify($scope.selectedKnownApp),
                        general_questions : "",
                        assessmentList : JSON.stringify([assessmentQns]),
                        policyDefinition:  "" ,
                        assessCheck : 'false',
                        policyCheck: 'false',
                        uris :  JSON.stringify($scope.uris),
                        parameters :  JSON.stringify( $scope.parameters),
                        knownAppOptions :  JSON.stringify($scope.knownAppOptions)
                    };


                $http.post('/api/save1', newApp)
                    .success(function(){
                        console.log("Update successful!!!");
                        $state.go('review-app');
                    })
                    .error(function(data){
                        console.log(data);
                    });

            }


        };

}

DefineAppCtrl.$inject = ['$scope',  '$state', '$stateParams',  '$http','appServices'];


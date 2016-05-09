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

    function resetAllParams(param){

        if(param === "appFunc"){

            $scope.uriFunc = angular.copy(questionData1.uriFunc);

            $scope.multiHttpFunc = angular.copy(questionData1.multiHttpFunc);

            $scope.specificHttpFunc = angular.copy(questionData1.specificHttpFunc);


        } else if(param === "all"){
            $scope.uriFunc = angular.copy(questionData1.uriFunc);

            $scope.multiHttpFunc = angular.copy(questionData1.multiHttpFunc);

            $scope.specificHttpFunc = angular.copy(questionData1.specificHttpFunc);

            $scope.appFunc = angular.copy(questionData1.appFunc);
        }

        $scope.uris.length = 0;

        $scope.parameters = [{id: 'parameter1'}];


    }

    var policies = {};

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

        var newItemNo = makeid();

        policies[newItemNo] = angular.copy(policyQuestions);

        $scope.uris.push({'id':newItemNo, name: "", uriFunction: "", customOptions : createCustomOption()});
    };

    $scope.removeUri = function(){
        if ($scope.uris.length >1){
           $scope.uris.pop();
        }

    };

    $scope.useFqdn = $scope.appFunc.selectedAnswer === 'No' || $scope.uriFunc.selectedAnswer === 'No';

    function  updateFQDN() {
        $scope.useFqdn = $scope.appFunc.selectedAnswer === 'No' || $scope.uriFunc.selectedAnswer === 'No';
    }


    $scope.$watch('selectedAppType.value', function() {
        resetAllParams("all");
    });

    $scope.$watch('appFunc.selectedAnswer', function(oldval, newVal) {
        if( $scope.appFunc.selectedAnswer === "No"){
            resetAllParams("appFunc");
        }
        updateFQDN();

    });

    $scope.$watch('uriFunc.selectedAnswer', function(oldval, newVal) {
        if( $scope.uriFunc.selectedAnswer === "No"){
            resetAllParams();
        }
        updateFQDN();
    });

    $scope.updateTable = function() {

            if ($scope.appName == "" || $scope.appName  == null || $scope.appFqdn == "" || $scope.appFqdn  == null ) {
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
                        policyDefinition:  ($scope.selectedAppType.value === 2) ? JSON.stringify(policyQns) : JSON.stringify(policies) ,
                        assessCheck : 'false',
                        policyCheck: 'false',
                        uris :  JSON.stringify($scope.uris),
                        parameters :  JSON.stringify( $scope.parameters),
                        knownAppOptions :  JSON.stringify($scope.knownAppOptions)
                    };


                $http.post('/api/save', newApp)
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


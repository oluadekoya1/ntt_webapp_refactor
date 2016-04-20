'use strict';

import features from './constants/translation.json';
import KnownApplicationsOptions from './constants/policyDefinitions.json';

export default function DefineAppCtrl($scope ,$state, $stateParams) {

    $scope.customOptions = angular.copy(features.questionFeatures);

    var knownAppOptions = angular.copy(features.questionFeatures);

    knownAppOptions.owasp.checked = true;

    knownAppOptions.api.checked = true;

    $scope.knownAppOptions = knownAppOptions;

    $scope.appTypes = angular.copy(features.applicationTypes);

    $scope.selectedAppType = $scope.appTypes[0];

    $scope.appName = "";

    $scope.KnownApplications = angular.copy(KnownApplicationsOptions.KnownApplications);

    $scope.selectedKnownApp = $scope.KnownApplications.options[0];

    $scope.parameters = [{id: 'parameter1'}];
    $scope.addNewParameter = function() {
        var newItemNo = $scope.parameters.length+1;
        $scope.parameters.push({'id':'parameter'+newItemNo});
    };
    $scope.removeParameter = function() {
        var lastItem = $scope.parameters.length-1;
        $scope.parameters.splice(lastItem);
    };

    $scope.uris = [{id: 'uri1'}];
    $scope.addNewUri = function() {
        var newItemNo = $scope.uris.length+1;
        $scope.uris.push({'id':'uri'+newItemNo});
    };
    $scope.removeUri = function() {
        var lastItem = $scope.uris.length-1;
        $scope.uris.splice(lastItem);
    };









}

DefineAppCtrl.$inject = ['$scope', '$state', '$stateParams'];
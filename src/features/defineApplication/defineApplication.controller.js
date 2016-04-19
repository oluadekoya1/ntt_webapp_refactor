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

}

DefineAppCtrl.$inject = ['$scope', '$state', '$stateParams'];
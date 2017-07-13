'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('qualysScan', {
            url: '/qualysScan',
            template: require('./qualysScan.html'),
            controller: 'QualysScanController',
            controllerAs: 'qualysScan'
        });
}
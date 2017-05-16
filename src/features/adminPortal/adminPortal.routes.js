'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('adminPortal', {
            url: '/adminPortal',
            template: require('./adminPortal.html'),
            controller: 'adminPortalController',
            controllerAs: 'adminPortal'
        });
}
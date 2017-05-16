'use strict';


routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('adminPortal', {
            url: '/adminPortal',
            template: require('./admin_portal.html'),
            controller: 'adminPortalController',
            controllerAs: 'adminPortal'
        });
}


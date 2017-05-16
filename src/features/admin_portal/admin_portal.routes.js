'use strict';


routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('admin', {
            url: '/admin',
            template: require('./admin_portal.html'),
            controller: 'adminPortalController',
            controllerAs: 'adminPortal'
        });
}


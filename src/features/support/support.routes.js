'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('support', {
            url: '/support',
            template: require('./support.html'),
            controller: 'SupportController',
            controllerAs: 'support'
        });
}
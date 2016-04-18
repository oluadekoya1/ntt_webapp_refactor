'use strict';


routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('signIn', {
            url: '/',
            template: require('./signIn.html'),
            controller: 'signInController',
            controllerAs: 'signIn'
        });
}
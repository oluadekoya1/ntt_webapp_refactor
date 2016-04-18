'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('homepage', {
            url: '/homepage',
            template: require('./homepage1.html'),
            controller: 'HomePageController',
            controllerAs: 'homepage'
        });
}
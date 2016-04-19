'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('homepage', {
            url: '/homepage',
            template: require('./homepage.html'),
            controller: 'HomePageController',
            controllerAs: 'homepage'
        });
}
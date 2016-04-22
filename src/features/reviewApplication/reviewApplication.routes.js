'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('review-app', {
            url: '/review-app/{id}',
            template: require('./reviewApplication.html'),
            controller: 'reviewAppCtrl',
            controllerAs: 'review-app',
            params: {
                id : ""
            }
        });
}
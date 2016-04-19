'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider

        .state('define-app', {
            url: '/define-app',
            template: require('./defineApplication.html'),
            controller: 'DefineAppCtrl',
            controllerAs: 'defineApp',

        });
}


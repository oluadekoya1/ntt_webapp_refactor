'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('sanitisedTable', {
            url: '/sanitisedTable',
            template: require('./sanitisedTable.html'),
            controller: 'SanitisedTableController',
            controllerAs: 'sanitisedTable'
        });
}
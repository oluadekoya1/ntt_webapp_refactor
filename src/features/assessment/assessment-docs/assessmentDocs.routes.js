'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('assess-doc', {
            url: '/assessment-docs/:id',
            template: require('./assessmentDocs.html'),
            controller: 'assessmentDocsCtrl',
            controllerAs: 'assessmentDoc'
        });
}
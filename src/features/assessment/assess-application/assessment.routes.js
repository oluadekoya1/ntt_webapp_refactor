'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('assessment', {
            url: '/assessment-tool',
            template: require('./assessment.html'),
            controller: 'AssessmentController',
            controllerAs: 'assessment',
            params: {
                details : {}
            }
        })
        .state('edit-assessment', {
            url: '/assessment-tool/{id}',
            template: require('./assessment.html'),
            controller: 'AssessmentController',
            controllerAs: 'assessment',
            id : ""
        });
}
'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('review-app', {
            url: '/review-app',
            template: require('./reviewApplication.html'),
            controller: 'reviewAppCtrl',
            controllerAs: 'review-app',
            resolve: {
                allApps : function(appServices){
                   return appServices.getAllSavedApp();
                }
            }
        });
}
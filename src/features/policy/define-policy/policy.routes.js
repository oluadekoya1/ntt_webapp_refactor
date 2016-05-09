'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('policy', {
            url: '/policy-definition',
            template: require('./policy.html'),
            controller: 'PolicyController',
            controllerAs: 'definepolicy'
        })
        .state('edit-policy', {
            url: '/policy-definition/{appID}/{uriID}',
            template: require('./policy.html'),
            controller: 'PolicyController',
            controllerAs: 'definepolicy',
            params: {
                appID : "",
                uriID : ""
            },
            resolve: {
                allApps : function(appServices){
                    return appServices.getAllSavedApp();
                }
            }
        });
}
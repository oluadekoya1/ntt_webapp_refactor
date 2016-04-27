'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('create-app', {
            url: '/create-app',
            template: require('./create-app.html'),
            controller: 'CreateAppCtrl',
            controllerAs: 'createApp',
            //params: {
            //    details : null,
            //    username: ""
            //},
            //resolve: {
            //    //allApp : function(appServices){
            //    //    return appServices.getAllApps();
            //    //}
            //}
        })
        .state('edit-create-app', {
            url: '/create-app/{id}',
            template: require('./create-app.html'),
            controller: 'CreateAppCtrl',
            controllerAs: 'createApp',
            params: {
                id : "",
                option: ""
            }
    });
}
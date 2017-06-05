'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('uploadPage', {
            url: '/uploadPage',
            template: require('./uploadPage.html'),
            controller: 'UploadPageController',
            controllerAs: 'uploadPage',
            resolve: {
                allTableData : function(appServices){
                    return appServices.getAllSavedQid();
                }
            }
        });
}
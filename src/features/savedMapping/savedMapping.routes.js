'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('savedMapping', {
            url: '/savedMapping',
            template: require('./savedMapping.html'),
            controller: 'SavedMappingController',
            controllerAs: 'savedMapping',
            resolve: {
                allMappedTable : function(appServices){
                    return appServices.getAllSavedMappingTable();
                }
            }

        });
}
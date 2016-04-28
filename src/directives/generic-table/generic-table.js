import angular from 'angular';
import templateData from '../../directives/generic-table/generic-table.html';
import '../generic-table/generic-table.scss';

function genericTable() {
    return {
        restrict: 'E',
        scope: {
            selectedAppType : "=",
            customOptions : "=",
            knownAppOptions : "=",
            uris : "=",
            description : "=",
            selectedKnownApp : '='
        },
        template: templateData,
        link: function(scope){
           scope.customSettings = {idProp: 'id'};
        }

    }

}

export default angular.module('directives.genericTable', [])
    .directive('genericTable', genericTable)
    .name;
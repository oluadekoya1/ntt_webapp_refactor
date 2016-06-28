import angular from 'angular';
import templateData from '../../directives/generic-table/generic-table.html';
import '../generic-table/generic-table.scss';

function genericTable() {
    return {
        restrict: 'E',
        scope: {
            selectedAppType : "=",
            knownAppOptions : "=",
            uris : "=",
            description : "=",
            selectedKnownApp : '=',
            results: '=',
            useFqdn : '=',
            appFqdn : '='
        },
        template: templateData,
        link: function(scope){

            console.log("=============>>>>>>>>>>>",  scope.knownAppOptions.owasp.checked, scope.uris);

            scope.checkItems = function(obj){
                obj.checked = !obj.checked;
            };

        }

    }



}

export default angular.module('directives.genericTable', [])
    .directive('genericTable', genericTable)
    .name;
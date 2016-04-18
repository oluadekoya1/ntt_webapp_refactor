/**
 * Created by adekoyao on 11/02/2016.
 */
import angular from 'angular';
import templateData from "../../directives/template/web-services.html";
import '../css/main-menu.css';

function webServices() {
    return {
        restrict: 'E',
        scope: {
            newPolicy: '='
        },
        template: templateData,

        controller: function($scope){
            $scope.toggleSelection = function(data, option) {
                var idx = data.selectedAnswer.indexOf(option);
                // is currently selected
                if (idx > -1) {
                    data.selectedAnswer.splice(idx, 1);
                }
                // is newly selected
                else {
                    data.selectedAnswer.push(option);
                }
            };
        }
    }
}

export default angular.module('directives.webServices', [])
    .directive('webServices', webServices)
    .name;
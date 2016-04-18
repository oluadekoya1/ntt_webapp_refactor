/**
 * Created by adekoyao on 11/02/2016.
 */

import angular from 'angular';
import templateData from "../../directives/template/known-app.html";
import '../css/main-menu.css';
import questionData from '../../features/createapplication/constants/policyDefine.json';

function knownApp() {
    return {
        restrict: 'E',
        scope: {
            newPolicy: '='
        },
        template: templateData,
        link: function(scope){
            scope.$watch('newPolicy.knowappOnly', function(newValue, oldValue) { console.log(newValue, oldValue);
                if(newValue && oldValue && newValue * 1 != oldValue * 1){
                    scope.newPolicy.knownApp = angular.copy(questionData.knownApp);
                }
            });
        },
        controller: function($scope){
        }
    }
}

export default angular.module('directives.knownApp', [])
    .directive('knownApp', knownApp)
    .name;
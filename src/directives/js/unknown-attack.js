/**
 * Created by adekoyao on 11/02/2016.
 */

import angular from 'angular';
import templateData from "../template/unknown-attack.html";
import '../css/main-menu.css';
import questionData from '../../features/createapplication/constants/policyDefine.json';



function unknownAttack() {
    return {
        restrict: 'E',
        scope: {
            newPolicy: '='
        },
        template: templateData,

        link: function(scope){

            scope.toggleSelection = function(data, option) {
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

            scope.$watch('newPolicy.knownAttack', function(newValue, oldValue) { console.log("------>>>>>>> un", newValue, oldValue, questionData.unknownAttacks);
                if(newValue && oldValue && newValue * 1 != oldValue * 1){
                    scope.newPolicy.unknownAttacks = angular.copy(questionData.unknownAttacks);
                }
            });

        },

        controller: function($scope){
        }
    }
}

export default angular.module('directives.unknownAttack', [])
    .directive('unknownAttack', unknownAttack)
    .name;
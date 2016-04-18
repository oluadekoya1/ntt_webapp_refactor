/**
 * Created by adekoyao on 11/02/2016.
 */

import angular from 'angular';
import templateData from "../template/known-attack.html";
import '../css/main-menu.css';
import questionData from '../../features/createapplication/constants/policyDefine.json';

function knownAttack() {
    return {
        restrict: 'E',
        scope: {
            newPolicy: '='
        },
        template: templateData,
        link: function(scope){ console.log("known attack");
            scope.$watch('newPolicy.knownAttack', function(newValue, oldValue) { console.log("----->>>>>> known",newValue, oldValue);
                if(newValue && oldValue && newValue * 1 != oldValue * 1){
                    scope.newPolicy.knownAttacks = angular.copy(questionData.knownAttacks);
                }
            });
        },
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

export default angular.module('directives.knownAttack', [])
    .directive('knownAttack', knownAttack)
    .name;
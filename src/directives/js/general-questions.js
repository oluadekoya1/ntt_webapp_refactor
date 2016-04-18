/**
 * Created by adekoyao on 11/02/2016.
 */
/**
 * Created by adekoyao on 11/02/2016.
 */
import angular from 'angular';
import templateData from "../template/general-questions.html";
import '../css/main-menu.css';

function generalQuestions() {
    return {
        restrict: 'E',
        scope: {
            newPolicy: '='
        },
        template: templateData,
        controller: function($scope){
            console.log($scope);
        }
    }
}

export default angular.module('directives.generalQuestions', [])
    .directive('generalQuestions', generalQuestions)
    .name;
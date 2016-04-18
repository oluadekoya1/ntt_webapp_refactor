import angular from 'angular';
import templateData from '../../directives/template/main-menu.html';
import logo from '../imgs/download.png';
import '../css/main-menu.css';

function mainMenu() {
    return {
        restrict: 'E',
        scope: {
            name: '='
        },
        template: templateData,
        controller: function($scope){

            $scope.logo = logo;

        }
    }
}

export default angular.module('directives.mainMenu', [])
    .directive('mainMenu', mainMenu)
    .name;
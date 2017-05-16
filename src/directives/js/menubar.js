import angular from 'angular';
import templateData from '../../directives/template/menubar.html';
import logo from '../imgs/download.png';

import '../css/menubar.css';

function menubar() {
    return {
        restrict: 'E',
        scope: {
            name: '='
        },
        template: templateData,
        controller: function($scope, appServices, $state){

            $scope.username = appServices.username;

            $scope.logo = logo;

            $scope.logout = function(){
                appServices.deleteCookie("loggedInUser");
                $state.go("signIn");
            }

            $scope.adminEntry = function(){
                $scope.username="";
                appServices.deleteCookie("loggedInUser");
                $state.go("admin");
            }

        }
    }
}

export default angular.module('directives.menubar', [])
    .directive('menubar', menubar)
    .name;



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
            $scope.boolOption = {};

            $scope.showFurtherOption = false;

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

            $scope.currentIndex = "";

            $scope.processSelectedAnswer = function(option, idx){ console.log(idx);

                $scope.currentIndex = idx;

                $scope.test = idx.toString();

                $scope.boolOption = option.selectedAnswer.substring(0,3);

                $scope.boolOption = $scope.boolOption.trim().toLowerCase();

                if($scope.boolOption === 'yes'){
                    return 'yes'
                } else if($scope.boolOption === 'no'){
                    return 'no'
                } else {
                    return "other"
                }

            };

            $scope.geolocaCount1 =[];
            $scope.geolocaCount =[{id:1, label:"Nigeria"},{id:2, label:"Ghana"},{id:3, label:"United Kingdom"}];

            $scope.addFurtherOption = function(option){
                if(option.furtherOptions){
                    var newOption = angular.copy(option.furtherOptions[$scope.boolOption][0]);

                    newOption.forEach(function(opt){
                        opt.answer = "";
                    });

                    option.furtherOptions[$scope.boolOption].push(newOption);

                    console.log( option.furtherOptions[$scope.boolOption]);
                }
            };

            $scope.removeFurtherOption = function(option){
                if(option.furtherOptions && option.furtherOptions[$scope.boolOption].length > 1){
                   option.furtherOptions[$scope.boolOption].pop();
                }
            };


        }
    }
}

export default angular.module('directives.webServices', [])
    .directive('webServices', webServices)
    .name;
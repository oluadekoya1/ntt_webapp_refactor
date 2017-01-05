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


            $scope.geolocaCount1 =[];
            $scope.geolocaCount =[{id:1, label:"Albania"}, {id:2, label:"Andorra"}, {id:3, label:"Armenia"}, {id:4, label:"Austria"},
                                  {id:5, label:"Azerbaijan"}, {id:6, label:"Belarus"}, {id:7, label:"Belgium"}, {id:8, label:"Bosnia and Herzegovina"},
                                  {id:9, label:"Bulgaria"}, {id:10, label:"Croatia"}, {id:11, label:"Cyprus"}, {id:12, label:"Czech Republic"},
                                  {id:13, label:"Denmark"}, {id:14, label:"Estonia"}, {id:15, label:"Finland"}, {id:16, label:"France"},
                                  {id:17, label:"Georgia"}, {id:18, label:"Germany"}, {id:19, label:"Greece"}, {id:20, label:"Hungary"},
                                  {id:21, label:"Iceland"}, {id:22, label:"Ireland"}, {id:23, label:"Italy"}, {id:24, label:"Kazakhstan"},
                                  {id:25, label:"Kosovo"}, {id:26, label:"Latvia"}, {id:27, label:"Liechtenstein"}, {id:28, label:"Lithuania"},
                                  {id:29, label:"Luxembourg"}, {id:30, label:"Netherlands"}, {id:31, label:"Norway"}, {id:32, label:"Poland"},
                                  {id:33, label:"Portugal"}, {id:34, label:"Russia"}, {id:35, label:"United Kingdom (UK)"}, {id:36, label:"United States of America (USA)"},
                                 ];

            $scope.addFurtherOption = function(option, bool, otherBool){
                if(option.hasFurtherOptions){

                    var newOption = (otherBool) ? angular.copy(option.hasFurtherOptions.furtherAnswers.data[0]) : angular.copy(option.hasFurtherOptions[bool][0]);

                    newOption.forEach(function(opt){
                        opt.answer = "";
                    });


                    (otherBool) ? option.hasFurtherOptions.furtherAnswers.data.push(newOption) : option.hasFurtherOptions[bool].push(newOption);

                    //  console.log( option.furtherOptions[$scope.boolOption]);
                }
            };

            $scope.removeFurtherOption = function(option, bool, otherBool){
                if(otherBool){
                    if(option.hasFurtherOptions && option.hasFurtherOptions.furtherAnswers.data.length > 1){
                        option.hasFurtherOptions.furtherAnswers.data.pop();
                    }
                }else{
                    if(option.hasFurtherOptions && option.hasFurtherOptions[bool].length > 1){
                        option.hasFurtherOptions[bool].pop();
                    }
                }

            };

            $scope.showMore = function(selectedContent){
                selectedContent.showMore = true;
            };

            $scope.updateFurtherAnswers = function(x,y){
                y.furtherAnswers.selectedOpt = x;

                y.furtherAnswers.data.length = 0; //reset array

                var opt = (x === 'url') ? [{ "label" : "Request Header Name", "type" : "textbox", "answer" : "" },
                    { "label" : "Request Header Value", "type" : "textbox", "answer" : "" }] :
                    [{ "label" : "Parameter Name", "type" : "textbox", "answer" : "" }];

                y.furtherAnswers.data.push(opt);
            }

            $scope.processSelectedAnswer = function(selectedAnswer){

                $scope.boolOption = selectedAnswer.substring(0,3);

                $scope.boolOption = $scope.boolOption.trim().toLowerCase();

                if($scope.boolOption === 'yes'){
                    return 'yes'
                } else if($scope.boolOption === 'no'){
                    return 'no'
                } else {
                    return "other"
                }

            };


        }
    }
}

export default angular.module('directives.webServices', [])
    .directive('webServices', webServices)
    .name;
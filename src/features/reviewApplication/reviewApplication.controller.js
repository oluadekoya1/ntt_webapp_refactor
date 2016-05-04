'use strict';

import assessmentQuestions from './constant/assessment_questions.json';
import lookupAnswers from './constant/assessment_scoringMatrix.json';

function  getResult(allList){
    var result = [],
    // allList = (sessionStorage.allList) ? JSON.parse(sessionStorage.allList) : [],
        sampleresultObject = {
            "Application_Complexity" : 0,
            "Application_Maintenance_Review" : 0,
            "Application_Technical_Impact" : 0,
            "Application_Business_Impact" : 0,
            "Total" : 0
        };

    allList.forEach(function(item){
        var content = item.assessmentList[0];
        var resultObject = angular.copy(sampleresultObject);

        content.forEach(function(contentItem){
            var appTotal = 0,
                answer = lookupAnswers.filter(function(answerItem){
                    return answerItem.tabID === contentItem.tabID;
                });
            if (contentItem.tabID === "App_Comp"){
                var totalAppcomp = 0;

                contentItem.tabContent.forEach(function(tabcontent){
                    var selectedAnswer = answer[0][tabcontent.name].filter(function(option){
                        return option.label === tabcontent.selectedAnswer
                    });
                    totalAppcomp = (selectedAnswer.length > 0) ? totalAppcomp + selectedAnswer[0].value : totalAppcomp;
                });

                resultObject["Application_Complexity"] = totalAppcomp;
            }
            else if (contentItem.tabID === "App_Maint_Review"){
                var totalAppreview = 0;

                contentItem.tabContent.forEach(function(tabcontent){
                    var selectedAnswer = answer[0][tabcontent.name].filter(function(option){
                        return option.label === tabcontent.selectedAnswer
                    });
                    totalAppreview = (selectedAnswer.length > 0 ) ? totalAppreview + selectedAnswer[0].value : totalAppreview;
                });

                resultObject["Application_Maintenance_Review"] = totalAppreview;

            }
            else if (contentItem.tabID === "App_Tech_Imp"){
                var totalAppImp = 0;

                contentItem.tabContent.forEach(function(tabcontent){
                    var selectedAnswer = answer[0][tabcontent.name].filter(function(option){
                        return option.label === tabcontent.selectedAnswer
                    });

                    totalAppImp = (selectedAnswer.length > 0 ) ? totalAppImp + selectedAnswer[0].value : totalAppImp;

                    resultObject["Application_Technical_Impact"] = totalAppImp;
                });
            }
            else if (contentItem.tabID === "App_Buss_Imp"){
                var totalAppBusImp = 0;

                contentItem.tabContent.forEach(function(tabcontent){
                    var selectedAnswer = answer[0][tabcontent.name].filter(function(option){
                        return option.label === tabcontent.selectedAnswer;
                    });
                    totalAppBusImp = (selectedAnswer.length > 0) ? totalAppBusImp + selectedAnswer[0].value : totalAppBusImp;
                    resultObject["Application_Business_Impact"] = totalAppBusImp;
                });
            }
        });
        result.push({appID : item.id, appName : item.appName, appDescription: item.appDescription, result : resultObject});
    }); console.log(result);

    sessionStorage.computedAssessment = JSON.stringify(result);


}

export default function reviewAppCtrl($scope ,$state, $stateParams, appServices ) {

    $scope.currentAppData = {};

    $scope.getAllSavedApp = function(){

        appServices.getAllSavedApp().then(function(data){

            $scope.allSavedApps = data;

            console.log(data);




            //data = data[0];
            //data['application_type'] = data['application_type'] * 1;
            //data.uris = JSON.parse(data.uris);
            //data.parameters = JSON.parse(data.parameters);
            //data.criticality = JSON.parse(data.criticality);
            //data['custom_options'] = JSON.parse(data['custom_options']);
            //data['known_applications'] = JSON.parse(data['known_applications']);
            //
            //$scope.appDescribe = data['application_description'];
            //
            //$scope.appType = data['application_type'];
            //
            //$scope.currentAppData = data;  console.log($scope);
            //
            //($scope.currentAppData['application_type'] === 1 )  ? customApp() : knownApp();
        })
    };

    function customApp(){
        $scope.rowHeader = $scope.currentAppData.uris;
        console.log(currentAppData.uris);
        $scope.colHeader = $scope.currentAppData['custom_options'];

    }


    function knownApp(){
        $scope.rowHeader = [];
        $scope.colHeader = $scope.currentAppData['known_applications'];
    }

    $scope.editAssessment = function(id){
        $state.go('edit-assessment', {redirect : true, id : id});
    };
    $scope.dashboard = function(id){
        $state.go('assess-doc', {id : id });
    };




}

reviewAppCtrl.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

'use strict';
import $ from 'jquery';
import assessmentQuestions from './constant/assessment_questions.json';
import lookupAnswers from './constant/assessment_scoringMatrix.json';
//import policyQuestions from '../createapplication/constants/policyDefine.json';

function  getResult(allList){
    var result = [],
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
    });

    sessionStorage.computedAssessment = JSON.stringify(result);


}

export default function reviewAppCtrl($scope ,$state, $stateParams, $http, appServices, allApps, pdfService) {

    console.log(allApps);

    $scope.readFile = function () {
        $http.get('/api/getxml').success(function (data) {
            var xmlfile = '<?xml version="1.0" encoding="utf-8"?>' + data.xmlfile;
            //var parser = new DOMParser();
            // var xmlDoc = parser.parseFromString( xmlfile ,"text/xml");
            window.open('data:text/xml,' + encodeURIComponent(xmlfile));
        }).error(function (error) {
            console.log(error);
        });
    };

    $scope.currentAppData = {};

    $scope.allSavedApps = allApps;

    $scope.computeResult = getResult(allApps);

    $scope.getCValue = function(id){
        var allList = JSON.parse(sessionStorage.computedAssessment);
        var cval = allList.filter(function (list) {
            return list.appID === id
        })[0];
        var total = 0;
        for (var prop in cval.result){
            total = total + cval.result[prop];
        }
        var val = Math.ceil((total * 100)/98);

        if(val <= 0){
            return ['white', val]
        } else if(val<40 && val >1){
            return ['green', val]
        }
          else if(val < 75 && val > 40){
            return ['orange', val]
        } else {
            return ['red', val]
        }
    };

    //$scope.getCValue = function(id){
    //
    //    var allList = JSON.parse(sessionStorage.computedAssessment);
    //    var cval = allList.filter(function (list) {
    //        return list.appID === id
    //    })[0];
    //    var total = 0;
    //    for (var prop in cval.result){
    //        total = total + cval.result[prop];
    //    }
    //    return Math.ceil((total * 100)/98);
    //
    //};

    function customApp(){
        $scope.rowHeader = $scope.currentAppData.uris;
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


    $scope.deleteApp = function(id){
        $http.post('/api/delete/' +id)
        .success(function (data){ console.log(data);
            $scope.allSavedApps = $scope.allSavedApps.filter(function(list){
                return list.id != id
            })
        }).error(function(error){
            console.log(error);
        })
    };

    $scope.editPolicy = function(appID, uriID){
        $state.go('edit-policy', {redirect : true, appID: appID, uriID : uriID });
    };

    $scope.generatePDF = function (app) {
        $scope.showPDF = true;
        $scope.selectedApplication = app;

        $scope.pdfName = app.appName;

        console.log(app);
    };

    $scope.getOptionDataLabel = function(optID, app){
        return app.options.filter(function(selApp){
            return selApp.id === optID
        })[0].label;
    };

    $scope.Cancel = function(){
        $scope.showPDF = false;
    };


    $scope.htmlToPDF = function(){
        var allTables = getAllTables(); console.log(allTables);
        pdfService.generateCurrentAssmntPDF($scope.pdfName, allTables);
    };


    var getAllTables = function(){
        var allIDs = [];
        var listTables = document.getElementsByClassName('pdf-tables')[0],
            tables = listTables.getElementsByClassName("table");

        for(var i = 0; i < tables.length; i++){
            allIDs.push(tables[i].id);
        }

        return allIDs;
    };

}


reviewAppCtrl.$inject = ['$scope', '$state', '$stateParams', '$http', 'appServices', 'allApps', 'pdfService'];


'use strict';

// importing the question.json file so that it is accessible within this file
import questionData from './constants/constants.json';
import assessmentQuestions from './constants/assessment.json';
import policyQuestions from './constants/policyDefine.json';
import lookupAnswers from './constants/lookupAnswers.json';
//import xmlfile from '../../files/nttWebApp.xml';
//import js2xmlparser from 'js2xmlparser';
import $ from 'jquery';

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

// exporting the contents of the Create App Controller so that it is available to other pages
export default function CreateAppCtrl($scope ,$state, $stateParams, $http, allApp, appServices) {

    //function getPolicyCnt(){
    //    var policies = [],
    //        policyQn,
    //        policyQn2;
    //
    //    var opt1 = $scope.tabs[0].tabContent.filter(function(qn){
    //        return qn.name === 'apinfo3';
    //    });
    //
    //    var opt2 = $scope.tabs[0].tabContent.filter(function(qn){
    //        return qn.name === 'apinfo4';
    //    });
    //
    //
    //    if(opt1[0].selectedAnswer.toLowerCase() === 'yes' && opt2[0].selectedAnswer.toLowerCase() === 'yes'){
    //        policyQn = {cnt: 0, pd : angular.copy(policyQuestions)};
    //        policyQn2 = {cnt: 1, pd : angular.copy(policyQuestions)};
    //        policies = [policyQn, policyQn2]
    //    } else {
    //        policyQn = {cnt: 0, pd : angular.copy(policyQuestions)};
    //        policies = [policyQn]
    //    }
    //
    //    return policies;
    //
    //}
    //
    //function resetAll(){
    //
    //    $scope.appName = "";
    //    $scope.appDescription = "";
    //    $scope.tabs = angular.copy(questionData);
    //}
    //
    //var saveData = (function () {
    //    var a = document.createElement("a");
    //    document.body.appendChild(a);
    //    a.style = "display: none";
    //    return function (data, fileName) {
    //        var json = JSON.stringify(data),
    //            blob = new Blob([json], {type: "text/xml"}),
    //            url = window.URL.createObjectURL(blob);
    //        a.href = url;
    //        a.download = fileName;
    //        a.click();
    //        window.URL.revokeObjectURL(url);
    //    };
    //}());
    //
    //
    //
    //$scope.editAssessment = function(id){
    //    $state.go('edit-assessment', {redirect : true, id : id});
    //};
    //
    //$scope.editPolicy = function(id, cnt){
    //    $state.go('edit-policy', {redirect : true, id : id, cnt: cnt });
    //};
    //
    //$scope.dashboard = function(id){
    //    $state.go('assess-doc', {id : id });
    //};
    //
    //$scope.Policy1 = function(){
    //    $state.go('policy');
    //};
    //
    //$scope.deleteApp = function(id){
    //
    //    $http.post('/api/delete/' + id)
    //        .success(function (data) {
    //            $scope.allList = $scope.allList.filter(function(list){
    //                return list.id != id
    //            });
    //        })
    //        .error(function (error) {
    //            console.log(error);
    //        });
    //
    //    //$scope.allList = $scope.allList.filter(function(list){
    //    //    return list.id != id
    //    //});
    // //   sessionStorage.allList = JSON.stringify($scope.allList);
    //};
    //
    ////$scope.downloadXML = function(){
    ////
    ////    var jsonString = JSON.stringify(xmlfile);
    ////
    ////    var xmlString = js2xmlparser("policy", jsonString);
    ////
    ////    var a = document.createElement('a');
    ////    a.setAttribute("href", "data:application/xml;charset=utf-8," + xmlString);
    ////    a.setAttribute("download", "my.xml");
    ////    a.click();
    ////
    ////};
    //
    //$scope.TableUpdate = function() { console.log(appServices);
    //
    //    if ($scope.appName == null || $scope.appName == "") {
    //        alert("Application Name must be filled out");
    //    } else {
    //        let date = new Date(),
    //            assessmentQns = angular.copy(assessmentQuestions),
    //            policyQns = getPolicyCnt();
    //
    //        //create new application
    //        var newApp = {
    //                id : date.getTime(),
    //                username : appServices.username,
    //                assessApp : 'false',
    //                policyCheck: 'false',
    //                appName : $scope.appName,
    //                appDescription: $scope.appDescription,
    //                commonQuestions: JSON.stringify($scope.tabs[0]),
    //                assessmentList : JSON.stringify([assessmentQns]),
    //                policyDefinition: JSON.stringify(policyQns) ,
    //                status : 'in progress'
    //            },
    //            newJSONApp = {
    //                id : date.getTime(),
    //                username : appServices.username,
    //                assessApp : false,
    //                policyCheck: false,
    //                appName : $scope.appName,
    //                appDescription: $scope.appDescription,
    //                commonQuestions: $scope.tabs[0],
    //                assessmentList : [assessmentQns],
    //                policyDefinition: policyQns ,
    //                status : 'in progress'
    //            };
    //
    //
    //        $http.post('/api/save', newApp)
    //            .success(function(){
    //                $scope.allList.push(newJSONApp);
    //            })
    //            .error(function(data){
    //                console.log(data);
    //            });
    //
    //
    //        resetAll();
    //    }
    //
    //
    //};

};

CreateAppCtrl.$inject = [ '$scope', '$state', '$stateParams', '$http', 'allApp', 'appServices'];

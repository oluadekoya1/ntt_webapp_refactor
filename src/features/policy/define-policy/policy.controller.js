'use strict';

// exporting the contents of the Assessment Controller so that it is available to other pages
export default function PolicyController($scope ,$state, $stateParams, pdfService, appServices, allApps) {

    console.log($state, allApps);

    var getResults = function(option){
        var results = {};

        option = option.toLowerCase();

        results.appName = $scope.appName;
        results.appDescription = $scope.appDescription;

        if(option === "web services"){
            results.selectedOption = "Web Services";
            results.selectedAnswers = $scope.newPolicy.webServices;
        }
        else if(option === "known app"){
            results.selectedOption = "Known Applications";
            results.selectedAnswers = $scope.newPolicy.knownApp;
        }
        else if(option === "known attack"){
            results.selectedOption = "Known Attacks / Negative Security";
            results.selectedAnswers = $scope.newPolicy.knownAttacks;
        }
        else if(option === "unknown attack"){
            results.selectedOption = "Unknown Attacks / Negative and Positive Security";
            results.selectedAnswers = $scope.newPolicy.unknownAttacks;
        }

        //general answers
        results.generalAnswers = $scope.newPolicy.generalQuestions;

        console.log(option);

        return results;
    };

    var getAllTables = function(){
        var allIDs = [];
        var listTables = document.getElementById('selectedAnswersTable'),
            tables = listTables.getElementsByClassName("table");

        for(var i = 0; i < tables.length; i++){
            allIDs.push(tables[i].id);
        }

        return allIDs;
    };

    var allList = allApps;

    //appServices.getAllApps().then((data) => {
    //    init(data);
    //});

    //function  init(allList){

        let currentID = $stateParams.appID * 1,
            currentCnt = $stateParams.uriID;

        //var allList = JSON.parse(sessionStorage.allList);

        var currentApp = allList.filter(function(list){
            return list.id === currentID
        })[0];

        $scope.newPolicy = (currentCnt.length > 0) ? currentApp.policyDefinition[currentCnt] : currentApp.policyDefinition;

        $scope.appName = currentApp.appName;

        $scope.appDescription = currentApp.appDescription;

        $scope.pdfName = "";

        $scope.showResult = false;

        $scope.updateWebServices = function(){
            if($scope.newPolicy.webServiceOnly * 1 === 1){
                $scope.newPolicy.knowappOnly = -1;
                $scope.newPolicy.knownAttack = -1;
            }
        };

        $scope.updateKnowApp = function(){
            if($scope.newPolicy.knowappOnly > 0){
                $scope.newPolicy.knownAttack = -1;
            }
        };


        $scope.submit = function(){

            //currentApp.policyDefinition.filter(function(policy){
            //   if(policy.cnt === currentCnt){
            //       policy = $scope.newPolicy;
            //   }
            //});

            var newApp = {
                policyDefinition: JSON.stringify(currentApp.policyDefinition),
                policyCheck: true
            };
            console.log("Olu testing");
            console.log(newApp);
            console.log("Olu testing");

            appServices.updatePolicy(currentID, newApp).then(function(data){
                //sessionStorage.allList = JSON.stringify(allList);
                $state.go('review-app', {redirect : true});
            });
        };

        $scope.cancelPolicy = function(){
            $state.go('review-app', {redirect : true});
        };

        $scope.generatePDF = function(){ console.log($scope);
            $scope.showResult = !$scope.showResult;
            var option;
            if($scope.newPolicy.webServiceOnly * 1 === 1){
                option = 'Web services';
            }
            else if($scope.newPolicy.knowappOnly * 1 > 0){
                option = "known app";
            }
            else if($scope.newPolicy.knownAttack * 1 === 1){
                option = "known attack"
            }
            else if($scope.newPolicy.knownAttack * 1 === 0){
                option = "unknown attack"
            }
            $scope.results = getResults(option);
        };

        $scope.Cancel = function(){
            $scope.showResult = false;
        };

        $scope.printPDF = function(){
            //jspdf references http://simonbengtsson.github.io/jsPDF-AutoTable/
            //jspdf references https://github.com/simonbengtsson/jsPDF-AutoTable/blob/master/examples/examples.js

            var allTables = getAllTables();
            pdfService.generatePolicyPDF($scope.appName, allTables);

        };
    //}



};

PolicyController.$inject = [ '$scope', '$state', '$stateParams', 'pdfService', 'appServices', "allApps"];
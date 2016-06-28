'use strict';

// exporting the contents of the Assessment Controller so that it ia available to other pages
export default function AssessmentController($scope ,$state, $stateParams, pdfService, appServices, $timeout, $http) {

    appServices.getAllSavedApp().then((data) => {
       init(data);
    });

    function init(allList) {

        let currentID = $stateParams.id * 1;

        $scope.showResult = false;

        let toEdit = allList.filter(function(list){
                return list.id === currentID
            })[0];

        $scope.tabs = toEdit.assessmentList[0];
        $scope.appName = toEdit.appName;
        $scope.appDescription = toEdit.appDescription;
        $scope.buttonClicked = false;

        var getAllTables = function(){
            var allIDs = [];
            var listTables = document.getElementById('assessment-ans-table'),
                tables = listTables.getElementsByClassName("table");

            for(var i = 0; i < tables.length; i++){
                allIDs.push(tables[i].id);
            }

            return allIDs;
        };

        // Function Submit : It retrieves the content in the session storage (
        $scope.submit = function(){
            $scope.buttonClicked = true;
            if($scope.isValid()){
                var newApp = {
                    id:currentID,
                    assessCheck: 'true',
                    appName : $scope.appName,
                    appDescription: $scope.appDescription,
                    general_questions: JSON.stringify(toEdit.general_questions),
                    assessmentList : JSON.stringify([$scope.tabs]),
                    policy_design_questions: JSON.stringify(toEdit.policy_design_questions) ,
                    status : 'criticality completed'
                };

            console.log(newApp);

                appServices.updateAssessment(currentID, newApp).then(function(data){
                    //sessionStorage.allList = JSON.stringify(allList);
                    $state.go('review-app', {redirect : true});
                });

            }
        };

        $scope.cancelAssessment = function () {
            $state.go('review-app', {redirect : true});
        };

        //check if all options are selected
        $scope.isValid = function(){
            var valid = true;
            for(var i=0; i< $scope.tabs.length; i++) {
                var tabContent = $scope.tabs[i].tabContent;
                for(var j = 0; j < tabContent.length; j++){
                    if(tabContent[j].selectedAnswer === ""){
                        valid = false;
                        return valid;
                    } else{
                        valid = true;
                    }
                }
            }
            return valid;
        };

        $scope.generatePDF = function(){
            $scope.showResult = true;
            $scope.toPrintData = {
                appName: $scope.appName,
                appDescription: $scope.appDescription,
                content: $scope.tabs
            };
        };

        $scope.cancel = function(){
            $scope.showResult = false;
        };

        $scope.printPDF = function(){
            var allTables = getAllTables();
            pdfService.generateCurrentAssmntPDF($scope.appName, allTables);
        };

        $scope.CreatePolicy = function(){
            $scope.submit();
            $state.go('policy', {id : currentID });
        };

    }



};

AssessmentController.$inject = [ '$scope', '$state', '$stateParams', "pdfService", "appServices", '$http'];

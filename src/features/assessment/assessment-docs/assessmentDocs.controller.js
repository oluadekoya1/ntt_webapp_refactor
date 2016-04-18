'use strict';

function getPercentage(val, option){
     let percentVal, color;

     if (option === "Application_Complexity"){
         percentVal = (val * 100) /13;
     }
     else if (option === "Application_Maintenance_Review"){
          percentVal = (val * 100) /15;
     }
     else if (option === "Application_Technical_Impact"){
          percentVal = (val * 100) /30;
     }
     else if (option === "Application_Business_Impact"){
          percentVal = (val * 100) /40;
     }

     if(percentVal <= 100 && percentVal > 75){
          color = '#FF0000';
     } else if(percentVal <= 75 && percentVal > 45){
          color = '#ffc200';
     } else if(percentVal <= 45 && percentVal >= 0){
          color = '#00ff11';
     }

     return {valPercent : Math.round(percentVal), color : color };

}


export default function assessmentDocsCtrl($scope, $state, pdfService) {

     let id = $state.params.id;
     let sum = 0;

     let computedList = (sessionStorage.computedAssessment) ? JSON.parse(sessionStorage.computedAssessment) : [],
         currentApp = computedList.filter(function(list){
              return list.appID === id * 1;
         })[0];

     if(currentApp){

          for(var prop in currentApp.result){
               if(prop.toLowerCase() != 'total'){
                    sum = sum + currentApp.result[prop];
               }
          }

          currentApp.result.total = sum;

          $scope.dashboardData = [];

          for (var prop in currentApp.result){
               if(prop.toLowerCase() != 'total'){
                    var propData = {};
                    var copyProp = angular.copy(prop);
                    var details = getPercentage(currentApp.result[prop], prop);

                    copyProp = copyProp.replace('_', " ");

                    propData['name'] = copyProp;
                    propData['value'] = details.valPercent;
                    propData['color'] = details.color;
                    $scope.dashboardData.push(propData);
               }
          }

          $scope.criticalityValue = Math.round((currentApp.result.total * 100)/98);

          //draw guage chart
          var data = google.visualization.arrayToDataTable([
                   ['Label', 'Value'],
                   ['Criticality', $scope.criticalityValue]
              ]),
              options = {
                   width: 400, height: 250,
                   redFrom: 0, redTo: 30,
                   yellowFrom:30, yellowTo: 70,
                   greenFrom:70, greenTo: 100,
                   minorTicks: 5,
                   greenColor: '#00ff11',
                   yellowColor: '#ffc200',
                   redColor: '#FF0000'
              };
          var chart_div = document.getElementById('chart_div');
          var chart = new google.visualization.Gauge(chart_div);

          chart.draw(data, options);


          $scope.print = function(){
               pdfService.generateDashboardPDF('#dashboard-preview');
          };

     }
}

assessmentDocsCtrl.$inject = ['$scope', '$state', 'pdfService'];





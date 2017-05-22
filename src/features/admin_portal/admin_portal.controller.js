'use strict';

import $ from'jquery';
import '../../factories/appServices';


export default function adminPortalController($scope, $state, $stateParams, $http, appServices, allInfo) {



    $scope.user = appServices.getAdminName();
    $scope.allSavedInfo = allInfo;



    if($scope.user !== ""){
        $scope.varName =true;
    }

    $scope.logout1 = function(){
        appServices.deleteCookie("loggedInUser");
        $state.go("admin");
    };

    $scope.qid="";
    $scope.title="";
    $scope.subCategory="";
    $scope.severity="";
    $scope.category="";
    $scope.cvss="";
    $scope.mitigationLevel="";
    $scope.asmMitigation="";
    $scope.comments="";


    $scope.updateTableMapping = function(){

        var newTableUpdate = {
            qid: $scope.qid,
            title: $scope.title,
            subCategory: $scope.subCategory,
            severity: $scope.severity,
            category: $scope.category,
            cvss: $scope.cvss,
            mitigationLevel: $scope.mitigationLevel,
            asmMitigation:$scope.asmMitigation,
            comments: $scope.comments
        };
        //if  qid is not in the table

        if($scope.qid == ""){
            $('#errorModal11').modal('show')

        }
        else {
            $http.post('/api/mappingUpdate', newTableUpdate)
                .success(function(){
                    console.log(newTableUpdate);
                })
                .error(function(data){
                    console.log(data);
                });
            $state.go('adminPortal');
        };
    }

    $scope.deleteAppEntry = function(qid){
        $http.post('/api/delete-matrix/' +qid)
            .success(function (data){ console.log(data);
                $scope.allSavedInfo = $scope.allSavedInfo.filter(function(list){
                    return list.qid != qid
                })
            }).error(function(error){
            console.log(error);
        })
    };




}

adminPortalController.$inject = ["$scope", "$state", '$stateParams', "$http", "appServices", "allInfo"];






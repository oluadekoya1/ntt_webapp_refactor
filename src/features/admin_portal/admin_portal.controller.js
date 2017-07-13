'use strict';

import $ from'jquery';
import '../../factories/appServices';


export default function adminPortalController($scope, $state, $stateParams, $http, appServices, allInfo) {



    $scope.user = appServices.getAdminName();
    $scope.allSavedInfo = allInfo;
    $scope.isUpdate = false;

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

    $scope.openModal = function(){

        $scope.qid="";
        $scope.title="";
        $scope.subCategory="";
        $scope.severity="";
        $scope.category="";
        $scope.cvss="";
        $scope.mitigationLevel="";
        $scope.asmMitigation="";
        $scope.comments="";

        $('#myModal').modal('show');
    };

    $scope.addNew = function(newTableUpdate){
        $http.post('/api/mappingUpdate', newTableUpdate)
            .success(function(data){
                if(data){
                    $location.path('/adminPortal');
                }


            })
            .error(function(data){
                console.log(data);
            });
    };

    $scope.updateExisting = function(newTableUpdate){
        $http.post('/api/update-vulnerability/'+newTableUpdate.qid, newTableUpdate)
            .success(function(data){

            })
            .error(function(data){
                console.log(data);
            });
    };

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
            $('#errorModal11').modal('show');
        }
        else {
            if(!$scope.isUpdate){
                $scope.addNew(newTableUpdate);
            } else {
                $scope.updateExisting(newTableUpdate);
            }

            $state.go('adminPortal');
            window.location.reload();

        }
    };

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

    $scope.retrieveRowEntry = function(qid){

        $scope.selectedRow = $scope.allSavedInfo.filter(function(list){
            return list.qid === qid
        })[0];

        $scope.qid = $scope.selectedRow.qid;
        $scope.title = $scope.selectedRow.title;
        $scope.subCategory = $scope.selectedRow.subCategory;
        $scope.severity = $scope.selectedRow.severity;
        $scope.category = $scope.selectedRow.category;
        $scope.cvss = $scope.selectedRow.cvss;
        $scope.mitigationLevel = $scope.selectedRow.mitigationLevel;
        $scope.asmMitigation = $scope.selectedRow.asmMitigation;
        $scope.comments = $scope.selectedRow.comments;

        $scope.isUpdate = true;

    };













}

adminPortalController.$inject = ["$scope", "$state", '$stateParams', "$http", "appServices", "allInfo"];






'use strict';



export default function SupportController($scope) {
    $scope.supportData = supportData;

    $scope.showMe = function(){
        alert("Show Me");
    }
}

SupportController.$inject = ['$scope'];
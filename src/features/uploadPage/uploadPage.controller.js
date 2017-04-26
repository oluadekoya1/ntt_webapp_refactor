'use strict';




export default function UploadPageController($scope ,$state, $stateParams, appServices ) {


    //$scope.myApps = function(){
    //    $state.go('review-app', {username :$scope.user });
    //};
    $scope.user = appServices.getUserName();


    //GET THE FILE INFORMATION

    $scope.setFiles = function(element) {


        var index =angular.element(element).scope().$index;
        var Dfile = element.files[0].name;
        $scope.retrievedFileName= Dfile;


        //$scope.files =[];
        //$scope.$apply(function (){
        //
        //    //STORE THE FILE OBJECT ARRAY
        //    for (var i=0; i<element.files.length; i++){
        //        $scope.files.push(element.files[i]);
        //        $scope.this.fileName[i]=element.files[i].name;
        //    }
        //});



    };


    ////START
    //
    //// NOW UPLOAD FILES
    //
    //$scope.uploadFile =function(){
    //
    //
    //    //FILL FormData WITH FILE DETAILS
    //
    //    var data = new FormData();
    //
    //    for (var i in $scope.files){
    //        data.append("uploadedFile", $scope.files[i]);
    //    }
    //    console.log(files[i]);
    //
    //    //ADD LISTENRS
    //    var objXhr = new XMLHttpRequest();
    //    objXhr.addEventListener("progress", updateProgress, false);
    //    objXhr.addEventListener("load", transferComplete, false);
    //
    //    //SEND FILE DETAILS TO THE API
    //    objXhr.open("POST", "/api/fileupload/")
    //    objXhr.send(data)
    //}
    //
    ////UPDATE PROGRESS BAR
    //
    //function updateProgress(element) {
    //    if(element.lengthComputable){
    //        document.getElementById('pro').setAttribute('value', element.loaded);
    //        document.getElementById('pro').setAttribute('max', element.total);
    //    }
    //}
    //
    //function transferComplete(element){
    //    alert("Files uploaded successfully")
    //}
    //
    //
    //
    ////END




}

UploadPageController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

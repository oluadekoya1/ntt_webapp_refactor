'use strict';




export default function UploadPageController($scope ,$state, $stateParams, appServices ) {


    //$scope.myApps = function(){
    //    $state.go('review-app', {username :$scope.user });
    //};
    $scope.user = appServices.getUserName();

    //GET THE FILE INFORMATION
    $scope.setFiles = function(element) {

        //GET XML FILE NAME & UPDATE INPUT BOX
        var index =angular.element(element).scope().$index;
        var Dfile = element.files[0].name;
        $scope.retrievedFileName= Dfile;
        console.log(element.files);

            //READ FILE TO CONSOLE
            var file = document.getElementById('file').files[0],
            reader = new FileReader();
            reader.onloadend =function(e){
                $scope.data = e.target.result;
                console.log("i am reading this");
                console.log ($scope.data);
            };
            reader.readAsBinaryString(file);


            $scope.files =[];
            $scope.$apply(function (){
                //STORE THE FILE OBJECT ARRAY
                for (var i=0; i<element.files.length; i++){
                    $scope.files.push(element.files[i]);
                    console.log(element.files[i]);
                }
            });
    };


    $scope.transformXML= function(){

        console.log("this is the second time", $scope.data);
        var x,k,y,i,parser, xmlDoc;
        var text = $scope.data;
        var txt= "";

        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text,"text/xml");
            document.getElementById("demo23").innerHTML =
            xmlDoc.getElementsByTagName("QID")[0].childNodes[0].nodeValue;

        x = xmlDoc.documentElement.childNodes;
        for (k=0; k < x.length; k++){
            if(x[k].nodeName == "RESULTS"){


            }
            //txt += x[k].nodeName  + "<br>";
        }
        document.getElementById("demo27").innerHTML = txt;


    };


    $scope.testXMLFields= function(){

        var xmlData = $scope.data;

        var parser = new DOMParser();

        var vulArray = [];

        var xmlDoc = parser.parseFromString(xmlData,"text/xml");

        var childNodes = xmlDoc.getElementsByTagName("VULNERABILITY_LIST")[0].childNodes;


        if(childNodes){
            for ( var i = 0; i <= childNodes.length; i++) {

                if(childNodes[i] && childNodes[i].nodeName === "VULNERABILITY"){

                    vulArray.push(childNodes[i]);

                }

            }
        }

        for(var j = 0; j < vulArray.length; j++){

            var children = vulArray[j].children;

            for(var child = 0; child < children.length; child++) {

                if(children[child].tagName.toLowerCase() === "qid") {

                    var qid = vulArray[j].children[child].innerHTML;

                    var category = $scope.getCategory(qid);

                    var title = $scope.getTitle(qid);

                    console.log(qid, "=====", category, "======", title);

                }
            }


        }

        console.log(childNodes, xmlDoc, vulArray);



    };

    $scope.getCategory = function (qid) {

        //get glossary
        var glossary = $scope.glossary();


        return glossary.filter(function(obj){

            return obj["QID"] === qid
        })[0]["CATEGORY"];

    };

    $scope.getTitle = function (qid) {

        //get glossary
        var glossary = $scope.glossary();


        return glossary.filter(function(obj){

            return obj["QID"] === qid

        })[0]["TITLE"];

    };


    $scope.glossary = function(){

        var parser = new DOMParser();

        var xmlDoc = parser.parseFromString($scope.data,"text/xml");

        var childNodes = xmlDoc.getElementsByTagName("QID_LIST")[0].childNodes;

        var qidList = [];

        var qidArray = [];

        if(childNodes){
            for ( var i = 0; i <= childNodes.length; i++) {

                if(childNodes[i] && childNodes[i].nodeName === "QID"){
                    qidList.push(childNodes[i]);
                }

            }
        }

        for(var j = 0; j < qidList.length; j++){

            var children = qidList[j].children;

            var item = {};

            for(var child = 0; child < children.length; child++) {

                item[qidList[j].children[child].tagName] = qidList[j].children[child].innerHTML;

            }

            qidArray.push(angular.copy(item));

        };

        return qidArray;

    }

}

UploadPageController.$inject = ['$scope', '$state', '$stateParams', 'appServices'];

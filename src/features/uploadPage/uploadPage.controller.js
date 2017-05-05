'use strict';




export default function UploadPageController($scope ,$state, $stateParams, appServices ) {


    //$scope.myApps = function(){
    //    $state.go('review-app', {username :$scope.user });
    //};
    $scope.user = appServices.getUserName();

    $scope.testObject = [];

    //GET THE FILE INFORMATION
    $scope.setFiles = function(element) {

        //GET XML FILE NAME & UPDATE INPUT BOX
        var index =angular.element(element).scope().$index;
        var Dfile = element.files[0].name;
        $scope.retrievedFileName= Dfile;


            //READ FILE TO CONSOLE
            var file = document.getElementById('file').files[0],
            reader = new FileReader();
            reader.onloadend =function(e){
                $scope.data = e.target.result;

            };
            reader.readAsBinaryString(file);


            $scope.files =[];
            $scope.$apply(function (){
                //STORE THE FILE OBJECT ARRAY
                for (var i=0; i<element.files.length; i++){
                    $scope.files.push(element.files[i]);

                }
            });
    };


    $scope.transformXML= function(){


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

        console.log(xmlDoc);

        if(childNodes){
            for ( var i = 0; i <= childNodes.length; i++) {
                if(childNodes[i] && childNodes[i].nodeName === "VULNERABILITY"){
                    vulArray.push(childNodes[i]);
                }
            }
        }

        for(var j = 0; j < vulArray.length; j++){

            //get qid
            var qid = vulArray[j].getElementsByTagName('QID')[0].innerHTML;

            //get category
            var category = $scope.getCategory(qid);

            //get title
            var title = $scope.getTitle(qid);

            //get request
            var method = vulArray[j].getElementsByTagName('METHOD')[0].innerHTML;

            //get url
            var url = vulArray[j].getElementsByTagName('URL')[0].innerHTML;

            //get trigger
            var trigger = vulArray[j].getElementsByTagName("PAYLOAD")[0].getElementsByTagName("PAYLOAD")[0].innerHTML

            //get cwe
            var cwe = $scope.getCWE(qid);

            //get cvss base
            var cvssbase = $scope.getCVSSBASE(qid);

            $scope.testObject.push({
                qid: qid,
                category: category,
                title: title,
                method: method,
                url: url,
                trigger:trigger,
                cwe: cwe,
                cvssbase: cvssbase
            });

        }

    };


    $scope.getMethodAndUrl = function(payloads){

        var parser = new DOMParser();

        var payloadsXML = parser.parseFromString(payloads,"text/xml");

        var method = payloadsXML.getElementsByTagName("METHOD")[0].innerHTML;

        var url = payloadsXML.getElementsByTagName("URL")[0].innerHTML;

        return {
            method: method,
            url: url
        }
    };

    $scope.getCategory = function (qid) {

        //get glossary
        var glossary = $scope.glossary();
        return glossary.filter(function(obj){
            return obj["QID"] === qid
        })[0]["CATEGORY"];

    };

    $scope.getCWE = function (qid) {

        //get glossary
        var glossary = $scope.glossary();
        return glossary.filter(function(obj){
            return obj["QID"] === qid
        })[0]["CWE"];

    };

    $scope.getCVSSBASE = function (qid) {

        //get glossary
        var glossary = $scope.glossary();
        return glossary.filter(function(obj){
            return obj["QID"] === qid
        })[0]["CVSS_BASE"];

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

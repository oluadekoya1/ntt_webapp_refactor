/**
 * Created by olumayowaadekoya on 15/03/2016.
 */
import angular from 'angular';
import $ from 'jquery';


function appServices($http, $q) {

    this.$http = $http;

    this.allSavedApplications = [];

    this.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();

        exdays = exdays || exdays;

        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };

    this.getCookie = function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    };

    this.deleteCookie = function(cname) {
        document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    this.username = this.getCookie('loggedInUser') || "";

    this.adminName = this.getCookie('loggedInAdmin') || "";

    this.appDetails = {};

    this.getUserName = function(){
        return this.username;
    };

    this.setUserName = function(name){
        this.username = name;
    };

    this.setAdminName = function(name){
        this.adminName = name;
    };

    this.getAdminName = function(){
        return this.adminName;
    };

    this.getAllApps = function(){
        var dfd = $q.defer();

        if(this.username === ""){
            return []
        } else {
            this.$http.get('/api/get-all/' + this.username)
                .then(function (data) {
                    var result = [];
                    data.forEach(function(app){
                        var newApp = {
                            id : app.id * 1,
                            username : app.username,
                            assessApp : (app.criticality_complete === 'true'),
                            appName : app.application_name,
                            appDescription: app.application_description,
                            commonQuestions: JSON.parse(app.common_questions),
                            assessmentList : JSON.parse(app.criticality),
                            policyDefinition: JSON.parse(app.policy) ,
                            status : app.application_status,
                            policyCheck : (app.policy_check === 'true'),
                            knownAppOptions : app.features,
                            uris : app.uris,
                            appFqdn : app.application_fqdn,
                            selectedAppType : app.application_type,
                            parameters : app.parameters,
                            features1 :  app.features
                        };
                        result.push(newApp);
                    });
                    dfd.resolve(result);
                })
                .error(function (error) {
                    dfd.reject(error)
                });

            return dfd.promise;
        }

    };

    this.getAppWIthID = function(id){
        var dfd = $q.defer();

        this.$http.get('/api/get-app-with-id/' + id)
                .success(function (data) {
                    dfd.resolve(data);
                })
                .error(function (error) {
                    dfd.reject(error)
                });

            return dfd.promise;


    };

    this.deleteWithID = function(id){
        var dfd = $q.defer();

        this.$http.get('/api/delete/' + id)
                .success(function (data) {
                     //  result.push(data);
                   dfd.resolve(data);
                })
                .error(function (error) {
                    dfd.reject(error)
                });

            return dfd.promise;


    };

    this.updateAssessment = function(currentID, newApp){
        var dfd = $q.defer();

        this.$http.post('/api/update-assessment1/' + currentID , newApp)
            .success(function(data){
                dfd.resolve(data);
            })
            .error(function(data){
                dfd.reject(data);
            });

        return dfd.promise;

    };

    this.updatePolicy = function(currentID, newApp){
        var dfd = $q.defer();

        this.$http.post('/api/update-policy/' + currentID , newApp)
            .success(function(data){
                dfd.resolve(data);
            })
            .error(function(data){
                dfd.reject(data);
            });

        return dfd.promise;

    };

    this.getAllSavedApp = function(){
        var dfd = $q.defer();

        this.$http.get('/api/get-saved-app/' + this.username)
            .success((data) => {
                var result = [];
                data.forEach(function (app) {
                    var newApp = {
                        id: app.id * 1,
                        username: app.username,
                        appName: app["application_name"],
                        selectedAppType: app["application_type"],
                        appFqdn: app["domain_name"],
                        selectedKnownApp: app["application_description"],
                        general_questions: app["general_questions"],
                        assessmentList: JSON.parse(app["criticality_questions"]),
                        policyDefinition: JSON.parse(app["policy_design_questions"]),
                        assessCheck: app["criticality_check"],
                        policyCheck: app["policy_check"],
                        uris: JSON.parse(app["uris"]),
                        parameters: JSON.parse(app["parameters"]),
                        knownAppOptions: JSON.parse(app["known_application"])
                    };

                    result.push(newApp);
                });

                this.allSavedApplications = result;

                dfd.resolve(result);

            })
            .error( (error) => {
                dfd.reject(error)
            });

        return dfd.promise;


    };


}

export default angular.module('services.appServices', [])
    .service('appServices', appServices)
    .name;
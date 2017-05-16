
import 'bootstrap/dist/css/bootstrap.min.css';
import lodash from "lodash";
import angular from 'angular';
import uirouter from 'angular-ui-router';
import swal from 'sweetalert';
import signIn from './features/signIn/index';
import admin from './features/admin/index';
import uploadPage from './features/uploadPage/index';
import adminPortal from './features/admin_portal/index';
import homepage from './features/homepage/index';
import createapp from './features/createapplication/index';
import defineapp from './features/defineApplication/index';
import reviewapp from './features/reviewApplication/index';
import assessApp from './features/assessment/assess-application/index';
import definepolicy from './features/policy/define-policy/index';
import editpolicy from './features/policy/define-policy/index';
import assessDocs from './features/assessment/assessment-docs/index';
import routing from './app.config';
import support from './features/support/index';
import appServices from './factories/appServices';


google.load('visualization', '1', {packages:['corechart', 'gauge']});
google.setOnLoadCallback(function() {});


var nttComs = angular.module('app', [uirouter,assessDocs, signIn, admin, assessApp, reviewapp, createapp, defineapp, uploadPage, adminPortal, homepage, support, definepolicy, editpolicy, appServices]);

nttComs.run(function($rootScope, appServices, $location) {

    $rootScope.$on('$stateChangeStart', function () {
        if(appServices.getCookie("loggedInAdmin").length !== 0 && ($location.url()==='/admin' || $location.url()==='/adminPortal')){
            return false;
        }
        else if (appServices.getCookie("loggedInUser").length === 0) {
                $location.path('/');
        }
    });




});

nttComs.config(routing);


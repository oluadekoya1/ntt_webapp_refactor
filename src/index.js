
import 'bootstrap/dist/css/bootstrap.min.css';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import swal from 'sweetalert';
import signIn from './features/signIn/index';
import homepage from './features/homepage/index';
import createapp from './features/createapplication/index';
import assessApp from './features/assessment/assess-application/index';
import definepolicy from './features/policy/define-policy/index';
import editpolicy from './features/policy/define-policy/index';
import assessDocs from './features/assessment/assessment-docs/index';
import routing from './app.config';
import support from './features/support/index';
import appServices from './factories/appServices';


google.load('visualization', '1', {packages:['corechart', 'gauge']});
google.setOnLoadCallback(function() {});


var nttComs = angular.module('app', [uirouter,assessDocs, signIn, assessApp, createapp, homepage, support, definepolicy, editpolicy, appServices]);

nttComs.run(function($rootScope, appServices, $location) {
    $rootScope.$on('$stateChangeStart', function () { console.log(appServices);
        if (appServices.getCookie("loggedInUser").length === 0) {
            $location.path('/');
        }
    });
});

nttComs.config(routing);


'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import '../reviewApplication/reviewApplication.scss';

import routing from './reviewApplication.routes';
import reviewAppCtrl from './reviewApplication.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
import appServices from '../../factories/appServices';

export default angular.module('app.review-app', [uirouter, menubar, mainMenu, appServices])
    .config(routing)
    .controller('reviewAppCtrl', reviewAppCtrl)
    .name;
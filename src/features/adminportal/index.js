'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import './adminPortal.scss';
import routing from './adminPortal.routes';
import adminPortalController from './adminPortal.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
import appServices from '../../factories/appServices';

//add some comments

export default angular.module('app.adminPortal', [uirouter, menubar, mainMenu, appServices])
    .config(routing)
    .controller('adminPortalController', adminPortalController)
    .name;
'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import '../qualysScan/qualysScan.scss';

import routing from './qualysScan.routes';
import QualysScanController from './qualysScan.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
import appServices from '../../factories/appServices';

export default angular.module('app.qualysScan', [uirouter, menubar, mainMenu, appServices])
    .config(routing)
    .controller('QualysScanController', QualysScanController)
    .name;
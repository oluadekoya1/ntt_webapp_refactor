'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import './defineApplication.scss';
import routing from './defineApplication.routes';
import DefineAppCtrl from './defineApplication.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
//import appServices from "../../factories/appServices";

export default angular.module('app.defineApplication', [uirouter, menubar, mainMenu])
    .config(routing)
    .controller('DefineAppCtrl', DefineAppCtrl)
    .name;
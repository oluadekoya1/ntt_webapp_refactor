'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import genericTable from '../../directives/generic-table/generic-table';
import './defineApplication.scss';
import routing from './defineApplication.routes';
import DefineAppCtrl from './defineApplication.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
//import appServices from "../../factories/appServices";
import multiSelect from '../../directives/js/angularjs-dropdown-multiselect';

export default angular.module('app.defineApplication', [uirouter, menubar, mainMenu,multiSelect, genericTable])
    .config(routing)
    .controller('DefineAppCtrl', DefineAppCtrl)
    .name;
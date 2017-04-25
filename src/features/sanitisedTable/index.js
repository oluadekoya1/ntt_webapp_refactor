'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import '../sanitisedTable/sanitisedTable.scss';
import routing from './sanitisedTable.routes';
import SanitisedTableController from './sanitisedTable.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
import appServices from '../../factories/appServices';

export default angular.module('app.sanitisedTable', [uirouter, menubar, mainMenu, appServices])
    .config(routing)
    .controller('SanitisedTableController', SanitisedTableController)
    .name;
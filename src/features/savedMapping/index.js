'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import '../savedMapping/savedMapping.scss';
import routing from './savedMapping.routes';
import SavedMappingController from './savedMapping.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
import appServices from '../../factories/appServices';

export default angular.module('app.savedMapping', [uirouter, menubar, mainMenu, appServices])
    .config(routing)
    .controller('SavedMappingController', SavedMappingController)
    .name;
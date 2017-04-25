'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import '../uploadPage/uploadPage.scss';
import routing from './uploadPage.routes';
import UploadPageController from './uploadPage.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
import appServices from '../../factories/appServices';

export default angular.module('app.uploadPage', [uirouter, menubar, mainMenu, appServices])
    .config(routing)
    .controller('UploadPageController', UploadPageController)
    .name;
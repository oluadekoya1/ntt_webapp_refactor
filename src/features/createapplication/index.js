'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import './create-app.scss';
import routing from './createapp.routes';
import CreateAppCtrl from './createapp.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
//import appServices from "../../factories/appServices";

export default angular.module('app.createApp', [uirouter, menubar, mainMenu])
    .config(routing)
    .controller('CreateAppCtrl', CreateAppCtrl)
    .name;
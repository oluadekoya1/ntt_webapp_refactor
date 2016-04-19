'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import '../homepage/homepage.scss';
import '../homepage/w3.css';
import routing from './homepage.routes';
import HomePageController from './homepage.controller';
import mainMenu from '../../directives/js/main-menu';
import menubar from '../../directives/js/menubar';
import appServices from '../../factories/appServices';

export default angular.module('app.homepage', [uirouter, menubar, mainMenu, appServices])
    .config(routing)
    .controller('HomePageController', HomePageController)
    .name;
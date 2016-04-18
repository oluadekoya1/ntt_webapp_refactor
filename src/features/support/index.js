//import 'bootstrap/dist/js/bootstrap.min';
'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './support.routes';
import SupportController from './support.controller';
import mainMenu from '../../directives/js/main-menu';
import './support.css';

export default angular.module('app.support', [uirouter, mainMenu])
    .config(routing)
    .controller('SupportController', SupportController)
    .name;
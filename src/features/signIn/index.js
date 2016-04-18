'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import './signIn.css';
import logo from '../../directives/imgs/download.png';
import routing from './signIn.routes';
import signInController from './signIn.controller';
import appServices from '../../factories/appServices';

export default angular.module('app.signIn', [uirouter, appServices])
    .config(routing)
    .controller('signInController', signInController)
    .name;
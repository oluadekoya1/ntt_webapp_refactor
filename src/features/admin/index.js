'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import './admin.scss';
import '../../directives/css/nttcom.css'
import routing from './admin.routes';
import adminController from './admin.controller';
import appServices from '../../factories/appServices';

export default angular.module('app.admin', [uirouter, appServices])
    .config(routing)
    .controller('adminController', adminController)
    .name;
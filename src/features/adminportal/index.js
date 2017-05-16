'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import './adminPortal.scss';
import routing from './adminPortal.routes';
import adminPortalController from './adminPortal.controller';
import appServices from '../../factories/appServices';

export default angular.module('app.adminPortal', [uirouter, appServices])
    .config(routing)
    .controller('adminPortalController', adminPortalController)
    .name;
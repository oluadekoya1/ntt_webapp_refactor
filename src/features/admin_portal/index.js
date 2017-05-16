'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import './admin_portal.scss';
import '../../directives/css/nttcom.css'
import routing from './admin_portal.routes';
import adminPortalController from './admin_portal.controller';
import appServices from '../../factories/appServices';

export default angular.module('app.adminPortal', [uirouter, appServices])
    .config(routing)
    .controller('adminPortalController', adminPortalController)
    .name;
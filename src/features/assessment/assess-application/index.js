'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import '../../../directives/css/nttcom.css';
import './assessment.scss';
import routing from './assessment.routes';
import AssessmentController from './assessment.controller';
import mainMenu from '../../../directives/js/main-menu';
import pdfService from '../../../factories/pdfServices';
import appServices from "../../../factories/appServices";

export default angular.module('app.assessment', [uirouter, mainMenu, pdfService, appServices])
    .config(routing)
    .controller('AssessmentController', AssessmentController)
    .name;


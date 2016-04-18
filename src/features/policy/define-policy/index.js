'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './policy.routes';
import PolicyController from './policy.controller';
import mainMenu from '../../../directives/js/main-menu';
import webServices from '../../../directives/js/web-services';
import generalQuestions from '../../../directives/js/general-questions';
import knownApp from '../../../directives/js/known-app';
import knownAttack from '../../../directives/js/known-attack';
import './policy.scss';
import unknownAttacks from '../../../directives/js/unknown-attack';
import pdfService from '../../../factories/pdfServices';
import appServices from '../../../factories/appServices';


export default angular.module('app.definepolicy', [uirouter, mainMenu, webServices, generalQuestions, knownApp, knownAttack, unknownAttacks, pdfService, appServices])
    .config(routing)
    .controller('PolicyController', PolicyController)
    .name;
'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './assessmentDocs.routes';
import assessmentDocsCtrl from './assessmentDocs.controller';
import mainMenu from '../../../directives/js/main-menu';
import pdfService from '../../../factories/pdfServices';

export default angular.module('app.assessmentDocs', [uirouter, mainMenu, pdfService])
    .config(routing)
    .controller('assessmentDocsCtrl', assessmentDocsCtrl)
    .name;


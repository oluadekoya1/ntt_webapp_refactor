import angular from 'angular';
import $ from 'jquery';


class pdfService {

    constructor($http){
        this.$http = $http;
    }
    generateDashboardPDF(id){

    }
    generateAllAssmntPDF(name){
        var pdf = new jsPDF('l', 'pt', 'a4');
        var appDetails = pdf.autoTableHtmlToJson(document.getElementById("all-current-assessment"));
        var totalPagesExp = "{total_pages_count_string}";
        var resultArray = [appDetails];
        var footer =  function(data){
            var str = "Page " + data.pageCount;
            // Total page number plugin only available in jspdf v1.0+
            if (typeof pdf.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 30);
        };
        var header = function (data) {
            pdf.setFontSize(13);
            pdf.setTextColor(40);
            pdf.setFontStyle('normal');
            pdf.text("Assessment for "+ name,  data.settings.margin.left + 0, 25);
        };

        pdf.setFontSize(12);

        for (var j = 0; j < resultArray.length; j++) {
            pdf.autoTable(resultArray[j].columns, resultArray[j].data, {
                //drawHeaderRow: function() {
                //    // Don't draw header row
                //    return false;
                //},
                headerStyles: {
                    fillColor: [51, 122, 183],
                    fontSize: 13,
                    rowHeight: 30
                },
                styles: {overflow: 'linebreak'},
                startY: pdf.autoTableEndPosY() + 35,
                pageBreak: 'avoid',
                theme: 'grid',
                beforePageContent: header,
                afterPageContent: footer,
                margin: {top: 60, bottom:20}

            });
        }


        pdf.save(name + ".pdf");

    }
    generateCurrentAssmntPDF(name, allTables){
        var pdf = new jsPDF('l', 'pt', 'a4');
        var appDetails = pdf.autoTableHtmlToJson(document.getElementById("assessment-details"));
        var totalPagesExp = "{total_pages_count_string}";
        var resultArray = [appDetails];
        var footer =  function(data){
            var str = "Page " + data.pageCount;
            // Total page number plugin only available in jspdf v1.0+
            if (typeof pdf.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 30);
        };
        var header = function (data) {
            pdf.setFontSize(13);
            pdf.setTextColor(40);
            pdf.setFontStyle('normal');
            pdf.text("Assessment for "+ name,  data.settings.margin.left + 0, 25);
        };

        pdf.setFontSize(12);

        allTables.forEach(function(item){
            var tableToJSON = pdf.autoTableHtmlToJson(document.getElementById(item));
            resultArray.push(tableToJSON);
        });
        for (var j = 0; j < resultArray.length; j++) {
            pdf.autoTable(resultArray[j].columns, resultArray[j].data, {
                //drawHeaderRow: function() {
                //    // Don't draw header row
                //    return false;
                //},
                headerStyles: {
                    fillColor: [51, 122, 183],
                    fontSize: 13,
                    rowHeight: 30
                },
                styles: {overflow: 'linebreak'},
                startY: pdf.autoTableEndPosY() + 35,
                pageBreak: 'avoid',
                theme: 'grid',
                beforePageContent: header,
                afterPageContent: footer,
                margin: {top: 60, bottom:20}

            });
        }


        pdf.save(name + ".pdf");

    }
    generatePolicyPDF(name, allTables){
        var pdf = new jsPDF('l', 'pt', 'a4');
        var appDetails = pdf.autoTableHtmlToJson(document.getElementById("app-details"));
        var totalPagesExp = "{total_pages_count_string}";
        var resultArray = [appDetails];
        var footer =  function(data){
            var str = "Page " + data.pageCount;
            // Total page number plugin only available in jspdf v1.0+
            if (typeof pdf.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 30);
        };
        var header = function (data) {
            pdf.setFontSize(13);
            pdf.setTextColor(40);
            pdf.setFontStyle('normal');
            pdf.text("Policy definition report for "+ name,  data.settings.margin.left + 0, 25);
        };

        pdf.setFontSize(12);


        allTables.forEach(function(item){
            var tableToJSON = pdf.autoTableHtmlToJson(document.getElementById(item));
            resultArray.push(tableToJSON);
        });

        for (var j = 0; j < resultArray.length; j++) {
            pdf.autoTable(resultArray[j].columns, resultArray[j].data, {
                //drawHeaderRow: function() {
                //    // Don't draw header row
                //    return false;
                //},
                headerStyles: {
                    fillColor: [51, 122, 183],
                    fontSize: 13,
                    rowHeight: 30
                },
                styles: {overflow: 'linebreak'},
                startY: pdf.autoTableEndPosY() + 35,
                pageBreak: 'avoid',
                theme: 'grid',
                beforePageContent: header,
                afterPageContent: footer,
                margin: {top: 60, bottom:20}

            });
        }


        pdf.save(name + ".pdf");

    }
}

export default angular.module('services.pdf', [])
    .service('pdfService', pdfService)
    .name;
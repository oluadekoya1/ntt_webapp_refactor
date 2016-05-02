var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var bodyParser = require("body-parser");
var proxy = httpProxy.createProxyServer();
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');
var pg = require('pg');
var fs = require('fs');
var session = require('client-sessions');
var xml = require('xml');
var connectionString = "postgres://brshjyxsgjtxgc:koSrrBCITEn1QGQGSLlqp0_joX@ec2-54-83-41-183.compute-1.amazonaws.com:5432/d48tg7v0prdja0";

pg.defaults.ssl = true;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use('/', express.static(publicPath));

//app.use('/js', express.static(__dirname + '/js'));
//app.use('/dist', express.static(__dirname + '/../dist'));
//app.use('/css', express.static(__dirname + '/css'));
//app.use('/partials', express.static(__dirname + '/partials'));

//app.all('/*', function(req, res, next) {
//    // Just send the index.html for other files to support HTML5Mode
//    res.sendFile('index.html', { root: publicPath });
//});

//app.use(function(req, res) {
//    res.sendFile(publicPath);
//});


app.get('/api/getxml', function (request, response) {
    pg.connect(connectionString, function(err, client, done) {
        client.query("SELECT xmlfile FROM xmldocs WHERE id = '65346632432598'", function(err, result) {
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else {
                //response.set('Content-Type', 'text/xml');
                //response.send(xml(result.rows[0]));

                response.send(result.rows[0]);
            }
        });
    });

});


app.post('/api/sign-in', function (request, response) {
    pg.connect(connectionString, function(err, client, done) {
        client.query("SELECT username, password FROM userdetails WHERE username = '"+request.body.username+"' AND password = '"+request.body.password+"'", function(err, result) {
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else {
                response.send(result.rows.length === 1);
            }
        });
    });
});

app.post('/api/save', function (request, response) {

    pg.connect(connectionString, function(err, client, done) {
        var id = request.body.id,
            username = request.body.username,
            criticalityComplete  = request.body.assessApp,
            appName = request.body.appName,
            appDescription = request.body.appDescription,
            commonQns = request.body.commonQuestions,
            criticality = request.body.assessmentList,
            policy = request.body.policyDefinition,
            status = request.body.status,
            policyCheck = "false",
            customOptions = request.body.customOptions,
            uris = request.body.uris,
            application_Fqdn = request.body.appFqdn,
            application_type = request.body.selectedAppType,
            parameters =request.body.parameters,
            knownApp = request.body.knownAppOptions;

        client.query( "INSERT INTO appdetails VALUES ('"+id+"','"+username+"','"+criticalityComplete+"','"+appName+"','"+appDescription+"','"+commonQns+"','"+criticality+"','"+policy+"', '"+status+"','"+policyCheck+"' ,'"+customOptions+"','"+uris+"','"+application_Fqdn+"','"+application_type+"', '"+parameters+"','"+knownApp+"' )", function(err, result) {
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else { console.log("success");
                response.send(result);
            }
        });
    });
});


app.post('/api/save1', function (request, response) {

    pg.connect(connectionString, function(err, client, done) {
        var id = request.body.id,
            username = request.body.username,
            application_name = request.body.appName,
            application_type = request.body.selectedAppType,
            domain_name = request.body.appFqdn,
            application_description = request.body.selectedAppType,
            general_questions = request.body.general_questions,
            criticality_questions = request.body.assessmentList,
            policy_design_questions = request.body.policyDefinition,
            criticality_check = request.body.assessCheck,
            policy_check = request.body.policyCheck,
            uris = request.body.uris,
            parameters = request.body.parameters,
            knownApp = request.body.knownAppOptions;

        client.query( "INSERT INTO appinformation VALUES ('"+id+"','"+username+"','"+application_name+"', '"+application_type+"', '"+domain_name+"' ,'"+application_description+"','"+general_questions+"', '"+criticality_questions+"','"+policy_design_questions+"', '"+criticality_check+"','"+policy_check+"' , '"+uris+"', '"+parameters+"' , '"+knownApp+"' )", function(err, result) {
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else { console.log("success");
                response.send(result);
            }
        });
    });
});

app.get('/api/get-saved-app/:username', function (request, response) {

    pg.connect(connectionString, function(err, client, done) {

        client.query( "SELECT * FROM appinformation WHERE username = '"+request.params.username+"'", function(err, result) {
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else {
                response.send(result.rows);
            }
        });
    });
});

app.post('/api/update-assessment/:id', function (request, response) {

    pg.connect(connectionString, function(err, client, done) {
        var id = request.params.id.toString(),
            username = request.body.username,
            criticalityComplete  = request.body.assessApp,
            appName = request.body.appName,
            appDescription = request.body.appDescription,
            commonQns = request.body.commonQuestions,
            criticality = request.body.assessmentList,
            policy = request.body.policyDefinition,
            status = request.body.status,
            policyCheck = request.body.policyCheck;

        client.query( "UPDATE appdetails SET criticality_complete = '"+ criticalityComplete +"', application_name = '"+ appName +"', application_description = '"+ appDescription +"', common_questions = '"+ commonQns +"', criticality = '"+ criticality +"', policy = '"+ policy +"', application_status = '"+ status +"', policy_check = '"+ policyCheck +"'  WHERE id = '"+ id +"'", function(err, result){
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else {
                response.send(result);
            }
        });
    });
});

app.post('/api/update-policy/:id', function (request, response) {

    pg.connect(connectionString, function(err, client, done) {
        var id = request.params.id.toString(),
            policy = request.body.policyDefinition,
            policyCheck = request.body.policyCheck;

        client.query( "UPDATE appdetails SET policy = '"+ policy +"' ,policy_check = '"+ policyCheck +"'  WHERE id = '"+ id +"'", function(err, result){
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else {
                response.send(result);
            }
        });
    });
});

app.get('/api/get-all/:username', function (request, response) {

    pg.connect(connectionString, function(err, client, done) {

        client.query( "SELECT * FROM appdetails WHERE username = '"+request.params.username+"'", function(err, result) {
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else {
                response.send(result.rows);
            }
        });
    });
});

app.get('/api/get-app-with-id/:id', function (request, response) {

    pg.connect(connectionString, function(err, client, done) { console.log(request.params.id);

        client.query( "SELECT  * FROM appdetails WHERE id = '"+request.params.id+"'", function(err, result) {
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else {
                response.send(result.rows);
            }
        });
    });
});


app.post('/api/delete/:id', function (request, response) {

    var id = request.params.id.toString();

    pg.connect(connectionString, function(err, client, done) {
        client.query( "DELETE FROM appdetails WHERE id = '" + id + "'", function(err, result) {
            done();
            if (err) {
                console.error(err); response.send("Error " + err);
            }
            else {
                response.send(result);
            }
        });
    });
});



// We only want to run the workflow when not in production
if (!isProduction) {

    // We require the bundler inside the if block because
    // it is only needed in a development environment. Later
    // you will see why this is a good idea
    var bundle = require('./server/bundle.js');
    bundle();

    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});


app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});


/*
 * The scraping API
 * Team Rex
 * The MIT License
 */
var h = require('http'),
    e = require('express'),
    r = require('request'),
    b = require('body-parser'),
    f = require('fs');

module.exports.unleash = function() {
        var port = process.env.PORT || 8000;
        var api = e();
        var ui = e();
        var rex_api = e.Router();
        var rex_ui = e.Router();

        api.set('title', "Rex UI");
        api.use(b.json());
        api.use(b.urlencoded({ extended : true}));
        ui.use(b.json());
        ui.use(b.urlencoded({ extended : true}));
        
        rex_ui.get('/', function(req, res) {
                res.send("The UI of Rex")
        });

        rex_ui.get('/app', function(req, res) {
                res.send("The main app");
        });

        rex_api.get('/', function(req, res) {
                res.send("The API powering Rex");
        });

        ui.use('/secret', rex_api);
        ui.use('/', rex_ui);

        h.createServer(ui).listen(port, function() {
                console.log("Rex is up baby");
        });
}


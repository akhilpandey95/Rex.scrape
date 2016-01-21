/*
 * The scraping API
 * Team Rex
 * The MIT License
 */
var h = require('http'),
    c = require('cheerio')
    e = require('express'),
    r = require('request'),
    b = require('body-parser'),
    f = require('fs');

r('', function(err, res, html) {
    if(!err && res.statusCode == 200) {
        var l = c.load(html);

        l('').each(function(i, element) {
            var content = l(this);
            var data = content.text();
            console.log(data);
        });
    }
});

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

        // The REX UI router
        rex_ui.get('/', function(req, res) {
                res.json("The UI of Rex")
        });

        rex_ui.get('/:somevalue', function(req, res) {
                var data = req.params.somevalue;
                res.send("Sorry cannot GET/" + data + " on this page");
        });

        rex_ui.get('/app', function(req, res) {
                res.send("The main app");
        });

        // The REX API router
        rex_api.get('/', function(req, res) {
                res.send("The API powering Rex");
        });

        rex_api.get('/:value', function(req, res) {
                var data = req.params.value;
                res.json({
                    request  : 'you have requested for ' + data,
                    product  : 'yet to come',
                    category : 'yet to come',
                    website  : {
                        amazon : {
                            price       : 'yet to come',
                            description : 'yet to come',
                            discount    : 'yet to come',
                            rating      : 'yet to come'
                        },
                        flipkart : {
                            price       : 'yet to come',
                            description : 'yet to come',
                            discount    : 'yet to come',
                            rating      : 'yet to come'
                        },
                        snapdeal : {
                            price       : 'yet to come',
                            description : 'yet to come',
                            discount    : 'yet to come',
                            rating      : 'yet to come'
                        },
                        askme : {
                            price       : 'yet to come',
                            description : 'yet to come',
                            discount    : 'yet to come',
                            rating      : 'yet to come'
                        }
                    }
                });
        });

        ui.use('/secret', rex_api);
        ui.use('/', rex_ui);

        h.createServer(ui).listen(port, function() {
                console.log("Rex is up baby");
        });
}


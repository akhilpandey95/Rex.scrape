/*
 * The scraping API
 * Team Rex
 * The MIT License
 */
var h  = require('http'),
    e  = require('express'),
    p  = require('path'),
    c  = require('child_process'),
    bp = require('body-parser'),
    b  = require('phantomjs');

var uri = [""];

// snapdeal (http://www.snapdeal.com/search?keyword=samsung&sort=[rlvncy,plrty,plth,phtl,dhtl,rec])
// askmebazaar (http://www.askmebazaar.com/index.php?defSearch=1&search_query=nike)
// amazon (http://www.amazon.in/s/&field-keywords=apple%20iphone%205s)
// ebay (http://www.ebay.in/sch/i.html?&_nkw=nike&_sop=12)


module.exports.unleash = function() {
        var port = process.env.PORT || 8000;
        var api = e();
        var ui = e();
        var rex_api = e.Router();
        var rex_ui = e.Router();

        api.set('title', "Rex UI");
        api.use(bp.json());
        api.use(bp.urlencoded({ extended : true}));
        ui.use(bp.json());
        ui.use(bp.urlencoded({ extended : true}));

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
                    name        : 'yet to come',
                    price       : 'yet to come',
                    description : 'yet to come',
                    canPurchase : 'yet to come',
                    soldOut     : 'yet to come',
                    rating      : 'yet to come',
                    images : {
                        full  : 'yet to come',
                        thumb : 'yet to come'
                    }
                });
        });

        ui.use('/secret', rex_api);
        ui.use('/', rex_ui);

        h.createServer(ui).listen(port, function() {
                console.log("Rex is up baby");
        });
}


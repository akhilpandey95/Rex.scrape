/*
 * The scraping API script with phantomJS
 * Team Rex
 * The MTT License
 */
var p = require('webpage').create(),
    url = ["http://www.amazon.in/s/&field-keywords=","http://www.snapdeal.com/search?keyword=","http://www.ebay.in/sch/i.html?&_nkw=","http://www.askmebazaar.com/index.php?defSearch=1&search_query="];

var arg = "nike",
	amazon = [].
	snapdeal = [].
	ebay = [],
	askme = [];

String.prototype.startswith = function(string) {
        return(this.indexOf(string) == 0);
}

// Ammzon
p.open(url[0] + arg, function(status) {
	if(status != 'success') {
		console.log("Cannot access the network");
	}
	else {
		var lol = p.evaluate(function() {
			var list = document.querySelectorAll('h2');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item.join('\n');
		});
		console.log(lol);
	}
	phantom.exit();
});

// Snapdeal
p.open(url[1], function(status) {
	if(status != 'success') {
		console.log("Cannot access the network");
	}
	else {
		var snapdeal = p.evaluate(function() {
			var list = document.querySelectorAll('');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item.join('\n');
		});
	}
	phantom.exit();
});

// Ebay
p.open(url[2], function(status) {
	if(status != 'success') {
		console.log("Cannot access the network");
	}
	else {
		var ebay = p.evaluate(function() {
			var list = document.querySelectorAll('');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item.join('\n');
		});
	}
	phantom.exit();
});

// AsKmebazaar
p.open(url[3], function(status) {
	if(status != 'success') {
		console.log("Cannot access the network");
	}
	else {
		var ebay = p.evaluate(function() {
			var list = document.querySelectorAll('');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item.join('\n');
		});
	}
	phantom.exit();
});
/*
 * The scraping API script with phantomJS
 * Team Rex
 * The MTT License
 */
var p = require('webpage').create(),
    url = ["http://www.amazon.in/s/&field-keywords=","http://www.snapdeal.com/search?keyword=","http://www.ebay.in/sch/i.html?&_nkw=","http://www.askmebazaar.com/index.php?defSearch=1&search_query="];

var f = require('fs');

var arg = "nike,"
	amazon = [],
	snapdeal = [],
	ebay = [],
	askme = [];

// Ammzon
p.open(url[0] + arg, function(status) {
	if(status != 'success') {
		console.log("Cannot access the network");
	}
	else {
		// product name
		var prodname = p.evaluate(function() {
			var list = document.getElementsByClassName('a-size-medium a-color-null s-inline s-access-title a-text-normal');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});
		// product price
		var prodprice = p.evaluate(function() {
			var list = document.getElementsByClassName('a-size-base a-color-price s-price a-text-bold');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		amazon.splice(1,0,prodname);
		amazon.splice(2,0,prodprice);
	}
	phantom.exit();
});

/* Snapdeal
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
*/
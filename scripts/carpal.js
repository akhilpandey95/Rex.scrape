/*
 * The scraping API script with phantomJS
 * Team Rex
 * The MTT License
 */
var p = require('webpage').create(),
    url = ["http://www.amazon.in/s/&field-keywords=","http://www.snapdeal.com/search?keyword=","http://www.ebay.in/sch/i.html?&_nkw=","http://www.askmebazaar.com/index.php?defSearch=1&search_query=", "http://www.homeshop18.com/search:"];

var f = require('fs');

var arg = "nike,"
	amazon = [],
	snapdeal = [],
	home = [],
	ebay = [],
	askme = [];

/* Ammzon
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

		// product By
		var prodBy = p.evaluate(function() {
			var list = document.getElementsByClassName('a-size-small a-color-secondary');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		// product rating
		var prodRating = p.evaluate(function() {
			var list = document.getElementsByClassName('a-icon-alt');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		// product link
		var prodLink = p.evaluate(function() {
			var list = document.querySelectorAll('a.s-access-title[href]');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		amazon.splice(1,0,prodname);
		amazon.splice(2,0,prodprice);
		amazon.splice(3,0,prodBy);
		amazon.splice(4,0,prodRating);
		console.log(prodRating);

	}
	phantom.exit();
});
*/
// Snapdeal
p.open(url[1] + arg, function(status) {
	if(status != 'success') {
		console.log("Cannot access the network");
	}
	else {

		// product title
		var prodTitle = p.evaluate(function() {
			var list = document.getElementsByClassName('product-title');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		// product price
		var prodPrice = p.evaluate(function() {
			var list = document.getElementsByClassName('product-price');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		// product image
		var prodImg = p.evaluate(function() {
			for(var i =0; i<48; i++) {
				var list = document.getElementsByTagName('img')[i].getAttribute('src');
			}
			console.log(typeof(list));
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		snapdeal.splice(1,0,prodTitle);
		snapdeal.splice(2,0,prodPrice);
		//snapdeal.splice(3,0,prodImg);

		console.log(prodImg);
	}
	phantom.exit();
});


/* HomeShop 18
p.open(url[4] + arg, function(status) {
	if(status != 'success') {
		console.log("Cannot access the network");
	}
	else {

		// product title
		var prodTitle = p.evaluate(function() {
			var list = document.querySelectorAll('p.product_title');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		// product price
		var prodPrice = p.evaluate(function() {
			var list = document.querySelectorAll('p.price');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		// product image
		var prodImg = p.evaluate(function() {
			var list = document.querySelectorAll('p.product_image');
			var item = [];
			for(var i = 0; i < list.length; i++) {
				item.push(list[i].innerText);
			}
			return item;
		});

		home.splice(1,0,prodTitle);
		home.splice(2,0,prodPrice);
		console.log(prodImg);
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
from bs4 import BeautifulSoup
import requests

from flask import Flask, jsonify, request, render_template, send_file
from flask.ext.cors import CORS

import json
import os

app = Flask(__name__)
CORS(app)

def snapdeal_scraper(query, sort_selection=0):
    """ sorting types
        sort_selection(int) can be
        0 Relavance
        1 Popularity
        2 High Price
        3 Low Price
        4 Discount
        5 Recent

    """
    sort_types = ['rlvncy', 'plrty', 'phtl', 'plth', 'dhtl', 'rec']
    sort_type = sort_types[sort_selection]

    r = requests.get('http://www.snapdeal.com/search?keyword={q}&sort={sort}'.format(q=query, sort=sort_type))
    s = BeautifulSoup(r.text, 'html.parser')
    products = s.findAll("div", {"class" : "product-tuple-listing"})
    js = []
    for product in products:
        pr = {}

        #link
        pr['link'] = product.findAll("a")[0]['href']

        #img
        try:
            pr['img'] = product.findAll("img")[0]['src']
        except KeyError:
            pr['img'] = product.findAll("img")[0]['lazysrc']

        #title
        pr['title'] = product.findAll("p", {"class":"product-title"})[0].text.strip()

        #cost
        cs = product.findAll("span", {"class" : "product-price"} )
        #print cs
        #print pr['title']

        if len(cs) < 1:
            cs_ = '0'
        elif '.' in cs[0].text:
            cs_ = cs[0].text.split('.')[1].strip().replace(',', '')
        else:
            #print cs
            cs_ = cs[0].text.strip().replace(',', '')
        #print cs_
        if len(cs_.rsplit('.')[-1]) == 2 and len(cs_) > 1:
            pr['cost'] = int(cs_[:-3])
        else:
            pr['cost'] = int(cs_)
        #rating
        try:
            pr['rating'] = product.findAll("span", {"class" : "sd-product-float-buy-rating"} )[0]['data-rating']
        except IndexError:
            pr['rating'] = '0.0'

        #attributes
        pr['attrs'] = []
        attrs = product.findAll("div", {"class":"product-tuple-attribute"})
        if len(attrs) != 0:
            for atr in attrs:
                name = atr.text.split(':')[0].strip()
                at = name + ': '
                trs = atr.findAll(lambda tag: tag.name == 'span' and tag.get('class') == ['attr-value'])
                for tr in trs:
                    at = at + ' ' + tr.text.strip()

                pr['attrs'].append(at)

        pr['source'] = 'http://www.snapdeal.com'
        js.append(pr)

    return js

def flipkart_scraper(query, sort_selection=0):
    """ sorting types
        sort_selection(int) can be
        0 Relavance
        1 Popularity
        2 High Price
        3 Low Price

    """
    print sort_selection
    sort_types = ['relavance', 'popularity', 'price_desc', 'price_asc']
    sort_type = sort_types[sort_selection]

    r = requests.get('http://www.flipkart.com/all-categories/pr?p%5B%5D=sort%3D{sort}&sid=search.flipkart.com&filterNone=true&q={q}'.format(q=query, sort=sort_type))
    s = BeautifulSoup(r.text, 'html.parser')
    products = s.findAll("div", {"class" : "product-unit"})
    js = []
    for product in products:
        pr = {}

        #link
        pr['link'] = 'http://flipkart.com' + product.findAll("div", {"class" : "pu-title"})[0].a['href']

        #img
        pr['img'] =  product.findAll("a", {"class" : "fk-product-thumb"})[0].img['data-src']

        #title
        pr['title'] = product.findAll("div", {"class" : "pu-title"})[0].a['title'].strip()

        #cost
        cs = product.findAll("div", {"class" : "pu-final"})[0].text.split('.')[1].strip().replace(',', '')
        if len(cs.rsplit('.')[-1]) == 2 and len(cs) > 1:
            try:
                pr['cost'] = int(cs[:-3])
            except Exception:
                print len(cs.rsplit('.')[-1]) == 2
        else:
            pr['cost'] = int(cs)

        #rating
        try:
            pr['rating'] = product.findAll("div", {"class" : "pu-rating"})[0].div['title'].split(' ')[0]
            if len(pr['rating']) == 1:
                pr['rating'] = pr['rating'] + '.0'
        except:
            pr['rating'] = '0.0'

        #attributes
        pr['attrs'] = []
        attr_list_result_set = product.findAll("ul", {"class" : "pu-usp"})
        if len(attr_list_result_set) != 0:
            attrs = attr_list_result_set[0].findAll("li")
            for atr in attrs:
                pr['attrs'].append(atr.span.text.strip())

        pr['source'] = 'http://www.flipkart.com'
        js.append(pr)

#    with open('data.json', 'wb') as fp:
#        print json.dump(js, fp, indent=4, sort_keys=True)

    return js

def amazon_scraper(query, sort_selection=0):
    r = requests.get("http://www.amazon.in/s/&field-keywords={query}".format(query=query))
    s = BeautifulSoup(r.text, 'html.parser')

    # take the items
    items = s.findAll('li', {'class': 's-result-item'})
    js = []

    for item in items:
        if item.findAll("img", {"class" : "cfMarker"}):
            items.remove(item)

    for item in items:

        pr = {}

        # Product Link
        pr['link'] = item.findAll('a', {'class': 's-access-detail-page'})[0]['href']

        # Product Img
        try:
            pr['img'] = item.findAll('img', {'class': 's-access-image'})[0]['src']

        except Exception as e:
            print e

        # Product Title
        pr['title'] = item.findAll('h2', {'class': 's-access-title'})[0].text.strip()

        # Product Cost
        try:
            cs = item.findAll('span', {'class': 'a-color-price'})[0].text.strip().replace(',', '')
        except:
            cs = "0"

        if '-' in cs:
            cs = cs.split('-')[0].strip()

        if len(cs.rsplit('.')[-1]) == 2 and len(cs) > 1:
            pr['cost'] = int(cs[:-3])
        elif cs == '':
            pr['cost'] = 0
        else:
            pr['cost'] = int(cs)

        # Product Rating
        try:
            pr['rating'] = item.findAll('span', {'class': 'a-icon-alt'})[0].text.strip()[:2]

        except:
            pr['rating'] = "0.0"

        pr['source'] = 'http://www.amazon.com'
        js.append(pr)

    return js

@app.route('/')
def index():
    return send_file('static/index.html')

@app.route('/secrets/search', methods = ['GET', 'OPTIONS'])
def search():
    searchword = request.args.get('term', '')
    if not searchword:
        print 'exit 1'
        return jsonify({"reason" : "Need a search term. Use the parameter ?term="})

    sorttype = request.args.get('sort', '')
    _sorttype = ''

    print sorttype
    if sorttype is '':
        _sorttype = 0
    elif sorttype == 'relavance':
        _sorttype = 0
    elif sorttype == 'popularity':
        _sorttype = 1
    elif sorttype == 'highp':
        _sorttype = 2
    elif sorttype == 'lowp':
        _sorttype = 3
    else:
        print 'exit 2'
        return jsonify({"reason" : "Need a valid sort type. Use the parameter ?sort=[relavance, popularity, highp, lowp]"})

    products = []

    snapdeal_items = snapdeal_scraper(searchword, _sorttype)
    flipkart_items = flipkart_scraper(searchword, _sorttype)
    amazon_items = amazon_scraper(searchword, _sorttype)

    return jsonify({'prodlist' : get_prods(searchword, _sorttype)})

def get_prods(searchword, _sorttype):
    print "called"
    snapdeal_items = snapdeal_scraper(searchword, _sorttype)
    flipkart_items = flipkart_scraper(searchword, _sorttype)
    amazon_items = amazon_scraper(searchword, _sorttype)
    return snapdeal_items + flipkart_items + amazon_items

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    #searchword='beyblade'
    #_sorttype = 0
    #snapdeal_items = snapdeal_scraper(searchword, _sorttype)
    #flipkart_items = flipkart_scraper(searchword, _sorttype)
    #amazon_items = amazon_scraper(searchword, _sorttype)

    #total = snapdeal_items + flipkart_items + amazon_items
    #print total

    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)

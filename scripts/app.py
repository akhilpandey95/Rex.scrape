from bs4 import BeautifulSoup
import requests

def scrape_amazon(arg):
    r = requests.get("http://www.amazon.in/s/&field-keywords={arg}".format(arg=arg))
    s = BeautifulSoup(r.text, 'html.parser')

    # take the items
    items = s.findAll('li', {'class': 's-result-item'})
    i = {}

    for item in items:
        if item.findAll("img", {"class" : "cfMarker"}):
            items.remove(item)

    for item in items:

        # Product Link
        i['link'] = item.findAll('a', {'class': 's-access-detail-page'})[0]['href']

        # Product Img
        try:
            i['img'] = item.findAll('img', {'class': 's-access-image'})[0]['src']

        except Exception as e:
            print e

        # Product Title
        i['title'] = item.findAll('h2', {'class': 's-access-title'})[0].text.strip()

        # Product Cost
        try:
            i['cost'] = item.findAll('span', {'class': 'a-color-price'})[0].text.strip()

        except:
            i['cost'] = "lol"

        # Product Rating
        try:
            i['rating'] = item.findAll('span', {'class': 'a-icon-alt'})[0].text.strip()

        except:
            i['rating'] = "0.0"

        print i['cost']

scrape_amazon('nike')
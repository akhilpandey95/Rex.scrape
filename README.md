# Rex.Inc
Application for comparing search results of different e-Commerce websites.

### Want to see the Application live ?
- It is Live on [labs.akhilhector.com](http://labs.akhilhector.com)
- The API is Live on heroku, click [here](https://rex001.herokuapp.com/secrets/search?term=nike).

`NOTE` : The API has a hardcoded value, Please change it to a different search term if you wish to use the API.

### ScreenCast
Please go ahead and click on the [link](https://www.youtube.com/watch?v=n1gbfy3-ZqM)

### Parts of Rex
- `Carpal`  : The scraping API that fetches the content from the Internet.
- `Percolo` : The filtering API which improves the search query.
- `RUI`        : The UI powering `Rex`.

### Setup and method to run the app
```shell
$ sudo apt-get -E easy_install virtualenv
$ sudo easy_install pip
$ virtualenv -m python
```

In order to run the app please ensure you have python 2.7 installed

```shell
$ pip install ( The packages from `requirements.txt`)
$ python app.py
```

> The Above setup is if you have a Unix or GNU/Linux based 
> Operating System. 

### Tech Involved
- Front End : Angular Js
- Back End  : Python
- UI        : Bootstrap

### Team

- Akhil Dusi (Strategy and Planning)
- Siddartha Varma (Marketing and Outreach)
- Ravi Teja (UI/UX Architect)
- Om Bhallamudi (Backend Ninja)
- Akhil Pandey (Yoda)

### License
[The MIT License](https://github.com/AkhilHector/tribble/blob/master/LICENSE)

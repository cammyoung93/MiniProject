from flask import Flask, render_template, request, jsonify
import plotly.graph_objs as go
from plotly.utils import PlotlyJSONEncoder
import json
import requests
import requests_cache

app = Flask(__name__)

brewery_url = 'https://api.openbrewerydb.org/breweries'
by_name = 'https://api.openbrewerydb.org/breweries?by_name={variableName}'
by_city = 'https://api.openbrewerydb.org/breweries?by_city={variableName}'
by_state = 'https://api.openbrewerydb.org/breweries?by_state={variableName}'

@app.route('/')
def home():
    return "<h1> Welcome to Brewery API' </h1>"

@app.route('/brewerys', methods=['GET'])
def brewerys():
    response = requests.get(brewery_url).json()
    brewery_info = {'CompanyName' : [], 'City': [], 'State' : [], 'Phone' : [], 'Website_url' : []}
    for x in response:
        brewery_info['CompanyName'].append(x['name'])
        brewery_info['City'].append(x['city'])
        brewery_info['State'].append(x['state'])
        brewery_info['Phone'].append(x['phone'])
        brewery_info['Website_url'].append(x['website_url'])
    #return jsonify(brewery_info)
    return render_template('background.html', result = response)

@app.route('/name/<brewery_name>', methods=['GET'])
def brewery_name(brewery_name):
    url = by_name.format(variableName=brewery_name)
    response = requests.get(url)
    brewery_info = {'CompanyName' : [], 'City': [], 'State' : [], 'Phone' : [], 'Website_url' : []}
    if response.status_code == 404:
        return "<h2>Error, page does not exist!</h2>", 404
    response = response.json()
    for x in response:
        brewery_info['CompanyName'].append(x['name'])
        brewery_info['City'].append(x['city'])
        brewery_info['State'].append(x['state'])
        brewery_info['Phone'].append(x['phone'])
        brewery_info['Website_url'].append(x['website_url'])
    #return jsonify(brewery_info)
    return render_template('background.html', result = response)

@app.route('/city/<brewery_city>', methods=['GET'])
def brewery_city(brewery_city):
    url = by_city.format(variableName=brewery_city)
    response = requests.get(url)
    brewery_info = {'CompanyName' : [], 'City': [], 'State' : [], 'Phone' : [], 'Website_url' : []}
    if response.status_code == 404:
        return "<h2>Error, page does not exist!</h2>", 404
    response = response.json()
    for x in response:
        brewery_info['CompanyName'].append(x['name'])
        brewery_info['City'].append(x['city'])
        brewery_info['State'].append(x['state'])
        brewery_info['Phone'].append(x['phone'])
        brewery_info['Website_url'].append(x['website_url'])
    #return jsonify(brewery_info)
    return render_template('background.html', result = response)

@app.route('/state/<brewery_state>', methods=['GET'])
def brewery_state(brewery_state):
    url = by_state.format(variableName=brewery_state)
    response = requests.get(url)
    brewery_info = {'CompanyName' : [], 'City': [], 'State' : [], 'Phone' : [], 'Website_url' : []}
    if response.status_code == 404:
        return "<h2>Error, page does not exist!</h2>", 404
    response = response.json()
    for x in response:
        brewery_info['CompanyName'].append(x['name'])
        brewery_info['City'].append(x['city'])
        brewery_info['State'].append(x['state'])
        brewery_info['Phone'].append(x['phone'])
        brewery_info['Website_url'].append(x['website_url'])
    #return jsonify(brewery_info)
    return render_template('background.html', result = response)






if __name__=="__main__":
    app.run(port=5070, debug=True)

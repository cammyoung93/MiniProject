from flask import Flask, render_template, request, jsonify
import json
import requests
from pprint import pprint
from functools import wraps
from flask import  Response

def check_auth(username, password):
    return username == 'cammyoung' and password == '30101993'

def authenticate():
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

app = Flask(__name__)


brewery_url = 'https://api.openbrewerydb.org/breweries'
by_name = 'https://api.openbrewerydb.org/breweries?by_name={variableName}'
by_city = 'https://api.openbrewerydb.org/breweries?by_city={variableName}'
by_state = 'https://api.openbrewerydb.org/breweries?by_state={variableName}'


# ---------------------------------------------------------------------------
# Shared data layer
#
# Both the HTML website routes and the JSON API routes below go through these
# helpers. This is the single source of truth for talking to the upstream
# Open Brewery DB API and for the field contract the iOS app depends on.
# ---------------------------------------------------------------------------

# The stable contract. The iOS app (and any other client) can rely on exactly
# these keys always being present. Add new keys here over time, but never
# rename or remove one without bumping the API version below.
CONTRACT_FIELDS = ['name', 'city', 'state', 'phone', 'website_url']


def fetch_breweries(url):
    """Fetch a list of breweries from the upstream API for the given URL.

    Returns a tuple of (data, error). On success ``data`` is the raw list of
    brewery dicts from upstream and ``error`` is None. On failure ``data`` is
    None and ``error`` is an (message, status_code) tuple.
    """
    try:
        response = requests.get(url, timeout=10)
    except requests.RequestException:
        return None, ('Could not reach the brewery service.', 502)
    if response.status_code == 404:
        return None, ('Error, page does not exist!', 404)
    if response.status_code != 200:
        return None, ('Upstream brewery service error.', 502)
    try:
        return response.json(), None
    except ValueError:
        return None, ('Invalid response from brewery service.', 502)


def normalize(breweries):
    """Reduce raw upstream records to just the fields in the contract.

    This decouples our API from upstream changes: if Open Brewery DB adds,
    removes, or renames fields, the JSON we hand to the app stays stable.
    """
    return [
        {field: (brewery.get(field) if isinstance(brewery, dict) else None)
         for field in CONTRACT_FIELDS}
        for brewery in breweries
    ]


# ---------------------------------------------------------------------------
# Website routes (server-rendered HTML) - unchanged behavior
# ---------------------------------------------------------------------------

@app.route('/')
@requires_auth
def home():
    return "<h1> Welcome to Brewery API' </h1>"

@app.route('/brewerys', methods=['GET'])
def brewerys():
    data, error = fetch_breweries(brewery_url)
    if error:
        return "<h2>%s</h2>" % error[0], error[1]
    return render_template('background.html', result=data)

@app.route('/name/<brewery_name>', methods=['GET'])
def brewery_name(brewery_name):
    data, error = fetch_breweries(by_name.format(variableName=brewery_name))
    if error:
        return "<h2>%s</h2>" % error[0], error[1]
    return render_template('background.html', result=data)

@app.route('/city/<brewery_city>', methods=['GET'])
def brewery_city(brewery_city):
    data, error = fetch_breweries(by_city.format(variableName=brewery_city))
    if error:
        return "<h2>%s</h2>" % error[0], error[1]
    return render_template('background.html', result=data)

@app.route('/state/<brewery_state>', methods=['GET'])
def brewery_state(brewery_state):
    data, error = fetch_breweries(by_state.format(variableName=brewery_state))
    if error:
        return "<h2>%s</h2>" % error[0], error[1]
    return render_template('background.html', result=data)


# ---------------------------------------------------------------------------
# JSON API routes (/api/v1/...) - consumed by the iOS app
#
# These live alongside the website routes and share the same data layer, so
# the website and the app can evolve independently. Every response has the
# shape: {"count": <int>, "breweries": [ {contract fields...}, ... ]}
# ---------------------------------------------------------------------------

def _json_breweries(url):
    """Fetch, normalize, and wrap breweries as a JSON API response."""
    data, error = fetch_breweries(url)
    if error:
        return jsonify({'error': error[0]}), error[1]
    breweries = normalize(data)
    return jsonify({'count': len(breweries), 'breweries': breweries})


@app.route('/api/v1/health', methods=['GET'])
def api_health():
    """Lightweight health check for the app and for deployment monitors."""
    return jsonify({'status': 'ok'})


@app.route('/api/v1/breweries', methods=['GET'])
def api_breweries():
    """List breweries.

    Optional query params filter the results:
      ?name=<text>   breweries whose name matches
      ?city=<text>   breweries in a city
      ?state=<text>  breweries in a state

    Only one filter is applied, in the order name > city > state. With no
    filter, returns the default list of breweries.
    """
    name = request.args.get('name')
    city = request.args.get('city')
    state = request.args.get('state')
    if name:
        url = by_name.format(variableName=name)
    elif city:
        url = by_city.format(variableName=city)
    elif state:
        url = by_state.format(variableName=state)
    else:
        url = brewery_url
    return _json_breweries(url)


if __name__=="__main__":
    app.run(port=8081, debug=True)

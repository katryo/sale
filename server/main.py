# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]
import logging
import requests
import json

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config.from_pyfile('./settings.cfg')
CORS(app)

@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    return 'abc'


@app.route('/senses')
def senses():
    query = request.args.get('q', default='', type=str)  # TODO: validation
    language = 'en'

    url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + language + '/' + query.lower()

    r = requests.get(url, headers={'app_id': app.config['OXFORD_APP_ID'], 'app_key': app.config['OXFORD_APP_KEY']})
    if r.status_code is not 200:
        return jsonify({'senses': [], 'status': 'failure'})
    entries = json.loads(r.text)['results'][0]['lexicalEntries']  # TODO: validation
    output = {'entries': []}
    for i, entry in enumerate(entries):
        pronunciations = []
        for pc in entry['pronunciations']:
            same_audio = False
            for pr in pronunciations:
                if pr['audioFile'] == pc['audioFile']:
                    same_audio = True
                    break
            if same_audio:
                continue
            pronunciations.append(pc)
        sense_results = entry['entries'][0]['senses']

        senses_output = []
        for j, sense in enumerate(sense_results):
            sense_output = {}
            for key in ['definitions', 'domains', 'examples']:
                if key in sense:
                    sense_output[key] = sense[key]
            sense_output['id'] = '{}{}'.format(i, j)
            senses_output.append(sense_output)

        entry_output = {'id': i, 'senses': senses_output, 'status': 'success', 'pronunciations': pronunciations}
        output['entries'].append(entry_output)

    return jsonify(output)


@app.route('/images')
def images():
    search_url = "https://api.cognitive.microsoft.com/bing/v7.0/images/search"
    headers = {"Ocp-Apim-Subscription-Key": app.config['MS_KEY']}
    query = request.args.get('q', default='', type=str)  # TODO: validation
    params = {"q": query}
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    output_images = []

    for item in search_results['value']:
        output_images.append({
            'thumbnailUrl': item['thumbnailUrl'],
            'contentUrl': item['contentUrl'],
            'hostPageUrl': item['hostPageUrl'],
            'encodingFormat': item['encodingFormat'],
            'name': item['name']
        })
    return jsonify({'images': output_images})


@app.route('/suggestions')
def suggestions():
    url = 'https://api.cognitive.microsoft.com/bing/v7.0/Suggestions'
    headers = {"Ocp-Apim-Subscription-Key": app.config['MS_KEY']}
    query = request.args.get('q', default='', type=str)  # TODO: validation
    params = {"q": query, 'mkt': 'en-US'}
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    results = response.json()
    suggestions = []
    for suggestion_group in results['suggestionGroups']:
        for suggestion in suggestion_group['searchSuggestions']:
            suggestions.append(suggestion["displayText"])

    return jsonify({'suggestions': suggestions})


@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END app]

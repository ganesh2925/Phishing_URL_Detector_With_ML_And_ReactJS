# using flask_restful
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import pickle
import warnings
import json
from flask_cors import CORS, cross_origin

warnings.filterwarnings('ignore') 
# creating the flask app
app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

# creating an API object
api = Api(app)

def load_URL(url):
    loaded_model = pickle.load(open('phishing.pkl', 'rb'))
    result = loaded_model.predict([url])
    return result[0]
  
# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class Everyone(Resource):

    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def get(self,name):
        
        res=load_URL(name)
        jsonres = jsonify({"result":res})
        jsonres.headers['Access-Control-Allow-Credentials'] = 'true'
        return jsonres
  
api.add_resource(Everyone, '/<path:name>')

  
  
# driver function
if (True):
    app.run(debug = True)

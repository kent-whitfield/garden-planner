# sudo pip3 install Flask-PyMongo
# sudo pip3 install pymongo[srv]
# sudo pip3 install -U flask-cors
# sudo pip3 install python-bsonjs

from flask import Flask, request, json, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util

app = Flask(__name__)

app.config['CORS_HEADERS'] = "Content-Type"
app.config['CORS_RESOURCES'] = {r"/*": {"origins": "*"}}
cors = CORS(app)

mongoURI = 'mongodb+srv://langara-user:AUserAtLangara@cluster0.37t0h.mongodb.net/garden_planner'
mongo1 = PyMongo(app, uri=mongoURI)
dbSeeds = mongo1.db.seeds
dbUsers = mongo1.db.users
dbGardens = mongo1.db.gardens


@app.route('/')
def home():
    return('<h1>Garden Planner Server</h1>')


@app.route('/create/seed', methods=['POST'])
def create_plant():
    x = data = request.get_json()
    oID = dbSeeds.insert_one(x)
    print(oID)
    return jsonify({"result": "ok"})


@app.route('/create/garden', methods=['POST'])
def create_garden():
    x = data = request.get_json()
    oId = dbGardens.insert_one(x)
    return jsonify({"result": "ok"})


@app.route('/update/garden', methods=['POST'])
def update_garden():
    data = request.get_json()
    gardenQuery = {"user": data['user'], "name": data['name']}
    newValue = {"$set": {"plants": data['plants']}}
    oId = dbGardens.update_one(gardenQuery, newValue)
    print(oId)
    return jsonify({"result": "ok"})


@app.route('/data/seeds')
def show_data():
    allSeeds = list(dbSeeds.find({}, {"_id": 0}))
    return json.dumps(allSeeds)


@app.route('/data/<string:user>/gardens')
def show_gardens(user):
    userGardens = list(dbGardens.find({"user": user}, {"_id": 0}))
    #userGardens = list(dbGardens.find({"user": user}, {"user": 0}))
    return json.dumps(userGardens)
    # return json_util.dumps(userGardens)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
